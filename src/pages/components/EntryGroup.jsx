import { UserAuth } from "../../authentication/context/AuthContext";
import { useEffect, useState } from "react";
import { database } from "../../../firebase-config";
import { ref, onValue } from "firebase/database";
import { EntryCard } from "./Entry";
import "../../styles/entry.css";
import imgEmptyState from "../../styles/images/emptystate.png";

// coded by Aga
export function GetEntries(userId) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // path to find entries created by logged-in user in RealtimeDatabase
      const entriesRef = ref(database, `entries/${userId}`);

      //when entries on entriesRef path are met, shapshot creates object "data" (our entries))
      onValue(entriesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          // our "data" is mapped into array, which allows us read keys (inputType, timestamp, title), and assigned to them values ("BrainDump", day when entry was created, entry)
          const entriesArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            pinned: value.pinned,
            inputType: value.inputType,
            text: value.text,
            timestamp: value.timestamp,
            title: value.title,
            projects: value.projects,
            tags: value.tags,
          }));
          setEntries(entriesArray);
        }
      });
    };
    fetchData();
  }, [userId]);

  return entries;
}



function filterEntries(entries, filters) {
  // Remove undefined filters (undefined values or empty arrays/keywords)
  const definedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => {
      return (
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === "string" && value.trim() === "")
      );
    })
  );

  return entries.filter((entry) => {
    const matchedPinned =
      definedFilters.pinned !== undefined
        ? entry.pinned === definedFilters.pinned
        : true;
    const matchedKeywords = definedFilters.keywords
      ? (entry.title &&
          entry.title
            .toLowerCase()
            .includes(definedFilters.keywords.toLowerCase())) ||
        (entry.text &&
          entry.text
            .toLowerCase()
            .includes(definedFilters.keywords.toLowerCase()))
      : true;
    const matchedDate = definedFilters.date
      ? entry.timestamp &&
        new Date(entry.timestamp).toLocaleDateString("en-GB") ===
          definedFilters.date
      : true;
    const matchedInputType = definedFilters.inputType
      ? entry.inputType === definedFilters.inputType
      : true;
    let matchedTags = true;
    let matchedProjects = true;

    if (definedFilters.tags !== undefined) {
      if (Array.isArray(definedFilters.tags)) {
        matchedTags = definedFilters.tags.every(
          (tag) => entry.tags && entry.tags.includes(tag)
        );
      } else if (typeof definedFilters.tags === "string") {
        matchedTags = entry.tags && entry.tags.includes(definedFilters.tags);
      }
    }

    if (definedFilters.projects !== undefined) {
      if (Array.isArray(definedFilters.projects)) {
        matchedProjects = definedFilters.projects.every(
          (project) => entry.projects && entry.projects.includes(project)
        );
      } else if (typeof definedFilters.projects === "string") {
        matchedProjects =
          entry.projects && entry.projects.includes(definedFilters.projects);
      }
    }

    return (
      matchedPinned &&
      matchedKeywords &&
      matchedDate &&
      matchedInputType &&
      matchedTags &&
      matchedProjects
    );
  });
}



export function EntryGroup(props) {
  const { user } = UserAuth();
  const entries = GetEntries(user.uid);

  const {
    pinned,
    keywords,
    date,
    inputType,
    tags,
    projects,
    sortOrder,
    isColumn,
    lastThree
  } = props; // Destructure the props

  useEffect(() => {
    let filtered = entries;

    if (pinned || keywords || date || inputType || tags || projects) {
      filtered = filterEntries(entries, {
        keywords: keywords,
        date: date,
        inputType: inputType,
        tags: tags,
        projects: projects,
        pinned: pinned,
      });
    }
    if (sortOrder === "oldest") {
      // Sorting logic for oldest
      filtered.sort((a, b) => a.timestamp - b.timestamp);
    } else {
      // Default sorting logic for newest
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }
    
    const processedEntries = processEntries(filtered, lastThree);
    setFilteredEntries(processedEntries);
  }, [entries, pinned, keywords, date, inputType, tags, projects, sortOrder]);

  const [filteredEntries, setFilteredEntries] = useState(entries);

  function processEntries(filteredEntries, lastThree) {
    if (lastThree) {
      return filteredEntries.slice(0, 3);
    } else {
      // Return the original array as it is
      return filteredEntries;
    }
  }
    //className change for CalendarPage
    const entryGroupClassName = `entryGroup${isColumn ? 'Column' : ''}`;

  return (
    <div className={entryGroupClassName}>
      {filteredEntries.length > 0 ? (
        filteredEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))
      ) : (
        <div className="emptyStateContainer">
            <img
                className="emptyStateGuy"
                src={imgEmptyState}
                alt="No Results Found"
              />
              <p style={{ fontSize: "20px", fontStyle: "italic", fontWeight: 300 }}>
                No entries to display
              </p> 
        </div>
      )}
    </div>
  );
}


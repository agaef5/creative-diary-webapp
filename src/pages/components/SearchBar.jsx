import { useEffect, useState } from "react";
import { ProjectGroup, SelectProject } from "./Projects";
import { SelectTag } from "./Tags";
import { EntryGroup } from "./EntryGroup";
import "../../styles/searchBar.css";

// coded by Aga
export function SearchBar(props){

    const {project, tag, inputType} = props;

    const [keywords, setKeywords] = useState('');
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [selectedInputTypes, setSelectedInputTypes] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [search, setSearch] = useState(false);

    const [searchKeywords, setSearchKeywords] = useState('');
    const [searchInputTypes, setSearchInputTypes] = useState('');
    const [searchProjects, setSearchProjects] = useState([]);
    const [searchTags, setSearchTags] = useState([]);
    const [sortOrder, setSortOrder] = useState('');

    function performSearch(){
        setSearchKeywords(keywords);

        if(inputType && inputType.length !==0){
            setSearchInputTypes(inputType)
        } else {
            setSearchInputTypes(selectedInputTypes)
        }

        if (tag && tag.length !== 0) {
            setSearchTags(tag);
        } else {
            setSearchTags(selectedTags);
        }

        if (project && project.length !== 0) {
            setSearchProjects(project);
        } else {
            setSearchProjects(selectedProjects);
        }
        setSearch(false);
        setShowResults(true);
    }

    function handleSortingChange(event) {
        setSortOrder(event.target.value);
      }

      console.log(searchKeywords);

    return(
        <div className="searchBarContainer">
            <div className="searchBar" aria-role="search">
                <input className="searchInput shadow"
                        type="text"
                        placeholder="Search The Library..."
                        onClick={()=> (setSearch(true))}
                        onChange={(e) => setKeywords(e.target.value)}/>

                {search && (
                    <div className="choiceField shadow">
                        {(!project || project.length === 0) && 
                        <SelectProject onProjectSelect={setSelectedProjects}/>}

                        {(!tag || tag.length === 0) &&  
                        <SelectTag onTagSelect={setSelectedTags}/>}

                        {(!inputType || inputType.length === 0) && 
                        <SelectInputType onInputTypeSelect={setSelectedInputTypes}/>}
                
                        <button id='searchButton' onClick={performSearch}>Search</button>
                    </div>
                )}
            </div>
                
            {showResults && (
                <div className="searchBarResults">
                    <div className="resultsOptions">
                        <h2>Results</h2>
                        <div className="sortBy">
                            Sort By:
                            <select value={sortOrder} onChange={handleSortingChange} className="dropdownSorting">
                                <option value="">Select</option>
                                <option value="newest">From Newest</option>
                                <option value="oldest">From Oldest</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        {(searchKeywords.length > 0) && <ProjectGroup keywords={searchKeywords}/>}
                        <EntryGroup keywords={searchKeywords} projects={searchProjects} tags={searchTags} inputType={searchInputTypes} sortOrder={sortOrder}/>
                    </div>

                </div>
                
            )}

        </div>
    )
}

export function SelectInputType({ onInputTypeSelect, selectedInputTypes }) {
    const inputTypes = ["BrainDump", "DailyChallenge", "CreativityBooster"];

    const [internalSelectedInputTypes, setInternalSelectedInputTypes] = useState(selectedInputTypes || []);

    // It toggles the selection of an input type by adding or removing it from the selectedInputTypes array.
    const handleInputTypeSelect = (inputType) => {
        const updatedSelectedInputTypes = internalSelectedInputTypes.includes(inputType)
            ? internalSelectedInputTypes.filter((type) => type !== inputType)
            : [...internalSelectedInputTypes, inputType];
    
        setInternalSelectedInputTypes(updatedSelectedInputTypes);
        onInputTypeSelect(updatedSelectedInputTypes);
    };
    
    return (
        <div className="flex-row">
            <p>Input Types:</p>
            {inputTypes.map((inputType) => (
                <button
                    key={inputType}
                    onClick={() => handleInputTypeSelect(inputType)}
                    style={{                      
                        backgroundColor: internalSelectedInputTypes.includes(inputType) ? 'var(--accCol)' : 'var(--textInputLight)',
                        color: internalSelectedInputTypes.includes(inputType) ? 'var(--text)' : 'var(--lightElem)',
                        margin: '0.5rem',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '0.125rem',
                    }}
                >
                    {inputType}
                </button>
            ))}
            <p></p>
        </div>
    );
}
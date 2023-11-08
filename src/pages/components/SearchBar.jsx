import { useEffect, useState } from "react";
import { ProjectGroup, SelectProject } from "./Projects";
import { SelectTag } from "./Tags";
import { EntryGroup } from "./EntryGroup";
import { ProjectPage } from "../GroupAndProjectPage";

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
        <div>
            <input type="text"
                    placeholder="Search The Library..."
                    onClick={()=> (setSearch(true))}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="searchInput"/>

             {search && (
                <>
                {(!project || project.length === 0) && <SelectProject onProjectSelect={setSelectedProjects}/>}

                {(!tag || tag.length === 0) &&  <SelectTag onTagSelect={setSelectedTags}/>}

                {(!inputType || inputType.length === 0) && <SelectInputType onInputTypeSelect={setSelectedInputTypes}/>}
               

                <button onClick={performSearch}>Search</button>
                </>
             )}       

          
            <br/>
                
            {showResults && (
                <>
                    <h2 style={{marginTop: '4rem', marginBottom: '0'}}>Results</h2>
                    <div className="sortBy">
                        Sort By:
                        <select value={sortOrder} onChange={handleSortingChange} className="dropdownSorting">
                            <option value="">Select</option>
                            <option value="newest">From Newest</option>
                            <option value="oldest">From Oldest</option>
                        </select>
                    </div>

                    {(searchKeywords.length > 0) && <ProjectGroup keywords={searchKeywords}/>}
                    <EntryGroup keywords={searchKeywords} projects={searchProjects} tags={searchTags} inputType={searchInputTypes} sortOrder={sortOrder}/>
                    </>
                
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
        <div>
            <p></p>
            {inputTypes.map((inputType) => (
                <button
                    key={inputType}
                    onClick={() => handleInputTypeSelect(inputType)}
                    style={{
                        backgroundColor: internalSelectedInputTypes.includes(inputType) ? 'var(--accCol)' : 'var(--textInputLight)',
                        color: internalSelectedInputTypes.includes(inputType) ? 'var(--text)' : 'var(--lightElem)',                        
                    }}
                >
                    {inputType}
                </button>
            ))}
            <p></p>
        </div>
    );
}
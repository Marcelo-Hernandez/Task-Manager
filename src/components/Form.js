import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import TaskCard from "./TaskCard";

function Form () {
  const [isFolderSelected, setIsFolderSelected] = useState(null);
  const [stagedFolders, setStagedFolders] = useState({id: uuidv4(), name:"", task: [{id: uuidv4(), text:"", completed: false}] })
  const [folder, setFolder] = useState([
    {id: uuidv4(), name:"Example", task:[{id: uuidv4(), text:"example task to describe a task", completed: false}] },
    {id: uuidv4(), name:"Task", task:[{id: uuidv4(), text: "example text", completed: false}, {id: uuidv4(), text: "some more", completed: false}] },
    {id: uuidv4(), name:"Items", task: [{id: uuidv4(), text: ["example task to describe a task"], completed: false}] }
  ]);
  

  const handleFolderNameChange = (e) => {
    const {value} = e.target;
    setStagedFolders({id: uuidv4(), name: value, task:[{}]})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFolder([...folder, stagedFolders]);
    setStagedFolders({name:""})
    
  }

  const handleClick = (id) => { 
    setIsFolderSelected(id);
    console.log(folder);
  }
  
    return (
      <div className="flex flex-row">
        <div className="flex flex-row justify-center w-72 mt-20">
            <div className= "bg-slate-300 rounded-md custom-color shadow-lg p-4">
                <h1 className="flex justify-center text-3xl font-serif font-semibold">Folder Menu</h1>
                <ul>
                    {folder.map((folder) =>{
                      return <li 
                                key={folder.id} 
                                className="custom-input rounded-lg p-2"
                                onClick={()=>handleClick(folder.id)}>
                                 <span className="cursor-pointer">{folder.name}</span>
                              </li>
                    })}
                </ul>
                <form 
                  onSubmit={handleSubmit} 
                  className="flex flex-row m-4 w-56 shadow-md"
                >
                    <input 
                      value={stagedFolders.name}
                      className="custom-input" 
                      onChange={handleFolderNameChange}
                    />
                    <button 
                      type="submit" 
                      className="custom-input w-10 font-bold font-mono shadow-md">+</button>
                </form>
            </div>
   </div>    
                    
            <TaskCard 
              folder={folder} 
              isFolderSelected={isFolderSelected} 
              setFolder={setFolder}
              >
            </TaskCard>
   </div>
    )
}

export default Form


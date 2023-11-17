
import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";
import { checkListButton } from "./Utilities";
import { CSSTransition } from "react-transition-group";


//load tasks 
export default function TaskCard ({folder, isFolderSelected, setFolder}) {
  const [stagedTask, setStagedTask] = useState([{id: uuidv4(), text:"", completed: false}]);
  const filteredList = isFolderSelected ? folder.find(task => task.id === isFolderSelected) : null;
  
  const toggleTaskComplete = (taskId) => {
    const updatedFolderList = folder.map((f) => 
        f.id === isFolderSelected 
        ? {...f, task: f.task.map(t => t.id === taskId ? {...t, completed: !t.completed} : t )} 
        : f
    )
      setFolder(updatedFolderList);
      removeCompletedTask(taskId);
  }

  const removeCompletedTask = (taskId) => {
    // Add a delay of 500ms before removing the task
    setTimeout(() => {
      const updatedFolderList = folder.map((f) =>
        f.id === isFolderSelected
          ? { ...f, task: f.task.filter(t => t.id !== taskId) }
          : f
      );
  
      setFolder(updatedFolderList);
    }, 500);
  };
  
  const handleTaskChange = (e) => {
    const task = e.target.value;
    setStagedTask({id: uuidv4(), text: task, completed: false});
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    
  const updatedFolderList = folder.map((f) =>
      f.id === isFolderSelected
        ? { ...f, task: [...f.task, stagedTask] }
        : f
    );
    
    setFolder(updatedFolderList);
    setStagedTask({text:""}); // Clear the staged task input
  };

  
  
    if(!isFolderSelected || !filteredList) {

      

      return (
        <div className="flex items-center ml-4 mt-20">
        <div className="flex flex-col justify-right card-style rounded-lg shadow-lg p-4">
            <header  className="flex justify-center font-serif font-bold text-3xl">Check Folders</header>
              <div className="flex">
                <p className="p-2">
                  Select a folder to load tasks!     
                </p>
              </div>
        </div>
      </div>
      
      )
    }
  
    return(
      <CSSTransition
      in={isFolderSelected === filteredList}
      timeout={500}
      classNames="fade"
      
    >

      <div className="flex items-center ml-4 mt-20 fade">
        <div className="flex flex-col justify-right card-style rounded-lg shadow-lg p-4">
            <header  className="flex justify-center font-serif font-bold text-3xl fade">{filteredList.name}</header>
              <div className="flex">
                <div className="p-2 w-full">
                     {filteredList.task.map((task)=>(
                      <li
                       className="flex flex-row justify-between p-2 bg-task-color mb-1 fade"
                       key={task.id}>{task.text}{checkListButton({task, toggleTaskComplete})}</li>
                     ))}
                </div>
              </div>
                <div className="flex mt-56 justify-center">
                    <form 
                      onSubmit={handleTaskSubmit} 
                      className="flex flex-row m-4 w-56 shadow-md"
                    >
                    <input 
                      value={stagedTask.text}
                      className="custom-input" 
                      onChange={handleTaskChange}
                    />
                    <button 
                      type="submit" 
                      className="custom-input w-10 font-bold font-mono shadow-md">+</button>
                </form>
                </div>
        </div>
          
      </div>
      </CSSTransition>
    )
}












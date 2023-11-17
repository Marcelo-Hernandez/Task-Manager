import React from "react";


function checkListButton({task, toggleTaskComplete}) {

    return (
        
        <div className="flex px-10">
        <div className="flex items-center h-5">
            <input 
              onChange={()=>toggleTaskComplete(task.id)}
              id={task.id} aria-describedby="helper-checkbox-text" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
        </div>
        <div className="flex flex-row ml-2 text-sm">
            <label htmlFor ="helper-checkbox" className="font-medium text-gray-900">Status</label>
            <p id="helper-checkbox-text" className="text-xs font-normal text-gray-90 ml-2">{task.complete ? "Completed!" : "Pending..."}</p>
        </div>
    </div>
    )
    
}

export {checkListButton}
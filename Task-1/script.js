const inputTask=document.getElementById("taskInput");
const addButton=document.getElementById("addTaskButton");
const taskList=document.getElementById("taskList");

addButton.addEventListener("click",function(){
    let taskText=inputTask.value;
    if(taskText===""){
        alert("Please enter a task.");
        return;
    }
    else{
        const li=document.createElement("li");
        li.innerHTML=taskText;
        taskList.appendChild(li);
        
        let span=document.createElement("span");
        span.innerHTML="X";
        li.appendChild(span);
    }
    inputTask.value="";
    saveToLocalStorage();
})

taskList.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveToLocalStorage();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveToLocalStorage();
    }
})

function saveToLocalStorage(){
    const tasks=taskList.innerHTML;
    localStorage.setItem("tasks",tasks);
}

function loadFromLocalStorage(){
    const tasks=localStorage.getItem("tasks");
    if(tasks){
        taskList.innerHTML=tasks;
    }
}

loadFromLocalStorage();
// const taskbutton = document.getElementById('taskbtn');
// const editbutton = document.querySelectorAll('.editbtn');
// const deletebutton = document.querySelectorAll('.delete');
// const savebutton = document.querySelectorAll('.save');
// editbutton.forEach((editbtn)=>{
//     editbtn.addEventListener('click',(e)=>{
//             if(e.target.textContent === "Edit"){
//                 e.target.textContent = "Save";
//                 let parentDiv = e.target.parentElement.previousElementSibling;
//                 parentDiv.setAttribute("contenteditable","true");
//             }
//             else if(e.target.textContent === "Save"){
//                 e.target.textContent = "Edit";
//                 let parentDiv = e.target.parentElement.previousElementSibling;
//                 parentDiv.setAttribute("contenteditable","false");
//             }
//     })
// })


// deletebutton.forEach((deletebtn)=>{
//     deletebtn.addEventListener('click',(e)=>{
//         let change = e.target.parentElement.parentElement;
//         change.remove();
//     })
// })

const container = document.getElementById('container');
const taskbutton = document.getElementById('taskbtn');


// load all the previous task which are saved
document.addEventListener('DOMContentLoaded',loadSavedTasks);
function loadSavedTasks(){
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach((task)=>{
        addingTheTasks(task);
    })
}

// Edit button, save button and delete button functionality
container.addEventListener('click', (e) => {
    const target = e.target;

    // Handle Edit button click
    if (target.classList.contains('editbtn')) {
        const parentDiv = target.parentElement.previousElementSibling;
        if (target.textContent === 'Edit') {
            parentDiv.setAttribute('contenteditable', 'true');
            parentDiv.focus();
            target.textContent = 'Save';
        } else if (target.textContent === 'Save') {
            parentDiv.setAttribute('contenteditable', 'false');
            target.textContent = 'Edit';
            savingTheTasks();
        }
    }
    
    // Handle Delete button click
    if (target.classList.contains('delete')) {
        const taskDiv = target.closest('.task');
        taskDiv.remove();
        savingTheTasks();
    }
    


    // Adding the line through styling on the task
    const textcontainer = document.querySelectorAll('.task .textcontainer');
    textcontainer.forEach((text) => {text.addEventListener('click',(e)=>{
        const target = e.target;
        if(target.style.textDecoration!=="line-through"){
            target.style.textDecoration = "line-through";
            target.style.color = "#5b5959";
        }
        else{
            target.style.textDecoration = "";
            target.style.color = "#ffffff";
        }
        e.stopPropagation();
    })
})





});


// Add task button to add new task given in the input box
taskbutton.addEventListener('click', () => {
    let inputbox = document.getElementById('inputfield');
    if(inputbox.value){
        addingTheTasks(inputbox.value);
        inputbox.value = "";
        savingTheTasks();
    }
})

// Save the task
function savingTheTasks(){
    const tasksList = document.querySelectorAll('.task .textcontainer');
    const tasks = Array.from(tasksList).map(task => task.textContent);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Take the value which is task and make a div for showing the task
function addingTheTasks(value){
    let taskcontainer = document.getElementById('taskcontainer');
    let div = document.createElement('div');
    div.setAttribute('class','task');
    div.innerHTML = `<div contenteditable="false" class="textcontainer">${value}</div>
                        <div id="btn">
                            <button class="editbtn">Edit</button>
                            <button class="delete">Delete</button>
                        </div>`;
    taskcontainer.appendChild(div);
}


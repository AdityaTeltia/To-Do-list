//Define UI vars

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listener

loadEventListeners();

function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task event
  form.addEventListener('submit', addTask); 
  //Remove task event
  tasklist.addEventListener('click', removeTask); 
  //clear task event
  clearBtn.addEventListener('click', clearTask);
  //filter task event
  filter.addEventListener('keyup', filterTask);
}

//Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  

  tasks.forEach(function(task){
    //Adding A li dynamically
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    
    //Creating a New Link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>'
    
    //Appending link to li
    li.appendChild(link);
    
    //Append li to ul
    tasklist.appendChild(li);

  })
}

//Add Task

function addTask(e){
  if(taskInput.value === ''){
    alert('Add Task')
  }
  //Adding A li dynamically
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  
  //Creating a New Link
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class = "fa fa-remove"></i>'
  
  //Appending link to li
  li.appendChild(link);
  
  //Append li to ul
  tasklist.appendChild(li);

  //Store in local storage

  storeTaskInLocalStorage(taskInput.value);
  
  //Clearing the value after submission
  taskInput.value = '';

  //Preventing default propety of the target
  e.preventDefault();
} 
//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Task
function clearTask(e){
  tasklist.innerHTML = '';

  //Clear Tasks From Local Storage
  clearTasksFromLocalStorage();
}

//Clear Tasks From Ls
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you Sure')){
      e.target.parentElement.parentElement.remove();

      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from Ls
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    console.log(index);
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Filter Task
function filterTask(e){
  const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text) != -1){
       task.style.display = 'block';
     }else{
       task.style.display = 'none';
     }
   })
}



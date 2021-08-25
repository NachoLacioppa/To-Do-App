document.getElementById('formTask').addEventListener('submit', saveTask);

class UI {
  showMessage(message, cssClass) {
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-4`;
    div.appendChild(document.createTextNode(message));
    //mostrando
    const container = document.querySelector('.alerta');
    const app = document.querySelector('#App');
    container.insertBefore(div, app);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}
}

function saveTask(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let date = document.getElementById('date').value;
  
  const ui = new UI();

  let task = {
    title,
    description,
    date
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  ui.showMessage('Tarea Cargada', 'success');
  e.preventDefault();
}

function deleteTask(title) {
  const ui = new UI();
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
  ui.showMessage('Tarea eliminada', 'danger');
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    let date = tasks[i].date;

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <h3>${title}</h3>
          <p>${description}</p>
          <p>${date}</p>
          <br>
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-outline-danger">Delete</a>
        </div>
      </div>`;
  }
}

getTasks();
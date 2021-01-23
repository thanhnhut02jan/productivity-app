
let listTodo = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
let taskContainer = document.getElementById('task-container');

// Delete task fn and mark as done fn

function deleteTask(index) {
    index = parseInt(index);
    return function () {
        listTodo = [].concat(listTodo.slice(0, index), (listTodo.slice(index + 1, listTodo.length)));
        localStorage.setItem('tasks', JSON.stringify(listTodo));
        render();
    }
}

function markAsDoneTask(index) {
    index = parseInt(index);
    return function () {
        listTodo[index].isDone = !listTodo[index].isDone;
        localStorage.setItem('tasks', JSON.stringify(listTodo));
        render();
    }
}

// Render fn

function render() {
    let mapList = listTodo.map((item, index) => {
        let classList = 'list-item';
        let icon = '<i class="fas fa-check"></i>';
        if (item.isDone) {
            classList += ' list-item--done';
            icon = '<i class="fas fa-undo"></i>'
        }
        return `<li class='${classList}'>
                    <span>${item.data}</span>
                    <div class="delBtn" data-index=${index}> <i class="far fa-trash-alt"></i></div>
                    <div class='markAsDoneBtn' data-index=${index}> ${icon} </div>
                </li>
        `.trim();
    });

    taskContainer.innerHTML =
        `<ul class="list-todos">
        ${mapList.join('')}
        </ul>`;

    document.querySelectorAll('.delBtn').forEach(btn => {
        let fn = deleteTask(btn.getAttribute('data-index'));
        btn.addEventListener('click', fn);
    });

    document.querySelectorAll('.markAsDoneBtn').forEach(btn => {
        let fn = markAsDoneTask(btn.getAttribute('data-index'));
        btn.addEventListener('click', fn);
    });
}
render();


// Add Task fn

function addTask(event) {
    if (event.which == 1 || event.which == 13) {
        if (todoTextInput.value) {
            let Taskobj = {
                data: todoTextInput.value,
                isDone: false
            }
            listTodo.push(Taskobj);
        }
        localStorage.setItem('tasks', JSON.stringify(listTodo));
        render();
        todoTextInput.value = '';
    }
}

let addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', addTask);

let todoTextInput = document.getElementById('todo-text-input');
todoTextInput.addEventListener('keypress', addTask);


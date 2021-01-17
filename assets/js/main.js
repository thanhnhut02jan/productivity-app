
let listTodo = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
let taskContainer = document.getElementById('task-container');

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

function render() {
    let mapList = listTodo.map((item, index) => {
        let classList = 'list-item';
        let icon = '<i class="fas fa-check"></i>';
        if (item.isDone) {
            classList += ' list-item--done';
            icon = '<i class="fas fa-undo"></i>'
        }
        return `<li class='${classList}'>
                    ${item.data}
                    <div class="delBtn" data-index=${index}> <i class="far fa-trash-alt"></i> </i></div>
                    <div class='markAsDoneBtn' data-index=${index}> ${icon} </div>
                </li> 
        `
    }); 
    taskContainer.innerHTML = 
    `<ul class="list-todos">
        ${mapList.join(' ')}
    </ul>`;

    document.querySelectorAll('.delBtn').forEach(item => {
        let fn = deleteTask(item.getAttribute('data-index'));
        item.addEventListener('click', fn);
    });

    document.querySelectorAll('.markAsDoneBtn').forEach(item => {
        let fn = markAsDoneTask(item.getAttribute('data-index'));
        item.addEventListener('click', fn);
    });
}
render();

let input = document.getElementById('add-todo-input');
function addTask(event) {
    if (event.which == 1 || event.which == 13) {
        if (input.value) {
            let Taskobj = {
                data: input.value,
                isDone: false
            }
            listTodo.push(Taskobj);
        }
        localStorage.setItem('tasks', JSON.stringify(listTodo));
        render();
        input.value = '';
    }
}

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', addTask);
    

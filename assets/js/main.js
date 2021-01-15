
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

function render() {
    let mapList = listTodo.map((item, index) => {
        return `<li class='list-item'>
                    ${item}
                    <div id='del-btn' class="delBtn" data-index=${index}><i class="far fa-trash-alt"></i></div>
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
}

render();

let input = document.getElementById('add-todo-input');

function add(event) {
    if (event.which == 1 || event.which == 13) {
        if (input.value) listTodo.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(listTodo));
        render();
        input.value = '';
    }
}


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', add)
input.addEventListener('keypress', add)
    

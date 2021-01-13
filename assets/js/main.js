let listTodo = [

]

let taskContainer = document.getElementById('task-container');

function render() {
    let mapList = listTodo.map((item) => {
        return `<li class='list-item'>${item}</li>`
    }); 
    taskContainer.innerHTML = `<ul class="list-todos">${mapList.join(' ')}</ul>`
}

let input = document.getElementById('add-todo-input');

function add(event) {
    if (event.which == 1 || event.which == 13) {
        if (input.value) listTodo.push(input.value);
        render();
        input.value = '';
    }
    
}


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', add)
input.addEventListener('keypress', add)
    

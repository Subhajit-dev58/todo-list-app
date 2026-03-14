const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos(){
localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCounter(){
const remaining = todos.filter(t => !t.completed).length;
const total = todos.length;
taskCount.textContent = remaining + " of " + total + " tasks left";
}

function createTodoNode(todo,index){

const li=document.createElement("li");

const checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.checked=todo.completed;

checkbox.addEventListener("change",()=>{
todo.completed=checkbox.checked;
render();
saveTodos();
});

const text=document.createElement("span");
text.textContent=todo.text;

if(todo.completed){
text.classList.add("completed");
}

text.addEventListener("dblclick",()=>{

const newText=prompt("Edit task:",todo.text);

if(newText===null) return;

const trimmed=newText.trim();

if(trimmed===""){
alert("Task cannot be empty");
return;
}

todo.text=trimmed;

render();
saveTodos();

});

const delBtn=document.createElement("button");
delBtn.innerHTML='<i class="fa-solid fa-trash"></i>';

delBtn.addEventListener("click",()=>{

li.classList.add("fade-out");

setTimeout(()=>{

todos.splice(index,1);

render();
saveTodos();

},300);

});

li.appendChild(checkbox);
li.appendChild(text);
li.appendChild(delBtn);

return li;

}

function render(){

list.innerHTML="";

let filtered=todos;

if(currentFilter==="active"){
filtered=todos.filter(t=>!t.completed);
}

if(currentFilter==="completed"){
filtered=todos.filter(t=>t.completed);
}

if(filtered.length===0){
list.innerHTML="<p style='text-align:center;color:#cbd5f5'>No tasks yet 🚀</p>";
updateCounter();
return;
}

filtered.forEach((todo,index)=>{

const node=createTodoNode(todo,index);

list.appendChild(node);

});

updateCounter();

}

function addTodo(){

const text=input.value.trim();

if(!text) return;

todos.push({
text:text,
completed:false
});

input.value="";

render();
saveTodos();

}

addBtn.addEventListener("click",addTodo);

input.addEventListener("keydown",(e)=>{
if(e.key==="Enter"){
addTodo();
}
});

filterBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

filterBtns.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

currentFilter=btn.dataset.filter;

render();

});

});

render();

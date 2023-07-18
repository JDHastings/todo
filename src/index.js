import './style.css'
import htmlFactory from './htmlFactory'
import taskFactory from './taskFactory'

let tasks = [];

const headText = htmlFactory('div', {class: 'header-text'}, 'Todo List')
const header = htmlFactory('header', {}, headText);

const today = htmlFactory('button', {class: 'side-button', id: 'today'}, 'Today');
const tomorrow = htmlFactory('button', {class: 'side-button', id: 'tomorrow'}, 'Tomorrow');
const week = htmlFactory('button', {class: 'side-button', id: 'week'}, 'Week');
const month = htmlFactory('button', {class: 'side-button', id: 'month'}, 'Month');
const projects = htmlFactory('div', {class: 'project-header'}, "Projects");
const addProject = htmlFactory('button', {class: 'add-project'}, '+ Add Project')
const sidebar = htmlFactory('div', {class: 'sidebar'}, today, tomorrow, week, month, projects, addProject);

const content = htmlFactory('div', {class: 'tasks'});

const footer = htmlFactory('footer', {}, 'Copyright 2023 JDHastings');

const container = htmlFactory('div', {class: 'container'}, header, sidebar, content, footer);
document.body.append(container);

// Init random tasks for format tests
tasks.push(new taskFactory("Eat food", false, new Date("2023-07-18T00:00:00"), 'none'));
tasks.push(new taskFactory("Poop", false, new Date("2023-07-17T00:00:00"), 'none'));
tasks.push(new taskFactory("Fart", false, new Date("2023-07-31T00:00:00"), 'none'));


document.querySelectorAll('.side-button').forEach(button => {
    button.addEventListener('click', updateDisplay);
});

function updateDisplay(){
    document.querySelectorAll('.task-container').forEach(task => task.remove());
    if(this.id == 'today'){
        displayToday();
    }else if(this.id == 'tomorrow'){
        displayTomorrow();
    }else if(this.id == 'week'){
        displayWeek();
    }else if(this.id == 'month'){
        displayMonth();
    }else{
        displayProject(this.id);
    }
    addTask();
}

function addTask(){
    const addTaskButton = htmlFactory('button', {class: 'add-task task-container'}, '+ Add Task');
    content.append(addTaskButton);
    addTaskButton.addEventListener('click', taskUi);
}

function taskUi(){
    content.lastChild.remove();
    const taskForm = htmlFactory('form', {class: });
}

function displayToday(){
    tasks.forEach(task => {
        if(task.date.getDate() == new Date().getDate()){
            content.append(renderTask(task));
        }
    });
}

function displayTomorrow(){
    tasks.forEach(task => {
        if(task.date.getDate() == new Date().getDate() + 1){
            content.append(renderTask(task));
        }
    });
}

function displayWeek(){
    tasks.forEach(task => {
        if(task.date.getDate() >= new Date().getDate() && task.date.getDate() < new Date().getDate() + 7){
            content.append(renderTask(task));
        }
    });
}

function displayMonth(){
    tasks.forEach(task => {
        if(task.date.getMonth() == new Date().getMonth()){
            content.append(renderTask(task));
        }
    });
}

function displayProject(project){
    console.log(project + ' is ' + project);
}

function renderTask(task) {
    const taskCompletion = htmlFactory('button', {class: 'check-box'});
    const taskName = htmlFactory('div', {class: 'task-name'}, task.name);
    const taskDate = htmlFactory('div', {class: 'task-date'}, task.date.toString());
    return htmlFactory('div', {class: 'task-container'}, taskCompletion, taskName, taskDate);
}
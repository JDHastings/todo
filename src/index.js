import './style.css'
import htmlFactory from './htmlFactory'
import taskFactory from './taskFactory'
import {compareAsc, format} from 'date-fns'
import endOfToday from 'date-fns/endOfToday'
import endOfTomorrow from 'date-fns/endOfTomorrow'
import nextSaturday from 'date-fns/nextSaturday'
import endOfMonth from 'date-fns/endOfMonth'

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

document.querySelectorAll('.side-button').forEach(button => {
    button.addEventListener('click', updateDisplay);
});

function updateDisplay(){
    document.querySelectorAll('.tasks>*').forEach(task => task.remove());

    tasks.sort(function(a,b){
        return a.date - b.date;
    });

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
    addTask(this.id);
}

function addTask(date){
    const addTaskButton = htmlFactory('button', {class: 'add-task task-container'}, '+ Add Task');
    content.append(addTaskButton);
    addTaskButton.addEventListener('click', () => {
        taskUi(date);
    });
}

function taskUi(date){
    content.lastChild.remove();

    const submitTask = htmlFactory('button', {}, 'Add Task!');
    const taskName = htmlFactory('input', {class: 'add-task-input', type: 'text-box'});
    const taskForm = htmlFactory('div', {class: 'task-form'}, taskName, submitTask);
    content.append(taskForm);
    submitTask.addEventListener('click', () => {
        const newestTask = new taskFactory(taskName.value, false, new Date(), 'none');
        
        const day = new Date();

        if(date == 'today'){
            newestTask.date = endOfToday();
        }else if(date == 'tomorrow'){
            newestTask.date = endOfTomorrow();
        }else if(date == 'week'){
            newestTask.date = nextSaturday(new Date());
        }else if(date == 'month'){
            newestTask.date = endOfMonth(new Date());
        }else{
            
        }

        tasks.push(newestTask);
        content.lastChild.remove();
        content.append(renderTask(newestTask));
        addTask(date);
    });

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
    const taskDate = htmlFactory('div', {class: 'task-date'}, format(task.date, 'MM/dd/yyyy'));
    return htmlFactory('div', {class: 'task-container'}, taskCompletion, taskName, taskDate);
}
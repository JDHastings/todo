import './style.css'
import htmlFactory from './htmlFactory'
import taskFactory from './taskFactory'

const headText = htmlFactory('div', {class: 'header-text'}, 'Todo List')
const header = htmlFactory('header', {}, headText);

const today = htmlFactory('button', {class: 'side-button'}, 'Today');
const tomorrow = htmlFactory('button', {class: 'side-button'}, 'Tomorrow');
const week = htmlFactory('button', {class: 'side-button'}, 'Week');
const month = htmlFactory('button', {class: 'side-button'}, 'Month');
const sidebar = htmlFactory('div', {class: 'sidebar'}, today, tomorrow, week, month);

let tasks = [];

tasks.push(new taskFactory("Eat food", false, new Date(), 'none'));

function renderTask(task) {
    const taskCompletion = htmlFactory('button', {class: 'check-box'});
    const taskName = htmlFactory('div', {class: 'task-name'}, task.name);
    const taskDate = htmlFactory('div', {class: 'task-date'}, task.date.toString());
    return htmlFactory('div', {class: 'task-container'}, taskCompletion, taskName, taskDate);
}

const content = htmlFactory('div', {class: 'tasks'}, renderTask(tasks[0]));

const footer = htmlFactory('footer', {}, 'Copyright 2023 JDHastings');

const container = htmlFactory('div', {class: 'container'}, header, sidebar, content, footer);
document.body.append(container);


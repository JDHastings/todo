import './style.css'
import htmlFactory from './htmlFactory'

const helloWorld = htmlFactory('h1', {}, 'Hi there world');
document.body.append(helloWorld);
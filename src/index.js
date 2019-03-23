import { createElement, render, renderDOM } from './element'

let virtualDOM = createElement('ul', {class: 'title'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c'])
])

console.log(render(virtualDOM))

renderDOM(render(virtualDOM), window.root)


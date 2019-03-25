import { createElement, render, renderDOM } from './element'
import diff from './diff'
import patch from './patch'

let virtualDOM1 = createElement('ul', {class: 'title'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c'])
])

let virtualDOM2 = createElement('ul', {class: 'title-new'}, [
  createElement('li', {class: 'item'}, ['1']),
  createElement('div', {class: 'item'}, ['b'])
])

let patches = diff(virtualDOM1, virtualDOM2)
//console.log(patches)

let el = render(virtualDOM1)
patch(el, patches)

renderDOM(el, window.root)


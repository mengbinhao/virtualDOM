class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

let createElement = (type, props, children) => {
  return new Element(type, props, children)

}

let setAttr = (node, key, value) => {
  switch(key) {
    case 'value':
      if (node.tagName.toUppercase() === 'INPUT' || node.tagName.toUppercase() === 'TEXTAREA') {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break
    case 'style':
      node.style.cssText = value
      break
    default:
      node.setAttribute(key, value)
      break
  }
}

let render = (elObj) => {
  let el = document.createElement(elObj.type)
  for (let key in elObj.props) {
    setAttr(el, key, elObj.props[key])
  }
  elObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  })
  return el
}

let renderDOM = (el, target) => {
  target.appendChild(el)
}

export { createElement, render, renderDOM }
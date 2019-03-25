import { Element, render } from "./element";

let allPatches
let index = 0 //给哪个节点打补丁
function patch(node, patches) {
	allPatches = patches
	walk(node)
}

//从后往前打
function walk(node) {
	let currentPatch = allPatches[index++]
	node.childNodes.forEach(child => {
		walk(child)
	})
	if (currentPatch) {
		doPatch(node, currentPatch)
	}
}

function doPatch(node, patches) {
	patches.forEach(patch => {
		switch(patch.type) {
			case 'ATTRS':
				for (let key in patch.attrs) {
					let value = patch.attrs[key]
					if (value) {
						setAttr(node, key, value)
					} else {
						node.removeAttribute(key)
					}
				}
				break
			case 'TEXT':
				node.textContent = patch.text
				break
			case 'REPLACE':
				let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
				node.parentNode.replaceChild(newNode, node)
				break
			case 'REMOVE':
				node.parentNode.removeChild(node)
				break
		}
	})
}

//set various attribute
function setAttr(node, key, value) {
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

export default patch
function diff(oldTree, newTree) {
	let patches = {}
	let index = 0 //当前比较的节点
	walk(oldTree, newTree, index, patches)
	return patches
}

function isString(node) {
	return Object.prototype.toString.call(node) === '[object String]'
}
const ATTRS = 'ATTRS'
const Text = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'

function walk(oldNode, newNode, index, patches) {
	let currentPatch = [] //each node's patch

	if (!newNode) {
		currentPatch.push({type:REMOVE, index})
	}	else if (isString(oldNode) && isString(newNode)) {
		if (oldNode !== newNode) {
			currentPatch.push({type: Text, text: newNode})
		}
	} else if (oldNode.type === newNode.type) {
		let attrs = diffAttr(oldNode.props, newNode.props)
		if (Object.keys(attrs).length > 0) {
			currentPatch.push({type: ATTRS, attrs})
		}
		diffChildren(oldNode.children, newNode.children, patches)
	//replace
	} else {
		currentPatch.push({type:REPLACE, newNode})
	}

	if (currentPatch.length > 0) {
		patches[index] = currentPatch
	}
}

let Index = 0
function diffChildren(oldChildren, newChildren, patches) {
	oldChildren.forEach((chid, idx) => {
		//note index here!!!
		walk(chid, newChildren[idx], ++Index, patches)
	})
}

function diffAttr(oldAttrs, newAttrs) {
	let patch = {}

	//diff change
	for (let key in oldAttrs) {
		if (oldAttrs[key] !== newAttrs[key]) {
			patch[key] = newAttrs[key] //maybe undefined
		}
	}

	//add new attributes
	for (let key in newAttrs) {
		if (!oldAttrs.hasOwnProperty(key)) {
			patch[key] = newAttrs[key]
		}
	}

	return patch
}

export default diff
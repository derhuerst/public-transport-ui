'use strict'

const createCompatibleH2ml = (h) => {
	const compatibleH2ml = (tag, props = null, children = []) => {
		if (props && props.className) {
			props = Object.assign({}, props)
			props.class = props.className
			delete props.className
		}
		return h(tag, props, children)
	}

	return compatibleH2ml
}

module.exports = createCompatibleH2ml

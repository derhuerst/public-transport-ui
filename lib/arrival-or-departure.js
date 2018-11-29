'use strict'

const create = (render, cfg) => {
	const {h, timezone, locale} = cfg

	const renderArrivalOrDeparture = (type, depOrArr) => {
		const baseCls = 'pt-' + type

		return h('tr', {className: baseCls}, [
			h('td', {className: baseCls + '-when'}, [
				render.time(depOrArr)
			]),
			h('td', {className: baseCls + '-line'}, [
				render.line(depOrArr.line)
			]),
			h('td', {className: baseCls + '-direction'}, [
				'→ ' + depOrArr.direction
			])
		])
	}
	return renderArrivalOrDeparture
}
module.exports = create

'use strict'

const createRenderArrivalOrDeparture = require('./lib/arrival-or-departure')

const create = (render, cfg) => {
	const renderArrivalOrDeparture = createRenderArrivalOrDeparture(render, cfg)

	const renderDeparture = arr => renderArrivalOrDeparture('departure', arr)
	return renderDeparture
}
module.exports = create

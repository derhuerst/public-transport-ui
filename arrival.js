'use strict'

const createRenderArrivalOrDeparture = require('./lib/arrival-or-departure')

const create = (render, cfg) => {
	const renderArrivalOrDeparture = createRenderArrivalOrDeparture(render, cfg)

	const renderArrival = arr => renderArrivalOrDeparture('arrival', arr)
	return renderArrival
}
module.exports = create

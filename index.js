'use strict'

const createRenderTime = require('./time')
const createRenderArrival = require('./arrival')
const createRenderDeparture = require('./departure')

const create = (cfg = {}) => {
	const {h, timezone, locale} = cfg
	if ('function' !== typeof h) throw new Error('h must be a function')
	if ('string' !== typeof timezone) throw new Error('timezone must be a string')
	if ('string' !== typeof locale) throw new Error('locale must be a string')

	const render = {}
	render.time = createRenderTime(render, cfg)
	render.arrival = createRenderArrival(render, cfg)
	render.departure = createRenderDeparture(render, cfg)
	return render
}

module.exports = create

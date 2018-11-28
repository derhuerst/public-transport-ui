'use strict'

const run = require('tape')
const h2ml = require('h2ml')
const vDom = require('virtual-dom/h')

const timeFixtures = require('./fixtures/time')
const arrivalFixtures = require('./fixtures/arrival')
const departureFixtures = require('./fixtures/departure')

const createRenderTime = require('../time')
const createRenderArrival = require('../arrival')
const createRenderDeparture = require('../departure')
const withH2mlCompatibility = require('../h/h2ml')

const timezone = 'Europe/Berlin'
const locale = 'de-DE'

const testFixturesWith = (libName, h) => {
	const cfg = {h, timezone, locale}

	const renderTime = createRenderTime({}, cfg)
	const r = {
		time: () => 'mocked time',
		line: () => 'mocked line',
		direction: () => 'mocked direction'
	}
	const renderArrival = createRenderArrival(r, cfg)
	const renderDeparture = createRenderDeparture(r, cfg)

	for (let id of Object.keys(timeFixtures)) {
		const test = timeFixtures[id]

		run(libName + ' – time – ' + test.title, (t) => {
			const actual = renderTime(test.input)
			const expected = test.expected(h)
			t.deepEqual(actual, expected, 'renders as expected')
			t.end()
		})
	}

	for (let id of Object.keys(arrivalFixtures)) {
		const test = arrivalFixtures[id]

		run(libName + ' – arrival – ' + test.title, (t) => {
			const actual = renderArrival(test.input)
			const expected = test.expected(h)
			t.deepEqual(actual, expected, 'renders as expected')
			t.end()
		})
	}

	for (let id of Object.keys(departureFixtures)) {
		const test = departureFixtures[id]

		run(libName + ' – departure – ' + test.title, (t) => {
			const actual = renderDeparture(test.input)
			const expected = test.expected(h)
			t.deepEqual(actual, expected, 'renders as expected')
			t.end()
		})
	}
}

testFixturesWith('h2ml', withH2mlCompatibility(h2ml))
testFixturesWith('virtual-dom', vDom)

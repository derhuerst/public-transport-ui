'use strict'

const run = require('tape')
const vDom = require('virtual-dom/h')

const timeFixtures = require('./fixtures/time')
const createRenderTime = require('../time')

const timezone = 'Europe/Berlin'
const locale = 'de-DE'

const testFixturesWith = (libName, h) => {
	const cfg = {h, timezone, locale}
	const renderTime = createRenderTime({}, cfg)

	for (let id of Object.keys(timeFixtures)) {
		const test = timeFixtures[id]

		run(libName + ' – time – ' + test.title, (t) => {
			const actual = renderTime(test.input)
			const expected = test.expected(h)
			t.deepEqual(actual, expected, 'renders as expected')
			t.end()
		})
	}
}

testFixturesWith('virtual-dom', vDom)

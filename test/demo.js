'use strict'

const h = require('../h/h2ml')(require('h2ml'))
const flatMap = require('lodash/flatMap')

const createRender = require('..')
const {readCSSSync} = require('../build/read-css')

const timeFixtures = require('./fixtures/time')
const arrivalFixtures = require('./fixtures/arrival')
const departureFixtures = require('./fixtures/departure')

const locale = 'de-DE'
const render = createRender({h, timezone: 'Europe/Berlin', locale})

const renderFixtures = (fixtures, render, idPrefix) => {
	const rendered = Object.entries(fixtures).map(([id, fixture]) => {
		return [
			h('h3', {id: idPrefix + id}, [fixture.title]),
			// todo: show input
			render(fixture.input)
			// todo: show output
		]
	})
	return flatMap(rendered)
}

const css = [
	readCSSSync('time')
].join('\n\n')

process.stdout.write(`
<!DOCTYPE html>` + h('html', {lang: locale}, [
	h('head', null, [
		h('style', null, [css])
	]),
	h('body', null, [
		h('h2', {id: 'pt-time'}, [
			h('code', null, ['/time'])
		]),
		...renderFixtures(timeFixtures, render.time, 'pt-time-'),
		...renderFixtures(arrivalFixtures, render.arrival, 'pt-arrival-'),
		...renderFixtures(departureFixtures, render.departure, 'pt-departure-')
	])
]))

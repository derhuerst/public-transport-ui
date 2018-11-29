'use strict'

module.exports = {
	departure: {
		title: 'departure',
		input: {
			when: '2018-11-22T18:00:00+0100',
			delay: null,
			line: {type: 'line', name: 'foo'},
			direction: 'bar'
		},
		expected: h => {
			return h('tr', {className: 'pt-departure'}, [
				h('td', {className: 'pt-departure-when'}, ['mocked time']),
				h('td', {className: 'pt-departure-line'}, ['mocked line']),
				h('td', {className: 'pt-departure-direction'}, ['→ bar'])
			])
		}
	}
}

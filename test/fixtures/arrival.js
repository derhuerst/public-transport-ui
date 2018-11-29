'use strict'

module.exports = {
	arrival: {
		title: 'arrival',
		input: {
			when: '2018-11-22T18:00:00+0100',
			delay: null,
			line: {type: 'line', name: 'foo'},
			direction: 'bar'
		},
		expected: h => {
			return h('tr', {className: 'pt-arrival'}, [
				h('td', {className: 'pt-arrival-when'}, ['mocked time']),
				h('td', {className: 'pt-arrival-line'}, ['mocked line']),
				h('td', {className: 'pt-arrival-direction'}, ['→ bar'])
			])
		}
	}
}

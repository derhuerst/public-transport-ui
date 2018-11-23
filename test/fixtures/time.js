'use strict'

const whenIso = '2018-11-22T17:00:00.000Z'

module.exports = {
	planned: {
		title: 'planned only',
		input: {
			when: '2018-11-22T18:00:00+0100',
			delay: null
		},
		expected: h => {
			return h('span', {
				className: 'pt-time'
			}, [
				h('time', {datetime: whenIso}, ['18:00'])
			])
		}
	},
	onTime: {
		title: 'on time',
		input: {
			when: '2018-11-22T18:00:00+0100',
			delay: 0
		},
		expected: h => {
			return h('span', {
				className: [
					'pt-time',
					'pt-time--realtime',
					'pt-time--onTime'
				].join(' ')
			}, [
				h('time', {datetime: whenIso}, ['18:00']),
				h('span', {
					className: 'pt-time-delay',
					title: 'on time'
				}, ['+0'])
			])
		}
	},
	delayed: {
		title: 'delayed',
		input: {
			when: '2018-11-22T18:05:20+0100',
			delay: 5 * 60 + 20
		},
		expected: h => {
			return h('span', {
				className: [
					'pt-time',
					'pt-time--realtime',
					'pt-time--delayed'
				].join(' ')
			}, [
				h('time', {datetime: whenIso}, ['18:00']),
				h('span', {
					className: 'pt-time-delay',
					// todo: '5 minutes 20 seconds late'
					title: '5 minutes late'
				}, ['+5m'])
			])
		}
	},
	early: {
		title: 'early',
		input: {
			when: '2018-11-22T17:57:20+0100',
			delay: - (2 * 60 + 40)
		},
		expected: h => {
			return h('span', {
				className: [
					'pt-time',
					'pt-time--realtime',
					'pt-time--early'
				].join(' ')
			}, [
				h('time', {datetime: whenIso}, ['18:00']),
				h('span', {
					className: 'pt-time-delay',
					// todo: '2 minutes 40 seconds early'
					title: '3 minutes early'
				}, ['-3m'])
			])
		}
	},
	cancelled: {
		title: 'cancelled',
		input: {
			when: null,
			cancelled: true,
			formerScheduledWhen: '2018-11-22T18:00:00+0100'
		},
		expected: h => {
			return h('del', {
				className: [
					'pt-time',
					'pt-time--realtime',
					'pt-time--cancelled'
				].join(' '),
			}, [
				h('time', {datetime: whenIso}, ['18:00'])
			])
		}
	}
}

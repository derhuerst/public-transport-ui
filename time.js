'use strict'

const formatTime = require('./lib/format-time')
const formatDelay = require('./lib/format-delay')

const baseCls = 'pt-time'
const realtimeCls = 'pt-time--realtime'
const onTimeCls = 'pt-time--onTime'
const delayedCls = 'pt-time--delayed'
const earlyCls = 'pt-time--early'
const cancelledCls = 'pt-time--cancelled'

const delayCls = 'pt-time-delay'

const create = (render, cfg) => {
	const {h, timezone, locale} = cfg

	const renderDepartureTime = (dep) => {
		let planned = new Date(dep.when || dep.formerScheduledWhen).toISOString()

		if (dep.cancelled) {
			return h('del', {
				className: [baseCls, realtimeCls, cancelledCls].join(' ')
			}, [
				h('time', {datetime: planned}, [
					formatTime(planned, timezone, locale)
				])
			])
		}

		const isRealtime = 'number' === typeof dep.delay
		const isOnTime = isRealtime && dep.delay === 0
		if (isRealtime) {
			// todo: preverse tz offset (breaking)
			planned = new Date(planned)
			planned -= dep.delay * 1000
			planned = new Date(planned).toISOString()
		}

		const classes = [baseCls]
		const els = [
			h('time', {datetime: planned}, [
				formatTime(planned, timezone, locale)
			])
		]

		if (isRealtime) {
			classes.push(realtimeCls)
			if (isOnTime) classes.push(onTimeCls)
			else classes.push(dep.delay < 0 ? earlyCls : delayedCls)

			els.push(h('span', {
				className: delayCls,
				title: formatDelay(dep.delay, locale, true) // long
			}, [
				formatDelay(dep.delay, locale, false) // short
			]))
		}

		return h('span', {
			className: classes.join(' ')
		}, els)
	}

	return renderDepartureTime
}
module.exports = create

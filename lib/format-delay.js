'use strict'

const ms = require('ms')

const second = 1000

const formatDelay = (delay, locale, long = false) => {
	if (delay === 0) return long ? 'on time' : '+0'
	const amount = ms(Math.abs(delay * second), {long})
	if (long) return delay < 0 ? amount + ' early' : amount + ' late'
	return (delay < 0 ? '-' : '+') + amount
}

module.exports = formatDelay

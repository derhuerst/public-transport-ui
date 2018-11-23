'use strict'

const {DateTime} = require('luxon')

const formatTime = (isoStr, timezone, locale) => {
	return DateTime
	.fromISO(isoStr, {zone: timezone, locale})
	.toLocaleString(DateTime.TIME_SIMPLE)
}

module.exports = formatTime

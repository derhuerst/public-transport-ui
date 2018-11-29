'use strict'

const {join} = require('path')
const {readFile, readFileSync} = require('fs')

const base = join(__dirname, '..')

const readCSS = (componentName, cb) => {
	const cssFile = join(base, componentName + '.css')
	readFile(cssFile, {encoding: 'utf8'}, cb)
}

const readCSSSync = (componentName) => {
	const cssFile = join(base, componentName + '.css')
	return readFileSync(cssFile, {encoding: 'utf8'})
}

module.exports = {readCSS, readCSSSync}

# public-transport-ui

**Web UI components for rendering public transport data**, e.g. departures.

They are heavily biased towards Germany and have a quite specific UI right now. Help me make this lib more general and useful by [opening an issue](https://github.com/derhuerst/public-transport-ui/issues)!

[![npm version](https://img.shields.io/npm/v/public-transport-ui.svg)](https://www.npmjs.com/package/public-transport-ui)
[![build status](https://api.travis-ci.org/derhuerst/public-transport-ui.svg?branch=master)](https://travis-ci.org/derhuerst/public-transport-ui)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/public-transport-ui.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install public-transport-ui
```


## Getting Started

You can use `public-transport-ui` with a number of [`React.createElement`](https://reactjs.org/docs/react-without-jsx.html)-/[JSX](http://facebook.github.io/jsx/)-compatible `h(tagName, props, children)` library. This makes it a lot more flexible, but also more complex. You will have to pass an `h()` function into `public-transport-ui`.

[React](https://reactjs.org/):

```js
const h = require('react').createElement
```

[`virtual-dom`](https://www.npmjs.com/package/virtual-dom):

```js
const h = require('virtual-dom')
```

[`h2ml`](https://www.npmjs.com/package/h2ml):

```js
const h2mlAdapter = require('public-transport-ui')
const h2ml = require('h2ml')
const h = h2mlAdapter(h2ml)
```

Using the appropriate `h()` function, let's now render a departure of a vehicle:

```js
const createRender = require('public-transport-ui')

const render = createRender({
	h, // see above
	timezone: 'Europe/Berlin',
	locale: 'de-DE'
})

const departure = render.departure({
	when: '2018-11-22T18:05:20+0100',
	delay: 5 * 60 + 20,
	line: {type: 'line', name: 'foo'},
	direction: 'bar'
})
```

### With JSX

[JSX](http://facebook.github.io/jsx/) is a syntax extension to write in [a more readable and compact way](https://reactjs.org/docs/jsx-in-depth.html), well-known because it is the preferred way to write [React](https://reactjs.org/) components. Technically, it is independent of React, so you can use it with [preact](https://preactjs.com), [hyperscript](https://github.com/hyperhype/hyperscript) or [mercury](http://raynos.github.io/mercury/) as well.

As an example, we're going to use React & JSX:

```jsx
/** @jsx h */
const h = require('react').createElement
const createRender = require('public-transport-ui')

const render = createRender({
	h,
	timezone: 'Europe/Berlin',
	locale: 'de-DE'
})

const MyComponent = (props) => {
	return (
		<section>
			{render.departure(someDeparture)}
		</section>
	);
}
```


## Usage

### CSS

**Make sure to serve the CSS of each component that you use**, e.g. by bundling them together. Let's say you use the components `public-transport-ui/time` and `public-transport-ui/arrival-or-departure` in your app:

```js
# create-css-bundle.js
const {readCSSSync} = require('public-transport-ui/build/read-css')

process.stdout.write([
	readCSSSync('time'),
	readCSSSync('arrival-or-departure')
].join('\n\n'))
```

```shell
node create-css-bundle.js >public-transport-ui.css
```


## Components

### `/time` – arrival/departure time

Accepts the [arrival/departure time markup of `hafas-client`](https://github.com/public-transport/hafas-client/blob/1ebb958b4a65128f2bf640e182d3c1333a6508fc/docs/departures.md#response).

```js
const createRenderDepartureTime = require('public-transport-ui/time')

const renderDepartureTime = createRenderDepartureTime({}, {h, timezone, locale})
const tree = renderDepartureTime({
	when: '2018-11-22T18:05:20+0100',
	delay: 5 * 60 + 20
})
```

```html
<span className="pt-time pt-time--realtime pt-time--delayed">
	<time datetime="2018-11-22T17:00:00.000Z">18:00</time>
	<span className="pt-time-delay" title="5 minutes late">+5m</span>
</span>
```

- `.pt-time` – class of the wrapping `<span>`
- `.pt-time--realtime` – if it has realtime data
- `.pt-time--onTime` – if it is exactly on time
- `.pt-time--delayed` – if it not on time
- `.pt-time--early` – if it is too early
- `.pt-time--cancelled` – if it has been cancelled
- `.pt-time-delay` – class of the delay `<span>`

### `/arrival` & `/departure`

Accept the [arrival/departure markup of `hafas-client`](https://github.com/public-transport/hafas-client/blob/1ebb958b4a65128f2bf640e182d3c1333a6508fc/docs/departures.md#response).

```js
const createRenderDeparture = require('public-transport-ui/departure')

const renderDeparture = createRenderDeparture({h, timezone, locale})
const tree = renderDeparture({
	when: '2018-11-22T18:05:20+0100',
	delay: 5 * 60 + 20,
	line: {type: 'line', name: 'foo'},
	direction: 'bar'
})
```

```html
<tr class="pt-departure">
	<td class="pt-departure-when">
		<!-- time component -->
	</td>
	<td class="pt-departure-line">
		<!-- line component -->
	</td>
	<td class="pt-departure-direction">
		<!-- direction component -->
	</td>
</tr>
```

- `.pt-arrival`/`.pt-departure` – class of the wrapping `<tr>`
- `.pt-arrival-when`/`.pt-departure-when` – class of the when `<td>`
- `.pt-arrival-line`/`.pt-departure-line` – class of the line `<td>`
- `.pt-arrival-direction`/`.pt-departure-direction` – class of the direction `<td>`


## Contributing

If you have a question or need support using `public-transport-ui`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/public-transport-ui/issues).

# rhythmicon-rhythm

> Analyze and compute rhythmic patterns

This Node package implements class [Rhythm] to store, analyze and manipulate rhythms. 

## Table of Contents

* [Background](#background)
* [Install](#install)
* [Usage](#usage)
{{#class name="Rhythm"}}
{{>member-index-grouped~}}
{{/class}}
* [Maintainers](#maintainers)
* [Contributing](#contributing)
* [License](#license)

## Background

Class [Rhythm](#Rhythm) implements a simplified model of musical rhythms. Every rhythm is an array of pulses, each being either a beat (value `1`) or a rest (value `0`). For instance the tresillo rhythm is Array `[1,0,0,1,0,0,1,0]`.

See [@tonaljs/rhythm-pattern](https://www.npmjs.com/package/@tonaljs/rhythm-pattern) for a similar (more limited) library.

## Install

This packages comes as single file without dependencies.

```bash
npm install rhythmicon-rhythm
```

## Usage

~~~js
import Rhythm from "rhythmicon-rhythm"

const r = new Rhytm("x--x--x-")

console.log(`Rhythm has ${r.beats()} in ${r.length} pulses) 
~~~


{{#class name="Rhythm"}}
{{>header~}}
{{>body}}
{{>separator~}}
{{>members}}
{{/class}}

## Maintainers

- [@nichtich](https://github.com/nichtich) (Jakob Voß)

## Contributing

Contributions are welcome! Best use [the rhythmicon issue tracker](https://github.com/nichtich/rhythmicon/issues) for questions, bug reports, and/or feature requests!

## License

MIT license

# rhythmicon-rhythm

[![NPM package name](https://img.shields.io/badge/npm-rhythmicon--rhythm-blue.svg)](https://www.npmjs.com/package/rhythmicon-rhythm)

> Analyze and compute rhythmic patterns

This Node package implements class [Rhythm](#rhythm) to store, analyze and manipulate rhythms. 

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Rhythm](#rhythm)
- [Rhythm](#Rhythm)
  - [Constructors](#constructors)
        - [new](#copy)
        - [copy()](#copy)
  - [Static methods](#static-methods)
        - [fromPattern(pattern)](#frompatternpattern)
        - [fromDurations(durations)](#fromdurationsdurations)
        - [euclidean(beats, pulses)](#euclideanbeatspulses)
  - [Accessor methods](#accesor-methods)
        * [beats()](#beats)
        * [beatPulses()](#beatPulses)
        * [first()](#first)
        * [empty()](#empty)
        * [durations()](#durations)
        * [divisor()](#divisor)
        * [repetitions()](#repetitions)
        * [compare(rhythm)](#comparerhythm)
        * [equivalent(rhythm)](#equivalentrhythm)
        * [equal(rhythm)](#equalrhythm)

  - [Modifying methods](#modifying-methods)
        * [.beat(...durations)](#beat)
        * [.rest(duration)](#rest)
        * [.replace(...rhythm)](#replace)

       
        * [.deflate(divisor)](#deflate)
        * [.inflate(n)](#inflate)
        * [.repeat()](#repeat)
        * [.cut()](#cut)
        
        * [.complement()](#complement)
        * [.rotations(beat)](#rotations) ⇒ <code>array</code>
        * [.core()](#core)
        * [.odd()](#odd)
        * [.shuffle()](#shuffle)
        * [.unshuffle()](#unshuffle)
        * [.isShuffle()](#isShuffle)
        * [.rotate(pulses)](#rotate)
        * [.rotateBeats(beats)](#rotateBeats)
        
        * [.normalize()](#normalize)

        * [.toString()](#toString)
        * [.toDurationString()](#toDurationString)
        * [.rotation(rhythm)](#rotation)
    - [Static methods](#static-methods)
        * [.isBeat(value)](#isBeat)
        * [.isDurationsString(str)](#isDurationsString)
        * [.parse(rhythm)](#parse) ⇒ <code>array</code>
* [Maintainers](#maintainers)
* [Contributing](#contributing)
* [License](#license)

## Background

Class [Rhythm](#Rhythm) implements a simplified model of musical rhythms. Every rhythm is an array of pulses, each being either a beat (value `1`) or a rest (value `0`). For instance the tresillo rhythm is array `[1,0,0,1,0,0,1,0]`. A rhythm can also be encoded as pattern string (`x--x--x-`) and as durations (array `[3,3,2]` or string `3+3+2`). Rhythms can further be:

- *repeated* and *cut* (e.g. `x-x-x-` can be cut to `x-`)
- *inflated* and *deflated* by a *divisor* (e.g. `x-x` and `x---x-` with divisor 2).
- *rotated* (e.g. `xx-` is rotated `-xx` and `x-x`)
- *shuffled* and *unshuffled* (e.g `x-xx--` is shuffle of `xxx-`)
- *normalized* to a core rhythm

### Related works

- [rhythmicon-vue](package/rhythmicon-vue#readme) is a JavaScript library of Vue components to display and interact with rhythmic patterns
- rhythmicon further contains a collection of rhythms and a web application to analyze and modify rhythmic patterns
- [tonal](https://www.npmjs.com/package/tonal) is a JavaScript library for tonal elements of music (note, intervals, chords, scales, modes, keys). The library also contains the limited class [@tonaljs/rhythm-pattern](https://www.npmjs.com/package/@tonaljs/rhythm-pattern) for rhythmic patterns.

## Install

This package comes as single file without dependencies.

```bash
npm install rhythmicon-rhythm
```

## Usage

~~~js
import Rhythm from "rhythmicon-rhythm"

const r = new Rhytm("x--x--x-")

console.log(`Rhythm has ${r.beats()} in ${r.length} pulses) 
~~~

## Rhythm

This is a subclass of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) so all of its properties and methods can be used. Please make sure the Array will contain only `0` and `1` elements when using low-level Array methods.

### Constructors

#### new

The constructor creates a new Rhythm object like `new Array`. If passed a single string or Array argument, this argument is used to build the rhythm from.

```js
new Rhyth("x--x--x-")
new Rhythm("|RL-RRL--|")
new Rhyth([1,0,0,1,0,0,1,0])
new Rhyth("A","_","_","+","_","_","B","_")

Rhythm(n) // empty rhythm of length n
```

#### copy

This instance method returns a deep copy of the Rhythm object.


### Static methods

#### fromPattern(pattern)

Generates a Rhythm from a pattern `string`.

#### fromDurations(durations)

Generates a rhythm from an `Array` or `string` of durations.

### euclidean(beats, pulses)

Generates an euclidean rhythm with `beats` number of beats in `pulses` number of pulses.

### isBeat(value)

Return whether a variable is read as beat. This is true for every true
value except for the characters space, tab, underscore, dot and minus.

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

### isDurationsString(str)

Return whether a string specifies durations with optional rotation.

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

### parse(rhythm) ⇒ <code>array</code>

Read a string, an array, or a list of values as rhythm.

| Param | Type |
| --- | --- |
| rhythm | <code>string</code> \| <code>array</code> | 


### Accessor methods

The following ("member const") methods don't modify instances.

#### beats()

Get the number of beats in this rhythm.

#### beatPulses()

Get an array of index numbers of beats in this rhythm.

#### first()

Get the position the the first beat, or `undefined` if the rhythm is empty.

~~~js
rhythm.first() === rhythm.beatPulses()[0]
~~~

#### empty()

Get whether the rhytm contains no beats.

#### toString()

Stringify the rhythm with "x" for beat and "-" for rest.

#### toDurationString(sep)

Stringify the durations of the beat, separated by `sep` (`+` by default) and
preceded by more of this character if the first pulse is not a beat.

#### durations()

Return an array of durations between beats, starting with the first beat.

#### divisor()

Get greatest common divisor of all durations.

Returns 1 if the rhythm cannot be deflated or if the first pulse is not a beat.
Returns the length of the rhytm for an empty rhythm.

#### repetitions()

Get number of repetitions.

#### compare(rhythm)

Compare two rhythms, first by length, then lexicographically by its durations.
The argument is parsed if it is no Rhythm object.

#### equals(rhythm)

Whether the rythm is equal to another rythm (same length, same pulses). The
argument is parsed if it is no Rhythm object.

#### equivalent(rhythm)

Check whether this rhythm is equivalent to another, possibly under rotation.
The argument is parsed if it is no Rhythm object.

#### rotation(rhythm)

Get the rotation number if this rhythm is equivalent to another, or undefined otherwise.

### Modifying methods

#### beat(...durations)

Add one or more beats with given duration(s) or one pulse if no parameter is given. 

#### rest(duration)

Add a rest with given `duration` in pulses.

#### replace(...rhythm)

Change the rhytm in-place. Takes same arguments as [the constructor](#new), except a single number is read is one pulse instead of a number of pulses.

#### deflate(divisor)

Deflate the rhythm if it has a divisor > 1.

| Param | Type | Default |
| --- | --- | --- |
| divisor | <code>number</code> | <code>this.divisor</code> | 

#### inflate(n)

Inflate the rhythm. Each pulse is replaced by n pulses.

| Param | Type | Default |
| --- | --- | --- |
| n | <code>number</code> | <code>2</code> | 

#### repeat(n)

Repeat the rhythm `n` times (default 2 to duplicate it).

#### cut(n)

Remove all repetitions. Optionally cut the rhythm partly by `n`, being a prime factor of repetitions.

#### complement()

Convert rhythm into its complement by swapping beats and rests.

#### rotations(beat)

Calculate all rotations.

**Returns**: <code>array</code> - of patterns

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| beat | <code>boolean</code> | <code>false</code> | only consider beat rotations |

#### core()

Check whether the rhythm is normalized to its core rhythm.

#### odd()

Check whether the rhythm is odd (cannot be split at beats into two parts of equal length).

#### shuffle()

...

#### unshuffle()

...

#### isShuffle()

...

#### rotate(pulses)

Rotate the rhythm one or more pulses to the right.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pulses | <code>number</code> | <code>1</code> | positive or negative number |

**Example**
```js
Rhythm.fromPattern("x--x-").rotate(1) // => [0,1,0,0,1]
```

#### rotateBeats(beats)

Rotate the rhythm one or more beats to the right.

If the first pulse is not a beat, the rhythm is first rotated to do so, so rotation by zero
beats will shift the first beat to the first pulse.


| Param | Type | Default |
| --- | --- | --- |
| beats | <code>number</code> | <code>1</code> | 

#### normalize()

Normalize to a core rhythm by rotating, deflation, and cutting repetitions.

## Maintainers

- [@nichtich](https://github.com/nichtich) (Jakob Voß)

## Contributing

Contributions are welcome! Best use [the rhythmicon issue tracker](https://github.com/nichtich/rhythmicon/issues) for questions, bug reports, and/or feature requests!

## License

MIT license

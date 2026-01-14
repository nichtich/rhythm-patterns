# rhythmicon

The [Rhythmicon](https://en.wikipedia.org/wiki/Rhythmicon) one of the very first, short-lived electronic instruments. **rhythmicon** is a web application, a programming library, and a collection of rhythmic patterns. A rhythmic pattern is a repeated sequence of pulses.

## Contents

- [rhythmicon-rhythm](packages/rhythmicon-rhythm) is a JavaScript library to analyze and compute rhythmic patterns
- [rhythmicon-vue](packages/rhythmicon-vue) is a JavaScript library of Vue components to display and interact with rhythmic patterns
- [rhythms](rhythms) is a directory of rhythms, each described with their pattern and other properties
- [rhythmicon-app](packages/rhythmicon-app) is a web application to browse and analyze the collection of rhythms and other rhythmic patterns

## Collection of Rhythms

Directory [rhythms](rhythms) contains one file for each rhythm in the collection.

Each file is named by the pattern of the rhythm and file extension `.md`, for instance [`x--x--x-.md`](rhythms/x--x--x-.md) for tresillo rhythm. The file can contain arbitrary text in Markdown syntax, optionally preceeded by a YAML header demarcated by three dashes (`---`) on either end. This can best be illustrated with an example:

~~~yaml
---
name: tresillo
wikidata: Q65089548
---

Propably the most common, non-trivial rhythm.
~~~

Rhythms can be described with this YAML fields:

- a `name`
- multiple `alias` names
- a corresponding `wikidata` Q-identifier
- a list of notable `works` (in Markdown syntax)
- a list of `category`
- a list of `source`

The textual description in Markdown syntax may reference other rhythms with this syntax: `` `|x-xx|` `` (pattern enclosed in `` `| `` ... `` |` ``).


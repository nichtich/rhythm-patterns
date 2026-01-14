# rhythmicon

> Web application and library to analyze rhythms

This repository contains

- a NodeJS programming library to manage and analyze rhythms
- a NodeJS programming library for Vue3 to visualize and manipulate rhythms
- an interactive collection (lexicon) of rhythms

## Rhythm programming library

Package [rhythmicon-rhythm](packages/rhythmicon-rhythm/) contains a NodeJS Class to store and process a rhythm.

## Rhythm vizualization library

See package [rhythmicon-vue](packages/rhythmicon-vue/).

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


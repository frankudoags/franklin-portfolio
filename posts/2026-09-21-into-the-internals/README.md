# Going Deep: React and React Native Internals

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React, React Native, Engineering

Description: I've shipped React and React Native for years. Now I want to understand them properly — and write down everything I learn about their internals.

I've been building with React and React Native for over five years. Banking apps, healthcare platforms, skincare apps with AI features, open-source contributions. I know the APIs well. I know which hooks to reach for, how to structure a codebase, how to squeeze performance out of a laggy list.

But lately I've been bothered by a gap: I use these tools every day, yet the machinery underneath them is mostly a blur. I want to fix that — and I want to write about it as I go.

## Why internals, why now

There comes a point where "it works" stops being enough. The bugs that survive into production are never in the parts you understand. They're in the reconciler's scheduling decisions. In a bridge queue you didn't know existed. In a re-render cascade that DevTools makes invisible.

Every time I've debugged one of those, the fix took ten minutes and the understanding took ten hours. Writing is how I plan to keep the understanding.

## What I want to cover

This is the roadmap I'm setting for myself — a series, not a single post:

## React: the reconciler and Fiber

How rendering really works. The Fiber tree, the work loop, lanes and priorities, why `useState` updates sometimes batch and sometimes don't, what concurrent rendering actually means for the code I write every day.

## React Native: from bridge to Fabric

The old architecture versus the new one. The bridge, serialized batches, and why lists used to drop frames. Then Fabric, the JSI, TurboModules, and synchronous layout reads — the stuff that makes the new architecture feel like a different framework.

## The JavaScript engine layer

Hermes versus JSC. Bytecode, garbage collection, and what "startup time" actually consists of on a real device. I've shipped apps where cold start was a KPI; I want to know exactly where those milliseconds go.

## Animation and gestures

Why Reanimated worklets run on the UI thread, what the thread model looks like, and how gesture handlers avoid the bridge entirely. I've built animated experiences for years. Time to learn what makes them tick.

## How I'll write them

A few rules for myself:

- **Code first.** Every post gets a small reproduction or experiment, not just diagrams.
- **No magic.** If I can't explain why something behaves the way it does, the post isn't done.
- **Honest about depth.** Some posts will be beginner-friendly. The internals ones won't pretend to be.

## If you're on the same path

If you've ever stared at a flame graph, a native crash log, or a mysterious extra render and thought "I should really understand this" — this series is for you too. I'll be learning in public, getting things wrong, and correcting them here.

First deep dive drops soon. See you in the reconciler.

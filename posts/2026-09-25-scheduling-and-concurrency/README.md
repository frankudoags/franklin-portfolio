# Scheduling and Concurrent React: Lanes, Transitions, Suspense

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React, Performance

Description: Part 4 of the internals series. How React prioritizes work with lanes, why the render phase is interruptible, and what useTransition actually buys you.

Series: React & React Native Internals
Part: 5

Old React rendered synchronously: state change in, DOM update out, everything in between blocking the main thread. A big list update could freeze typing for frames. Concurrent React fixed this by making rendering *interruptible* — and the mechanism is one of the most elegant parts of the whole system.

## The render phase can be paused

Recall from part 1: rendering has two phases. The commit phase (touching the DOM) is synchronous and atomic. But the render phase — calling your components, building the work-in-progress tree — can be split across frames, paused, abandoned, and restarted.

That split is what makes everything else possible. React can start rendering a heavy update, notice something more urgent arrived (a keystroke, a hover), pause the heavy work, handle the urgent work, then resume or restart.

## Lanes: priorities as bitmasks

Every update is assigned a **lane** — a priority encoded as a bit in a 31-bit mask. Synchronous urgent updates (discrete input) get high-priority lanes; data fetching and background refreshes get low ones. The Fiber root tracks pending lanes, and the work loop always picks the highest-priority lane with work.

You don't manage lanes directly. You hint at them:

```jsx
// Urgent: the input stays responsive
setQuery(e.target.value);

// Non-urgent: the heavy list can lag, pause, and resume
startTransition(() => {
  setQuery(e.target.value);
});
```

`startTransition` just marks the enclosed updates with a low-priority lane. React renders the urgent parts first and fills in the transition when the main thread is free. `useDeferredValue` is the same idea for a value rather than an update.

## Suspense is a scheduling primitive

Suspense looks like a loading-state API, but underneath it's the scheduler coordinating async work. When a component suspends (throws a promise), React can:

- show the nearest fallback *without* committing a half-loaded tree,
- keep showing the previous UI while the transition's data loads,
- and avoid the classic waterfall of nested spinners by revealing coordinated boundaries together.

 Paired with transitions, this is how you get interfaces that never flash loading states on fast networks but degrade gracefully on slow ones.

## What this means in practice

- Wrap expensive, non-urgent updates in `startTransition` — search inputs, tab switches, filters over big datasets.
- Treat Suspense boundaries as *loading choreography*, placed where they'd make sense to a user waiting, not where the data fetching happens to live.
- The "concurrent" in concurrent React is about *interruptible rendering*, not threads. Your components still run on one thread — React just got very good at slicing the work.

Part 5 stays practical: re-renders. Which ones are wasteful, how to find them, and the exact tools that kill them.

# Re-renders and Performance: Finding Waste, Killing It

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React, Performance

Description: Part 5 of the internals series. Which re-renders are actually wasteful, how to find them with the profiler, and the precise tools that fix them.

Series: React & React Native Internals
Part: 6

"Prevent re-renders" is the most misapplied advice in React. Most re-renders are harmless — calling a function and diffing small trees is fast. The ones that hurt are specific: large subtrees re-created on every keystroke, expensive computations re-run per render, and commits that touch the DOM in hot paths. Here's how to tell the difference and fix each.

## Measure first, memoize never (at first)

Open the React DevTools Profiler, enable "record why each component rendered," and interact. You'll see one of three patterns:

1. **A component renders with identical props** — a parent re-rendered and dragged it along.
2. **Props changed, but meaninglessly** — a new object/array/function identity every render.
3. **Props changed, legitimately** — actual new data. This one is *correct*; don't "fix" it.

Only (1) and (2) are waste. And (2) is the interesting one, because the fix is at the *creation site*, not the component.

## The identity problem

```jsx
// New object every render → child re-renders even though
// nothing meaningful changed
<Chart config={{ type: 'line', color }} />

// Fix: stabilize the identity
const config = useMemo(() => ({ type: 'line', color }), [color]);
```

Same story for callbacks passed to memoized children: `useCallback` exists to keep the *reference* stable, not to make anything faster directly. And `React.memo` is a props-comparison gate — useless if the props are new identities every time, actively harmful (comparison cost + complexity) if the component is already cheap.

## Batching and flushSync

In modern React, updates inside event handlers, timeouts, and promises all batch automatically — multiple sets become one render. The escape hatch is `flushSync`, which forces synchronous commit. Reach for it only when you must read the DOM *immediately* after a state change (measuring layout), because it opts out of every scheduling benefit from part 4.

## My actual checklist

1. Profile and find the hot path — usually one list, one input, one chart.
2. Stabilize identities at the source (`useMemo`/`useCallback`, hoisted constants).
3. Gate the expensive subtree with `memo` *after* identities are stable.
4. Move state down: if only a leaf needs it, don't store it at the root.
5. For genuinely heavy computation, defer it (`startTransition`) or move it off-thread.

Memoization without measurement is superstition. With measurement, it's surgery.

Part 6 crosses platforms: React Native's old architecture, why the bridge had to go, and what replaced it.

# Reconciliation and Keys: How React Diffs Two Trees

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React, Internals

Description: Part 3 of the internals series. The O(n) diffing heuristics, element-type matching, and why keys are the most misunderstood prop in React.

Series: React & React Native Internals
Part: 4

Diffing two arbitrary trees is an O(n³) problem. React does it in roughly O(n) — not by being cleverer, but by making two pragmatic bets. Understanding those bets explains almost every "React did something weird" story you've heard.

## Bet 1: different types mean different trees

When React compares an old Fiber with a new element, it first checks `type`. If the type changed — `div` to `span`, `Button` to `Link` — React tears down the entire subtree and rebuilds from scratch, including DOM nodes and state.

```jsx
// Toggling this unmounts EVERYTHING inside and remounts fresh.
// State is lost. Effects re-run. Inputs clear.
{isEditing ? <Editor /> : <Preview />}
```

That's usually what you want. But when it isn't — when you need state preserved across a type change — you now know the lever: keep the type stable and vary props instead.

If the type is the *same*, React keeps the DOM node (and the state) and just updates changed props. Cheap.

## Bet 2: lists need keys, and keys must be stable

For children, React matches old and new by position by default. That works until items reorder, insert, or delete — then positional matching pairs the wrong fibers, and you get the classics: input text jumping rows, checkbox state teleporting, animations glitching.

Keys override positional matching. React builds a map of old children by key and pairs each new child with its key-mate, moving DOM nodes instead of recreating them.

```jsx
// Stable ids: React moves rows. Correct.
// Array index as key: inserting at the top re-pairs
// every row with the wrong state. Broken.
{todos.map(t => <Row key={t.id} todo={t} />)}
```

The rule people quote — "keys must be unique and stable" — falls straight out of the implementation. The key is a lookup id into the previous render's children. An index *is* stable only if the order never changes.

## When the diff gets it wrong

The heuristics fail in exactly the cases you'd predict:

- Same position, same type, totally different *meaning* (e.g., two different users' profile panels keyed by index) — React reuses state it shouldn't.
- Keys that change every render (`key={Math.random()}`) — React can never match, so it remounts everything, every time. This is also a legitimate *technique* when you WANT a forced remount.

## The takeaway

Reconciliation isn't magic matching — it's type comparison plus key lookup. Hold those two ideas and you can predict the diff's behavior on any tree, which means you stop fighting re-mounts and start using them deliberately.

Part 4 goes deeper into *when* rendering happens: scheduling, lanes, and concurrent React.

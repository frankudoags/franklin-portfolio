# How React Actually Renders: JSX, Elements, and Fiber

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React, Internals

Description: Part 1 of the internals series. What happens between writing JSX and pixels on screen — elements, components, and the Fiber tree.

Series: React & React Native Internals
Part: 2

Every React developer writes JSX daily. Few can answer a simple question: after you write `<Button title="hi" />`, what actually exists in memory? This post traces the full path from JSX to pixels. It's part 1 of my internals series, so we start at the very beginning.

## JSX is just function calls

JSX never reaches the browser. The compiler turns it into plain calls:

```jsx
// What you write
<Button title="hi" />

// What actually runs
jsx(Button, { title: "hi" })
```

The result is a **React element** — a small, immutable, plain object describing what you want:

```js
{
  type: Button,
  props: { title: "hi" },
  key: null,
  // ...a few internal fields
}
```

That distinction matters: elements are cheap descriptions, not instances. React can create and throw away thousands per render without blinking. Your component function is just the thing that *produces* elements.

## Elements vs components vs instances

Three words people mix up:

- **Element**: the immutable description (`{ type, props }`).
- **Component**: the function or class that returns elements.
- **Instance**: the stateful thing React keeps around between renders — in modern React, that's a **Fiber node**, one per mounted element.

When state changes, your component re-runs and returns a *new* element tree. React then compares it against the previous one. That comparison is reconciliation, and the data structure it operates on is the Fiber tree.

## The Fiber tree

Every mounted element gets a Fiber node holding:

- the element's `type` and `props`
- pointers to its parent, child, and sibling fibers
- the **alternate** — last committed version of itself
- hook state, effects, and scheduling metadata

Rendering happens in two phases. The **render phase** walks the tree, calls your components, and builds up the changes (it's interruptible — React can pause and resume this work). The **commit phase** applies those changes to the DOM all at once (it's synchronous — the user never sees a half-updated screen).

## Why this mental model pays off

Once you see rendering as "functions produce descriptions, React diffs descriptions, then commits the difference," several mysteries dissolve:

- Re-rendering a component is cheap — it's just calling a function.
- The expensive part is committing DOM changes, which is why React batches and defers.
- Keys, memo, and effects all exist to make the diff smarter or to hook into the commit.

Next up in part 2: hooks. `useState` looks like magic until you see the linked list underneath — then the Rules of Hooks stop being rules and start being obvious.

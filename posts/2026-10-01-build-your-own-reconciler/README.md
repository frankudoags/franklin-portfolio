# Build Your Own Reconciler: The Series Finale

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React, Internals

Description: Part 10, the finale. We build a miniature Fiber reconciler from scratch — elements, fibers, hooks, and commits — and watch nine parts of theory click into place.

Series: React & React Native Internals
Part: 11

Reading about internals is useful. Building a toy version is transformative — every simplification teaches you what the real thing needs and why. This finale builds a working (tiny, incomplete, honest) React clone: elements, fiber reconciliation with alternates, `useState`, and DOM commits. About a hundred lines. Let's go.

## Elements: plain objects

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: { ...props, children: children.flat() },
  };
}
```

That's part 1. An element describes; it does nothing.

## Fibers: instances with memory

```js
let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;

function render(element, container) {
  wipRoot = {
    dom: container,
    props: { children: [element] },
    alternate: currentRoot,
  };
  nextUnitOfWork = wipRoot;
}
```

`alternate` is the previous committed tree — the diff target from part 3. The work loop processes one fiber at a time and yields when the browser is idle (a cooperative version of part 4's scheduling):

```js
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) commitRoot();
  requestIdleCallback(workLoop);
}
```

## Reconciliation: same type updates, different type replaces

```js
function reconcileChildren(fiber, elements) {
  let oldFiber = fiber.alternate?.child;
  // match by index (part 3's positional matching — no keys in our toy),
  // reuse the DOM node when types match, else create fresh
}
```

Real React adds keys, lanes, deletions tracking, and effect lists. Our toy skips them — and *feeling* their absence (try reordering a list!) teaches more than reading about them.

## Hooks: the index trick

```js
let hookIndex = 0;
function useState(initial) {
  const fiber = wipFiber;
  const oldHook = fiber.alternate?.hooks?.[hookIndex];
  const hook = { state: oldHook ? oldHook.state : initial, queue: [] };
  // replay queued actions (part 2), then store
  fiber.hooks.push(hook);
  hookIndex++;
  const setState = (action) => {
    hook.queue.push(action);
    // schedule a new render from the root
    wipRoot = { /* ...fresh root with currentRoot as alternate */ };
    nextUnitOfWork = wipRoot;
  };
  return [hook.state, setState];
}
```

There it is — part 2's linked list, reduced to an array index. Same rule falls out: call hooks in the same order or the indices misalign.

## What the toy leaves out (and why that matters)

No keys, no lanes, no effects, no deletions cleanup, no error boundaries, no concurrent features. Each omission maps to a real subsystem you now understand *the need for* — which was the point of parts 1–9 all along.

## Closing the series

We started with "what is JSX, really?" and ended with a working renderer. The throughline: React is a scheduler plus a differ plus a committer, and every API — hooks, keys, transitions, Suspense — is a handle on one of those three machines.

Thanks for reading along. The deep dives don't stop here — this series was the foundation, not the ceiling.

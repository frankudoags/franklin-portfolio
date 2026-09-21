# Hooks Under the Hood: State, Effects, and Why the Rules Exist

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React, Internals

Description: Part 2 of the internals series. useState and useEffect look like magic until you see the linked list — then the Rules of Hooks become obvious.

Series: React & React Native Internals
Part: 3

`useState` feels like it breaks the rules of JavaScript. A function runs, returns state, and somehow remembers it next time — with no instance, no `this`, nothing visible holding on. Here's the trick: something *is* holding on. It's just not in your code.

## Hooks live on the Fiber, in a linked list

Each Fiber node has a `memoizedState` pointer to the first hook of that component. Every hook is a small object with a `memoizedState` (its value) and a `next` pointer to the following hook.

When your component renders, React walks this list in order. The **first** `useState` call gets the first hook object. The second call gets the second. That's it — that's the entire mechanism, and it's why the Rules of Hooks exist:

```jsx
// Fine: same order every render
const [name, setName] = useState('');
const [age, setAge] = useState(0);

// Broken: a conditional changes the order,
// so the second render reads the wrong hook objects
if (user) {
  const [extra, setExtra] = useState(null);
}
```

No compiler magic, no tracking by variable name. Just call order. Once you internalize that, "don't call hooks conditionally" stops being a rule you memorize and becomes something you couldn't violate if you tried.

## What useState actually does

Calling the setter doesn't mutate anything. It schedules a re-render of that Fiber and queues the update. During the next render, React replays queued updates to compute the new state. That's why rapid successive sets can batch, and why the functional form exists:

```jsx
// Queued and replayed — both apply
setCount(c => c + 1);
setCount(c => c + 1);
```

## useEffect is a commit-phase subscription

Effects don't run during render. React collects them while building the Fiber tree, then flushes them after the DOM commit — in order, per component. Cleanup runs before the next effect and on unmount. The dependency array is just a shallow comparison against the previous render's values to decide whether to re-run.

That explains the two classic pitfalls:

- **Missing dependencies** mean the effect closure captures stale values from an old render.
- **No array at all** means the effect re-subscribes after *every* commit.

## useRef: the escape hatch

A ref is a hook object whose `memoizedState` is `{ current: ... }` — a stable box React never touches. Mutating it doesn't schedule renders, which is exactly why it's perfect for timers, DOM handles, and previous-value tracking.

Next in part 3: reconciliation. How React diffs two trees in linear time, why keys matter, and the exact cases where the diff gets it wrong.

# The UI Thread: Worklets, Shared Values, and Gestures

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React Native, Performance

Description: Part 9 of the internals series. Why Reanimated worklets run on the UI thread, how shared values skip the bridge, and what makes gestures feel instant.

Series: React & React Native Internals
Part: 10

Every "buttery" animation you've felt in an app and every janky one share the same root cause: *which thread ran the animation frame*. This post is about the thread that draws, and the library that finally let JavaScript live on it.

## Two threads, one frame budget

A 60fps animation must produce a frame every 16ms. In old-architecture React Native, animated values lived in JS: each frame, JS computed the next value, serialized it across the bridge, and native applied it. If the JS thread was busy reconciling (part 4's scheduling, but on one thread — part 6's bottleneck 3), frames queued behind your render work and the animation stuttered.

The fix isn't faster JS. It's *not needing JS at all* during the animation.

## Worklets: JS that runs natively

Reanimated compiles specially-marked functions — **worklets** — so they can execute on the UI thread:

```js
const offset = useSharedValue(0);

const gesture = Gesture.Pan()
  .onUpdate((e) => {
    'worklet';
    offset.value = e.translationX; // runs on the UI thread. No bridge. No JS thread.
  });

const style = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));
```

A **shared value** is memory both runtimes can read — conceptually a JSI reference (part 7) with a subscription model. Writing `.value` on the UI thread updates the natively-attached view directly. Reading it in `useAnimatedStyle` re-runs that style function on the UI thread too.

The `'worklet'` directive is doing real compiler work: the function gets extracted, its closure variables captured, and the whole thing shipped to the UI runtime. That's why worklets have rules (no arbitrary JS globals, everything referenced must be serializable or shared) — they're literally running in a different JavaScript VM context.

## Gestures without the round trip

The gesture-handler library pairs with this model: touch tracking, state machines (began/active/ended), and competing-gesture arbitration all run natively. By the time your worklet sees `onUpdate`, the hard real-time work is done. Contrast with the old responder system, where every touch event crossed the bridge to JS and back before anything moved.

## The rule of thumb

If it moves every frame, it belongs on the UI thread: shared values in, animated styles out, worklets for logic. If it happens discretely (taps that trigger state changes, navigation), the JS thread is fine. Most janky animations I've debugged were discrete-thread logic doing per-frame work — the fix is always moving the per-frame part across the boundary.

Part 10, the finale: we build the thing. A tiny Fiber reconciler from scratch, and everything from parts 1–9 clicking into place.

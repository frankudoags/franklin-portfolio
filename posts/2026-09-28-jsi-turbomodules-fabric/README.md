# JSI, TurboModules, and Fabric: The New React Native

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React Native, Internals

Description: Part 7 of the internals series. Shared memory via JSI, lazily-loaded TurboModules, and the Fabric renderer — how the new architecture kills all three bridge bottlenecks.

Series: React & React Native Internals
Part: 8

Part 6 ended with a verdict: the bridge's bottlenecks were structural. The new architecture replaces the bridge's three foundations — async messaging, serialization, and eager native modules — with three new primitives. This is the post I've most wanted to write.

## JSI: shared memory between JS and native

The JavaScript Interface lets native code hold direct references to JavaScript objects and vice versa — no serialization, no queue. A native module can call a JS function synchronously. A JS value can wrap a C++ object.

This single change dissolves bottleneck 1 and 2 from part 6. Layout reads become synchronous function calls instead of multi-frame round trips. Data crosses the boundary by reference instead of by JSON string.

## TurboModules: native code on demand

Under the old system every native module registered at startup, whether you used it or not. TurboModules are lazily initialized through JSI — the module's JS spec generates strongly-typed bindings, and native code loads the first time you touch it.

The practical wins: faster startup (you stop paying for modules you never call) and type safety across the boundary (the codegen'd spec means JS and native can't disagree about signatures — a whole class of red-screen crashes disappears).

```js
// Old: NativeModules.Camera rolls a dice on startup cost
// and signature mismatches crash at runtime.
// New: TurboModule spec generates the binding;
// the module initializes on first use, typed end to end.
```

## Fabric: a concurrent renderer for native views

Fabric reimplements React's renderer against native views with two decisive upgrades:

1. **A C++ shadow tree shared via JSI.** Layout (Yoga) runs against data both sides can read synchronously. Measure-then-layout collapses from multiple bridge round trips to direct reads.
2. **Concurrency.** The renderer adopts React 18's concurrent features, so urgent updates (touches, typing) preempt background rendering — the same lane model from part 4, now ending in pixels instead of DOM.

## What changes for you, concretely

- Lists stop dropping frames on scroll, because layout reads no longer cross an async boundary.
- Startup gets faster, because native modules load lazily.
- Some old hacks break: anything that depended on bridge timing (double-`requestAnimationFrame` measurement dances, `findNodeHandle` patterns) needs rethinking against synchronous layout.
- Debugging changes shape: Systrace-style thinking (threads and queues) gives way to thinking about *which thread runs your code* — which is exactly what part 9 covers.

The throughline of this whole series: every abstraction leak I've debugged in React Native traces back to a thread boundary. The new architecture doesn't remove thread boundaries — it gives you synchronous windows across them. Knowing which is which is the whole game.

Part 8 goes one layer deeper: the engine itself. Hermes, bytecode, and where your startup milliseconds actually go.

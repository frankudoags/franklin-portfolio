# React Native: The Old Architecture and Why the Bridge Had to Go

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React Native, Internals

Description: Part 6 of the internals series. How the legacy bridge worked, the three bottlenecks that killed it, and the ideas behind its replacement.

Series: React & React Native Internals
Part: 7

React Native's original design was audacious: run React's reconciler in JavaScript, but commit to *native* views instead of the DOM. It worked — and shipped thousands of apps, including ones I built. But three structural bottlenecks meant it could never feel truly native. This post is about the old world; part 7 covers the new one.

## The bridge

JavaScript and native code run on separate threads and can't share memory, so they communicate by passing serialized JSON messages across an asynchronous queue — the **bridge**. JS says "create view 42, a text node with these props"; native acknowledges; layout and pixels happen natively.

Three threads do the work:

- **JS thread**: runs your code and the reconciler.
- **Shadow thread**: computes layout (Yoga) from the shadow tree.
- **Main/UI thread**: owns the actual native views.

Every frame of interaction crosses these boundaries. And that's where the bottlenecks live.

## Bottleneck 1: async everything

Bridge traffic is batched and asynchronous. If JS needs to *read* layout — "how tall is this list item?" — it sends a message and waits a round trip. Measure-then-layout patterns (onLayout → setState → re-layout) take multiple bridge crossings per frame. At 60fps you have 16ms; a few round trips and you've dropped frames.

## Bottleneck 2: serialization cost

Every prop, event, and layout value gets JSON-serialized, queued, and deserialized. Large lists, rapid gestures, and chatty native modules all pay this tax continuously. Native modules couldn't be lazy either — everything registered at startup, slowing launch.

## Bottleneck 3: the JS thread is single

All JS — your code, reconciliation, gesture callbacks, timers — shares one thread. A heavy re-render doesn't just slow UI updates; it delays touch handling too, because the touch event's JS callback queues behind your render work. This is the deep reason old-architecture apps felt "sticky" under load rather than merely slow.

## Why not just fix the bridge?

Because all three bottlenecks *are* the bridge: async by design, serialized by design, single-threaded by design. The fix required new primitives — shared memory between JS and native, synchronous layout reads, and lazily-loaded native code. That's exactly what the new architecture is: JSI, TurboModules, and Fabric.

Part 7 goes there — the most exciting internals in the whole series.

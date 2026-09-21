# Hermes and Startup: Where Your Milliseconds Go

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React Native, Performance

Description: Part 8 of the internals series. Bytecode vs JIT, garbage collection, and a field guide to measuring (then cutting) mobile startup time.

Series: React & React Native Internals
Part: 9

Users decide whether your app feels fast in the first two seconds — before your code has done anything interesting. Startup is almost entirely engine and initialization work, which makes it the highest-leverage performance topic on mobile. Here's the machinery.

## Hermes: built for phones, not servers

V8 and JavaScriptCore are JIT compilers: they parse source, optimize hot paths at runtime, and use lots of memory doing it. Great on a laptop; wasteful on a phone your app shares with thirty background processes.

Hermes takes the opposite trade. Your JavaScript is **precompiled to bytecode at build time**. On device there's no parsing, no JIT warm-up — the engine starts executing almost immediately, with a fraction of the memory footprint. The cost: peak throughput on compute-heavy JS is lower than a warmed-up JIT. For UI work, that's a trade you win every time.

## Garbage collection without the jank

Hermes uses a generational collector tuned for latency over throughput: short, frequent young-generation collections instead of rare stop-the-world pauses. The practical consequence is fewer mysterious frame drops attributable to GC — but it also means allocation patterns matter. Churny code (new objects per frame in an animation loop) still shows up in profiles; it just shows up as death by a thousand cuts instead of single dramatic pauses.

## Anatomy of a cold start

Roughly, in order:

1. **Process + runtime init** — OS loads the app, Hermes initializes. Mostly fixed cost.
2. **Bytecode load + native module init** — Hermes maps the bundle; TurboModules (part 7) initialize lazily, so you only pay for what the first screen touches.
3. **JS execution to first render** — your imports run, the root component renders, Fabric commits the first frame.
4. **Hydration to interactive** — effects fire, data loads, the app becomes responsive.

Each stage has its own tooling (Xcode Instruments / Android Profiler for 1–2, Hermes sampling profiler and `__DEV__` performance overlays for 3–4) and its own fixes: fewer launch-blocking native modules, deferred imports, lighter root render, data prefetching during splash.

## The mindset

Startup optimization is accounting, not heroics. List every millisecond bucket, attack the biggest, re-measure. I've seen teams rewrite navigation to save 200ms while a single synchronously-initialized SDK ate 900ms unnoticed. The profiler is the whole methodology.

Part 9: the thread that actually draws — UI-thread animation, worklets, and gestures.

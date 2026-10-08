# React Native: The Good, The Bad, The Ugly

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: React Native, Performance

Description: Shopify took Shop native in 12 weeks with AI and the FUD is high. So let's skip the takes and open the hood: how React Native actually works, the taxes you pay for it, and where native genuinely wins.

Shopify just took Shop from React Native to native in 12 weeks with AI. Coinbase is on the same path. FUD is high. So let's skip the takes and open the hood: how RN actually works — JS → Hermes bytecode → JSI / Fabric / Yoga → real native views — and the real taxes you pay when you choose React Native.

"Who still uses React?" "We're moving the ABC app to Swift and Kotlin due to XYZ reasons."

This writeup isn't "RN is slow" vs "RN rules." It's the owner's manual I wish every rewrite thread linked: how RN actually works, what it costs, and where native genuinely wins. The good, the taxes, and the ugly when you ignore them.

## Why React Native is still a good choice

Allow me to take you down a small technical excursion explaining why everyone loves React Native (except Flutter fanboys).

Everyone loves (or loves to hate) JavaScript, but React Native never draws a single pixel in JavaScript. Your JS is just the art director shouting cues: give me a `<FlatList />`, render an `<Image />` over there, make sure that view over there has `opacity: 0.5`.

Here's the trip those cues take:

At build time, all your fancy JS code and dependencies from `node_modules` get pre-compiled to Hermes bytecode. Hermes is the fast JS engine (designed specifically for RN) living in your APK/IPA. It boots fast and runs that bytecode to figure out *what* should be on screen.

Then the New Architecture turns intent into native. Four parts, plain English:

- **JSI** is the direct phone line. Old RN passed JSON notes over a crowded bridge. In the New Architecture, JSI lets JS hold a real reference to a native object and call it directly. Zero roundtrip.
- **Fabric** is the builder. It takes your React tree and creates / updates real native views (this is why everyone says React Native is native, by the way).
- **Yoga** is the measurer. You write `flex: 1, gap: 8`, Yoga turns it into exact x/y/width/height pixels for each screen size.
- **Native Modules** are the specialists. With Turbo / Nitro / Expo modules, all native capabilities like camera (special shoutout to VisionCamera), storage (MMKV strikes again), sensors, plus your own C++/Swift/Kotlin code — exposed as lazily-loaded native functions JS can call like any `await getBattery()`.

So enough with all the "native" tears. You can write native code in React Native easily.

## The taxes you pay

Now, all of this is not free, sadly. You pay an overhead tax for that handoff:

- **Translation at the border.** Even with JSI's direct line, every time JS talks to native a value has to be converted — string to string, object to map, array to list. One call is free. 400 calls per scroll, or a 3MB list passed as props, is not.
- **Two trees to keep in sync.** React keeps a lightweight copy (the shadow tree) to diff *what changed*, then Fabric commits it to real views. Diff + layout with Yoga is fast, but it's still work on top of just drawing.
- **Thread hopping.** JS runs on its own thread, layout can run on background, drawing on UI. Hopping between them is async by design so taps stay smooth — but chatty patterns like `onScroll -> setState -> re-render` turn that hop into a traffic jam.
- **Single-threaded JS + GC.** Hermes is quick, but it's still one JS thread with garbage collection. Pure number-crunching — giant `filter`/`sort`/`JSON.parse` on tap — will always lose to native. Do it on tap and the tap stutters.
- **Mounts are expensive, memory is x3.** The same button lives three times: JS object + shadow node + real native view. 50 buttons, who cares. 5,000 rows with wrong keys and no recycling means a constant mount/unmount storm + OOM.
- **Chatty native calls + firehose events.** TurboModules are lazy and fast, but each call is still async. `await` in a loop, `onScroll`/`onLocation` at 120Hz piped into JS state, full-size image decodes — death by a thousand pings.

## And what you get for that tax — the goodies

- One team, one logic base for the boring 90%: auth, forms, feeds, settings, deep links, analytics. Ship twice as fast without hiring two native teams.
- Instant iteration: Metro, Fast Refresh, OTA updates for JS. No 30-minute App Store wait to fix a typo.
- Full escape hatch: literally everything platform-specific can stay native. Hot camera path? Janky shader? Background sync? Write it as a Native Module / TurboModule / worklet and call it from JS like any function. You don't rewrite the app, you port the 5% that's actually hot.
- Talent + ecosystem cheat code: every React/TS dev is already hireable, npm actually exists, Expo + EAS handles builds and updates, and community heavy-hitters (Reanimated, Gesture Handler, Skia, LegendList, VisionCamera, MMKV) already solved the hard native bits for you.
- Share beyond phones: same TS types, validation (zod), API layer (tRPC/REST) and half your UI logic with web via React / React Native Web / Expo Router. A native rewrite gives you… two more repos to keep in sync.
- The New Architecture is actually fast: Hermes startup, concurrent React, 120Hz with Reanimated worklets on the UI thread, Nitro modules for zero-nonsense native calls. The "RN can't do 60fps" take is from 2019.
- Shipping economics: feature flags + staged OTA for JS, Maestro/Detox/Jest for tests, one PR ships to both stores. That's why teams with 300 screens stayed — velocity compounds.

## And the ugly when you ignore them

Ignore those taxes and you get the exact screenshots that fuel rewrite threads:

- Scroll that was 60fps with 10 rows turns into slides with 1,000. Same code, just no keys, no windowing, new closures every row.
- App that felt snappy on launch gets slower the longer you use it (stale listeners, timers, subscriptions never cleaned up).
- Tap that should be instant lags a second (giant filter/parse on the JS thread, plus a firehose of events across the border, JS thread thrashing).

None of that is "JavaScript slow." It's the taxes above, all due at once. Pay them as you go and RN feels native. Defer them and you get the ugly, sluggish apps everyone complains about.

That's the deal: RN is native views with a JS brain and a tough C++ skeleton. When it's slow, it's almost never the tax. It's how you drive it.

Up next: *The Four Horsemen of Bad React Native Code*. You now know how the machine works. Good. Because something is already riding toward your app. Twelve hoofbeats in the profiler. Stay tuned.

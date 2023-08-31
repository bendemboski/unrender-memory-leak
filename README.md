# memory-leak

This repo demonstrates a memory leak where after rendering and un-rendering a component that invokes a local helper, the helper will be retained in memory until the app exits.

## App layout

The app implements a component called `Thing` that invokes a local helper, and also stores a `WeakRef` referencing that local helper in `window.localHelperRef`.

After rendering and un-rendering `Thing`, `window.localHelperRef.deref()` can be used to demonstrate that the local helper leaked.

## Test repro

The app contains a single unit test that renders the component, then un-renders it, then checks the `WeakRef`.

## Manual repro

To reproduce it manually and rule out any test instrumentation/timing issues as the cause of this, the dummy app is set up with a button that toggles the rendering of `Thing`. To reproduce the issue:

1. `ember serve`
2. Visit `http://localhost:4200`
3. Click the `toggle` button twice (once to render the component, then once to un-render it)
4. Open the devtool and go to `Memory` tab
5. Click the garbage collection button
6. Type `window.localHelperRef.deref()` in the console

You will see that the helper arrow function is still retained in memory. You can also replace step (6) with taking a heap snapshot and searching for `Thing` in the class filter to see that the component instance leaked as well (because the helper arrow function closes over it).

# memory-leak

This repo demonstrates a memory leak where components meeting a couple of bizarrely specific conditions will leak after being un-rendered. Those conditions are:

1. The component invokes a local helper function from its template
2. The component registers a destructor that references `this`

## App layout

The app implements three components that are very similar:

* `Thing1` invokes a local helper and registers a destructor that references `this`
* `Thing2` invokes a local helper and registers a destructor that does _not_ reference `this`
* `Thing3` does _not_ invoke a local helper, but does register a destructor that references `this`

The app can be used to demonstrate that only `Thing1` leaks when un-rendered, i.e. both conditions listed above are necessary to cause the leak, but neither on its own is sufficient.

## Test repro

The app contains a single unit test that renders all three components, then un-renders them, then uses some instrumentation involving `WeakRef`s to demonstrate that `Thing1` leaked, but `Thing2` and `Thing3` did not.

## Manual repro

To reproduce it manually and rule out any test instrumentation/timing issues as the cause of this, the dummy app is set up with a button that toggles the rendering of `Thing1`, `Thing2`, and `Thing3`. To reproduce the issue:

1. `ember serve`
2. Visit `http://localhost:4200`
3. Click the `toggle` button twice (once to render the components, then once to un-render them)
4. Open the devtool and go to the `Memory` tab
5. Click the garbage collection button, then take a heap snapshot
6. Type `thing` in to the `Class filter` field

You will see that an instance of `Thing1` is still present, but `Thing2` and `Thing3` are not.

## Additional notes

It is notable that if you run `ember test -s` and then when the test complete you take a heap snapshot (according to steps 4-6 above), `Thing1` will not be present. I believe this indicates that the component is freed up and garbage collected when the Ember app stops running, but is pinned in memory as long as the app is running.

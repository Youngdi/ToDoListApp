# Why MobX-State-Tree?

### Some Highlights of MST

MST is...

- Intuitive
  - With concepts like `props` and `actions`, it feels familiar for React developers
  - Updating your data means calling functions on objects, rather than dispatching actions.
  - Feels similar to relational databases, with concepts like `identifiers` (primary keys), `references` (foreign keys), and `views` (calculated fields)
- Streamlined
  - No more `actionTypes`, `actionCreators`, or `reducers`
  - You don't have to declare your usage intentions with `mapStateToProps`; they are inferred
  - Side-effects are built-in; no need for 3rd party libraries like `redux-saga`, `redux-observable`, or `redux-thunk`
  - Immutability is built-in - no need for `immutable.js` or `seamless-immutable`
  - `types.compose` and `model.extend` allow for easy code-sharing of common patterns
- More than state management
  - Lifecycle hooks like `afterCreate`, `preProcessSnapshot`, and `beforeDestroy` let you have control over your data at various points in its lifecycle
  - Dependency injection with `getEnv` allows you to reference your environment (like API or other services)
- Performant
  - Round-trip store writes are much faster
  - Computed values (views) are only calculated when needed
  - `mobx-react-lite` makes React "MobX-aware" and only re-renders when absolutely necessary
- Customizable
  - MST ships with pre-built middlewares, including one which allows for [Redux interoperability](https://github.com/mobxjs/mobx-state-tree/blob/master/packages/mst-middlewares/README.md#redux). These middlewares can also serve as examples to create your own!

### Downsides

We also recognize no state management solution is perfect. MST has some known downfalls:

- Integration with TypeScript is clunky at times. MST's own typing system is sometimes at odds with what TypeScript wants
- `mobx` and `mobx-state-tree` both seem to have "magic" or "sorcery" that makes issues less straightforward to debug because you don't always have a clear picture of what's happening (but using [Reactotron](https://github.com/infinitered/reactotron), which has `mobx-state-tree` support built-in, helps a lot). The [MobX docs](https://mobx.js.org/) can also help illuminate some of the magic.
- The user base is small, so finding help on GitHub or Stack overflow is less convenient (however, the [Infinite Red Slack Community](http://community.infinite.red), as well as the [MobX State Tree GitHub Discussions group](https://github.com/mobxjs/mobx-state-tree/discussions) are both very helpful)
- Fatal errors are sometimes too-easily triggered and error messages can be verbose and hard to grok
- The API has a large surface area and the docs tend to be technical and unfriendly


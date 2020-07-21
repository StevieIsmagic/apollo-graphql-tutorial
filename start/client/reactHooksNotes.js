/* REACT HOOKS

Two basic hooks:

State - useState() - allows a way to preserve some values between function calls. useState is a new way to use the exact same capabilities that this.state provides in a class. Normally, variables disappear when a function exits, but State variables are preserved by React. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike this.setState in a class, updating a state variable always replaces it instead of merging it.

Effect - useEffect()- lets us perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. You can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined! Unlike componentDidMount or componentDidUpdate, effects scheduled with useEffect don’t block the browser from updating the screen. This makes your app feel more responsive. 

There are (2) common kinds of side effects in React components:

1 - Effects that don't require cleanup:

Sometimes, we want to run some additional code after React has updated the DOM. Network requests, manual DOM mutations, and logging are common examples. We say this because we can run them and immediately forget about them.q

2 - Effects that do require cleanup:

Sometimes, we might want to set up a subscription to some external data source. In that case, it's important to clean up so that we don't introduce a memory leak. In a React class, you would typically set up a subscription in componentDidMount, and clean it up in componentWillUnmount. Notice how these lifecycle methods mirror each other. Lifecycle methods force us to split this logic even though conceptually code in both of them is related to the same effect.

With EFFECTS, if your effect returns a function, React will run it when it's time to clean up. Returning a function from the Effect Hook is the optional clean up mechanism . Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect! React performs the cleanup when when the component unmounts. 

One of the problems we outlined in the Motivation for Hooks is that class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods. Hooks let us split the code based on what it is doing rather than a lifecycle method name.

Remember Effects run after every render. You can tell React to skip applying an effect if certain values haven't changed between re-renders. (1) To do so, pass an array as an optional second argument to useEffect. If the value in the array is same for both current / previous renders, React will not apply the effect. This also works for effects that have a cleanup phase (ie. return a a cleanup fuction). (2) If you want react to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as the second argument . This tells React that your effect doesn't depend on ANY values from props or state, so it never needs to re-run.




NOTE -
We can use multiple State + Effect Hooks in a single component

So how does React know which state corresponds to which useState call? 

The answer is that React relies on the order in which Hooks are called. 

As long as the order of the Hook calls is the same between renders, React can associate some local state with each of them.

THIS IS WHY HOOKS MUST BE CALLED ON THE TOP LEVEL OF OUR COMPONENTS
*/


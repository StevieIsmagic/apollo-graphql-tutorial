/* REACT HOOKS

Two basic hooks:

State - useState() - allows a way to preserve some values between function calls. useState is a new way to use the exact same capabilities that this.state provides in a class. Normally, variables disappear when a function exits, but State variables are preserved by React. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike this.setState in a class, updating a state variable always replaces it instead of merging it.

Effect - useEffect()

We can use multiple State + Effect Hooks in a single component

So how does React know which state corresponds to which useState call? 

The answer is that React relies on the order in which Hooks are called. 

As long as the order of the Hook calls is the same between renders, React can associate some local state with each of them.

THIS IS WHY HOOKS MUST BE CALLED ON THE TOP LEVEL OF OUR COMPONENTS
*/


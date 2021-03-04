// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName)
//passing localStorage item as a callback fx instead of the value. Using a cb fx ensures the localStorage item is only
//accessed only when needed (not every time name is updated)
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => window.localStorage.setItem('name', name), [name])
  //Extra Credit 2 - pass a dependencies array to useEffect to restrict callback execution (which updates local storage) 
  //only when "name" state changes
  //React.useEffect gets called after every component render (including re-renders). However, other situations 
  //(such as when a parent component in the app tree gets re-rendered) trigger re-rendering 
  //that are not relevant to local storage updates
  //Source: check out KCD's explanation on egghead: https://egghead.io/lessons/react-store-values-in-localstorage-with-the-react-useeffect-hook
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting /> //Exercise 2 - since we can now save to local Storage, if we were to pass a value to initialName prop
  //and then refresh the page, that value will persist. 
}

export default App

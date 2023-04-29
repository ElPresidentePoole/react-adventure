import { useState } from 'react'
import InputBox from './InputBox.jsx'
import Journal from './Journal.jsx'
import './App.css'

function App() {
  const [log, setLog] = useState(["one", "two", "three"]);

  function addToLog(msg) {
    setLog([...log, msg]);
  }

  function parseInput(inputString) {
    addToLog(inputString);
  }

  return (
    <>
      <h1>Adventure!</h1>
      <div>
        <Journal log={log} />
        <InputBox parseInput={parseInput} />
      </div>
    </>
  )
}

export default App

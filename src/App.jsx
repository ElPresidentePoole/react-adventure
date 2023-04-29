import { useState } from 'react';
import InputBox from './InputBox.jsx';
import Journal from './Journal.jsx';
import Rooms from './Rooms.jsx';
import './App.css';

function describeRoom(room) {
  const item_names = room.items.map((o) => o.name );
  let items_string = item_names.slice(0, item_names.length-1).join(", ");
  items_string += ` and a ${item_names[item_names.length-1]}`;

  return `You are in the ${room.name}.  You look around the room and see ${items_string}.`;
}

function App() {
  const [room, setRoom] = useState(Rooms.bedroom);
  const [log, setLog] = useState([describeRoom(room)]);

  function addToLog(msg) {
    setLog([...log, msg]);
  }

  function parseInput(inputString) {
    const verb = inputString.split(' ')[0].toLowerCase();
    const noun = inputString.split(' ').length > 1 ? inputString.split(' ')[1].toLowerCase() : null;

    if(verb === "help") {
      //addToLog("Welcome to Adventure!  Type \"help\" for instructions!")
      addToLog('Type "look" to look around, or look [object] to look closer at an object.');
    } else if (verb === "look") {
      if (noun) {
        let foundNoun = room.items.find(o => o.name == noun);
        if (foundNoun) {
          addToLog(foundNoun.desc);
        } else {
          addToLog(`I'm sorry, but I don't see a ${noun} around here!`);
        }
      } else {
        addToLog(describeRoom(room));
      }
    }
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

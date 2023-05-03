import { useState } from 'react';
import InputBox from './InputBox.jsx';
import Journal from './Journal.jsx';
import Inventory from './Inventory.jsx';
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
  const [log, setLog] = useState(["Welcome to Adventure!  Type \"help\" for instructions!", describeRoom(room)]);
  const [inventory, setInventory] = useState([]);

  function addToLog(msg) {
    setLog([...log, msg]);
  }

  function verbLook(noun) {
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

  function verbTake(noun) {
    if (noun) {
      // FIXME: check if the noun is in the room first!
      const nounIdx = room.items.findIndex(o => o.name == noun);
      const nounItem = room.items[nounIdx];
      if(nounItem.takeable) {
        room.items = room.items.filter(o => o != nounItem);
        // NOTE: setState does not change the current state in already executing code!
        // See: https://react.dev/reference/react/Component#setstate
        setInventory([...inventory, nounItem]);
        addToLog(`You take the ${noun}.`);
      } else {
        addToLog(`${nounItem.take_excuse}`);
      }
    } else {
      addToLog("Take what?");
    }
  }

  function verbHelp() {
    addToLog('Type "look" to look around, or look [object] to look closer at an object (e.g. "look couch" is a valid command).');
  }

  function parseInput(inputString) {
    const inputArray = inputString.split(' ');
    const verb = inputArray[0].toLowerCase();
    const noun = inputArray.length > 1 ? inputArray.slice(1).join(' ').toLowerCase() : null;

    if(verb === "help") {
      verbHelp();
    } else if (verb === "look") {
      verbLook(noun);
    } else if (verb === "take") {
      verbTake(noun);
    }
  }

  return (
    <>
      <h1>Adventure!</h1>
      <div>
        <Journal log={log} /> <Inventory inventory={inventory} />
      </div>
      <div>
        <InputBox parseInput={parseInput} />
      </div>
    </>
  )
}

export default App

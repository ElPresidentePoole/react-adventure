import { useState } from 'react';

function InputBox({ parseInput }) {
  const [ command, changeCommand ] = useState('');

  function onChange(e) {
    changeCommand(e.target.value);
  }

  return (<form onSubmit={(e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    changeCommand('');
    parseInput(formJson.input);}}>
            <input type="text" className="commandInput" name="input" value={command} onChange={onChange} />
          </form>)
}

export default InputBox;

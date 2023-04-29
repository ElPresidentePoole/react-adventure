export default InputBox;

function InputBox({ parseInput }) {

  return (<form onSubmit={(e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    parseInput(formJson.input);}}>
            <input type="text" className="commandInput" name="input" />
          </form>)
}

export default Journal;

function Journal({ log }) {
  const list = log.map((o, i) => {
    return (<li key={i}>{o}</li>);
  });

  return (<ul>{list}</ul>)
}

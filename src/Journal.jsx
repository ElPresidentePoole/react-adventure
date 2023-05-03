export default function Journal({ log }) {
  const list = log.map((o, i) => {
    return (<li className="fadeIn" key={i}>{o}</li>);
  });

  return (<ul className="side-by-side-element">{list}</ul>)
}

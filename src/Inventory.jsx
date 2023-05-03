export default function Inventory({ inventory }) {
  const list = inventory.map((o, i) => {
    return (<option key={i}>{o.name}</option>);
  });

  return (<div className="side-by-side-element">
            <b>Inventory</b> <br />
            <select size={inventory.length}>{list}</select>
          </div>)
}

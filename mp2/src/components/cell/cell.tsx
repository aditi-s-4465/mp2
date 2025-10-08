import React from "react";
import "./cell.css";

interface pkmn {
  id: number;
  name: string;
  image: string;
  type: string;
  weight: number;
}

function Cell({ id, name, image, type, weight, onSelect }: pkmn & { onSelect: (apkmn: pkmn) => void }) {
  return (
    <div className="cell" onClick={() => onSelect({ id, name, image, type, weight })}>
      <div className="info">
          <div className=" cellid">#{id}</div>
          <div className="cellname">{name}</div>
      </div>
    </div>
  );
}

export default Cell;

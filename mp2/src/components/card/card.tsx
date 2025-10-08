import React from "react";
import "./card.css";

interface pkmn {
  id: number;
  name: string;
  image: string;
  type: string;
  weight: number;
}

function Card({ id, name, image, type, weight, onSelect }: pkmn & { onSelect: (apkmn: pkmn) => void }) {
  return (
    <div
      className="cellfull"
      onClick={() => onSelect({ id, name, image, type, weight })}
    >
      <div className="cardid">#{id}</div>
      <img className="cardimage" src={image} alt={name} />
      <div className="cardname">{name}</div>
    </div>
  );
}

export default Card;
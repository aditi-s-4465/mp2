import React from "react";
import "./details.css";

interface pkmn {
  id: number;
  name: string;
  image: string;
  type: string;
  weight: number;
}

function Details({
  apkmn,
  onClose,
  onNext,
  onPrev,
}: {
  apkmn: pkmn;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="overlay">
      <div className="box">
        <div className="detailsfull">
          <div className="cardid">#{apkmn.id}</div>
          <img className="cardimage" src={apkmn.image} alt={apkmn.name} />
          <div className="cardname">{apkmn.name}</div>
          <div className="carddetails">{apkmn.type}</div>
          <div className="carddetails">The weight is {apkmn.weight} pounds</div>
        </div>

        <div className="detailsbuttons">
          <button className="pnbutton" onClick={onPrev}>← Prev</button>
          <button className="cbutton" onClick={onClose}>Close</button>
          <button className="pnbutton" onClick={onNext}>Next →</button>
        </div>
      </div>
    </div>
  );
}

export default Details;

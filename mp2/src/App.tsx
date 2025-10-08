import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/card';
import Cell from './components/cell/cell';
import Details from './components/details/details';

interface pkmn {
  id: number;
  name: string;
  image: string;
  type: string; 
  weight: number;
}

const temppkmn: pkmn = {
  id: 0,
  name: "missingno",
  image: "none",
  type: "ghost",
  weight: -5,
};

function App() {
  const [pkmnList, setPkmnlist] = useState<pkmn[]>([]);
  const num = 151;
  const [galleryview, setGalleryview] = useState(false);
  const [showdetail, setShowdetail] = useState(0);
  const [currpkmn, setCurrpkmn] = useState<pkmn>(temppkmn);
  const [search, setSearch] = useState("");

  const [sortProperty, setSortProperty] = useState<"id" | "weight">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getpkmn = async (id?: number, setAsCurrent: boolean = false): Promise<void> => {
    try {
      let url = "";
      if (search && !id) {
        url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
      } else if (id !== undefined) {
        url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      } else {
        return;
      }

      const response: Response = await fetch(url);
      if (!response.ok) return;

      const data: any = await response.json();

      const pkmntype: string = data.types
        .map((poke: { type: { name: string } }) => poke.type.name)
        .join(", ");

      const newpkmn: pkmn = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default as string,
        type: pkmntype,
        weight: data.weight,
      };

      if (setAsCurrent) {
        setCurrpkmn(newpkmn);
      } else {
        setPkmnlist((prev) => {
          if (prev.some((p) => p.id === newpkmn.id)) return prev;
          return [...prev, newpkmn];
        });
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const becomegallery = () => setGalleryview(true);
  const unbecomegallery = () => setGalleryview(false);

  useEffect(() => {
    setPkmnlist([]);
    if (search) {
      void getpkmn();
    } else {
      for (let i = 1; i <= num; i++) {
        void getpkmn(i);
      }
    }
  }, [search]);

  const sortedList = [...pkmnList].sort((a, b) => {
    const propA = a[sortProperty];
    const propB = b[sortProperty];
    if (propA < propB) return sortOrder === "asc" ? -1 : 1;
    if (propA > propB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="App">
    <div className="controls-container">
    <input type="text" value={search} onChange={handleInputChange} placeholder="Type to search" className="inputstyling"/>

    <select value={sortProperty} onChange={(e) => setSortProperty(e.target.value as "id" | "weight")} className="selectstyling">
      <option value="id">ID</option>
      <option value="weight">Weight</option>
    </select>

    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")} className="selectstyling">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>

  <div className="view-buttons-container">
    <button type="button" className="buttonstyling" onClick={becomegallery}>
      Gallery View
    </button>
    <button type="button" className="buttonstyling" onClick={unbecomegallery}>
      List View
    </button>
  </div>
    {showdetail > 0 && currpkmn ? (
        <Details apkmn={currpkmn} onClose={() => setShowdetail(0)}
          onNext={() => {
            const idx = sortedList.findIndex((p) => p.id === currpkmn.id);
            if (idx < sortedList.length - 1) {
              setCurrpkmn(sortedList[idx + 1]);
              setShowdetail(sortedList[idx + 1].id);
            }
          }}
          onPrev={() => {
            const idx = sortedList.findIndex((p) => p.id === currpkmn.id);
            if (idx > 0) {
              setCurrpkmn(sortedList[idx - 1]);
              setShowdetail(sortedList[idx - 1].id);
            }
          }}/>
      ) : null}

      {galleryview ? (
        <div className="cardscontainer">
          {sortedList.map((pkmn) => (
            <Card
              key={pkmn.id}
              id={pkmn.id}
              name={pkmn.name}
              image={pkmn.image}
              type={pkmn.type}
              weight={pkmn.weight}
              onSelect={(pokemon) => {
                setCurrpkmn(pokemon);
                setShowdetail(pokemon.id);
              }}
            />
          ))}
        </div>
      ) : (
        <div className='cellscontainer'>
          {sortedList.map((pkmn) => (
            <Cell
              key={pkmn.id}
              id={pkmn.id}
              name={pkmn.name}
              image={pkmn.image}
              type={pkmn.type}
              weight={pkmn.weight}
              onSelect={(pokemon) => {
                setCurrpkmn(pokemon);
                setShowdetail(pokemon.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;


import { useState, useEffect } from "react";
import "./App.css";
import pokemonsJson from "./pokemons.json";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPokemons = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(pokemonsJson), 500);
    });
  };

  useEffect(() => {
    fetchPokemons().then((data) => {
      setPokemons(data);
    });
  }, []);

  const toggleRegistered = (id) => {
    setPokemons((prev) =>
      prev.map((p) => (p.id === id ? { ...p, registered: !p.registered } : p))
    );
  };

  const unRegisterAll = () => {
    setPokemons((prev) => prev.map((p) => ({ ...p, registered: false })));
  };

  const filtered = pokemons.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) && !p.registered
  );

  return (
    <div className="App">
      <h1>Pokédex App</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={unRegisterAll}>Unregister All</button>
      </div>

      <ul>
        {filtered.map((pokemon) => (
          <li key={pokemon.id}>
            <label>
              <input
                type="checkbox"
                checked={pokemon.registered}
                onChange={() => toggleRegistered(pokemon.id)}
              />
              {pokemon.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { Title } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Header } from "../Header";

import classes from "./mainLayout.module.css";

// const url = "https://pokeapi.co/api/v2/pokemon/1";

const arr = [];

//   if (id === 481) return;
const getPokemon = (id) => {
  if (id === 481) {
    console.log(arr);
    return;
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const price = Math.floor(Math.random() * (1000 - 50)) + 50;
      const abilitiesPromises = data.abilities.map((ability) => {
        return fetch(`${ability.ability.url}`).then((data) => data.json());
      });

      // console.log(abilitiesPromises);
      const abilities = [];

      Promise.all(abilitiesPromises).then((abilitiesData) => {
        abilitiesData.forEach(({ names, effect_entries }) => {
          const description = effect_entries.find((findedItem) => {
            return findedItem.language.name === "en";
          });

          const name = names.find((name) => name.language.name === "en");

          abilities.push({
            title: name.name,
            description: description?.effect || "",
          });
        });

        arr.push({
          name: data.name,
          id: data.id,
          price: price,
          image: data.sprites.other["official-artwork"]["front_default"],
          abilities: abilities,
          stats: data.stats.map((stat) => ({
            title: stat.stat.name,
            value: stat.base_stat,
          })),
        });

        console.log(arr);
        getPokemon(++id);
      });

      //   data.abilities.for

      // arr.push({
      //   name: data.name,
      //   id: data.id,
      //   price: price,
      //   image: data.sprites.other["official-artwork"]["front_default"],
      //   abilities: data.abilities,
      //   stats: data.stats.map((stat) => ({
      //     title: stat.stat.name,
      //     value: stat.stat.base_stat,
      //   })),
      // });
      //   getPokemon(++id);
    });
};

// getPokemon(3);

export const MainLayout = ({ children }) => {
  const [pokemonsArr, setPokemonsArr] = useState([]);

  const handleClick = () => {
    getPokemon(1);
    // setPokemonsArr(arr);

    // fetch("http://localhost:5050/set_pokemons", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(arr),
    // });
  };

  return (
    <div className={classes.main}>
      {/* <button
        onClick={() => {
          fetch("http://localhost:5050/set_pokemons", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(arr),
          });
        }}
      >
        send to server
      </button>
      <button
        onClick={() => {
          console.log("click");
          handleClick();
        }}
      >
        click
      </button> */}
      <Header />
      <>{children}</>
    </div>
  );
};

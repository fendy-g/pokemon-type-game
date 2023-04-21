import { PokemonTypes, BattleMode } from "./Enums";
import {TYPECHART} from "./PokemonTypes";

export const Calculate = (attack: PokemonTypes, defend: {type1: PokemonTypes, type2: PokemonTypes} ) => {
  // const multiplier1 = TYPECHART[defend.type1].defend[attack];
  // const multiplier2 = TYPECHART[defend.type2].defend[attack];

  //or

  const multiplier1 = TYPECHART[attack].attack[defend.type1];
  const multiplier2 = TYPECHART[attack].attack[defend.type2];

  return multiplier1 * multiplier2;
}
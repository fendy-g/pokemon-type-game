import * as React from 'react';
import {Label, PrimaryButton, Stack} from "@fluentui/react"

import {PokemonTypes} from "./Enums";
import {Calculate as calculate} from "./DamageCalculator"

const attackList = () => [
  PokemonTypes.BUG, PokemonTypes.DARK, PokemonTypes.DRAGON, PokemonTypes.ELECTRIC, PokemonTypes.FAIRY, PokemonTypes.FIGHTING, PokemonTypes.FIRE, PokemonTypes.FLYING, PokemonTypes.GHOST, PokemonTypes.GRASS, PokemonTypes.GROUND, PokemonTypes.ICE, PokemonTypes.NORMAL, PokemonTypes.POISON, PokemonTypes.PSYCHIC, PokemonTypes.ROCK, PokemonTypes.STEEL, PokemonTypes.WATER
];

const defendList = () => [
  PokemonTypes.BUG, PokemonTypes.DARK, PokemonTypes.DRAGON, PokemonTypes.ELECTRIC, PokemonTypes.FAIRY, PokemonTypes.FIGHTING, PokemonTypes.FIRE, PokemonTypes.FLYING, PokemonTypes.GHOST, PokemonTypes.GRASS, PokemonTypes.GROUND, PokemonTypes.ICE, PokemonTypes.NORMAL, PokemonTypes.POISON, PokemonTypes.PSYCHIC, PokemonTypes.ROCK, PokemonTypes.STEEL, PokemonTypes.WATER, PokemonTypes.NONE
]

type DefendType = {
  type1: PokemonTypes;
  type2: PokemonTypes;
}

const shuffle = (array: PokemonTypes[]) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const App =() => {
  const [score, setScore] = React.useState<number>(0);
  const [total, setTotal] = React.useState(0);
  const [attack, setAttack] = React.useState<PokemonTypes>(PokemonTypes.NONE);
  const [defend1, setDefend1] = React.useState<PokemonTypes>(PokemonTypes.NONE);
  const [defend2, setDefend2] = React.useState<PokemonTypes>(PokemonTypes.NONE);
  const [goNext, setGoNext] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState(true);

  const guessClick = (guess: number) => {
    const result = calculate(attack, {type1: defend1, type2: defend2});
    if (guess === result) {
      setScore(score + 1);
    }
    setTotal(total + 1);
    setGoNext(true);
  }

  React.useEffect(() => {
    // const attackTypes = attackList();
    const attackType = shuffle(attackList())[0]
    const defendTypes = shuffle(defendList());

    setAttack(attackType);
    setDefend1(defendTypes[0])
    setDefend2(defendTypes[1]);

    setNewQuestion(false);
  }, [newQuestion === true])

  const onClick = () => {
    setGoNext(false);
    setNewQuestion(true);
  }

  return (
    <Stack horizontalAlign="center" tokens = {{childrenGap: "8px"}}>
      <Label>Current score: {score}</Label>
      <Label>Running total: {total}</Label>
      <Label>Attack type: {attack}</Label>
      <Label>Defend type1: {defend1}</Label>
      <Label>Defend type2: {defend2}</Label>
      <Stack horizontal tokens = {{childrenGap: "8px"}}>
        <Stack.Item><PrimaryButton text="0" onClick={() => guessClick(0)} /></Stack.Item>
        <Stack.Item><PrimaryButton text="0.25" onClick={() => guessClick(0.25)} /></Stack.Item>
        <Stack.Item><PrimaryButton text="0.5" onClick={() => guessClick(0.5)} /></Stack.Item>
        <Stack.Item><PrimaryButton text="1" onClick={() => guessClick(1)} /></Stack.Item>
        <Stack.Item><PrimaryButton text="2" onClick={() => guessClick(2)} /></Stack.Item>
        <Stack.Item><PrimaryButton text="4" onClick={() => guessClick(4)} /></Stack.Item>
      </Stack>
      <PrimaryButton disabled={!goNext} text="Next" onClick={onClick} />
      <PrimaryButton text="Reset" onClick={() => {
        setScore(0);
        setTotal(0);
        setNewQuestion(true);
      }} />
    </Stack>
  );
}

export default App;

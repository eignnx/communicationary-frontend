import * as data from "@/assets/words.json";
import * as stringHash from "string-hash";
import random from "@trinkets/random";
const { create } = random["@trinkets/random"];

function coinFlip(probability, rng) {
  return rng.random() < probability;
}

export function generateWords(variety, seedValue) {
  const rng = create({
    seedInitFn() {
      return stringHash(seedValue || "qwerty");
    }
  });

  const total =
    data.consonants.length * data.vowelEndings.length + data.vowelSounds.length;
  const n = Math.floor(variety * total);

  const words = [];

  while (words.length < n) {
    let newWord;
    if (coinFlip(0.75, rng)) {
      const consonant = rng.choice(data.consonants);
      const vowelEnding = rng.choice(data.vowelEndings);
      newWord = consonant + vowelEnding;
    } else {
      newWord = rng.choice(data.vowelSounds);
    }

    if (!words.includes(newWord)) {
      words.push(newWord);
    }
  }

  return words;
}

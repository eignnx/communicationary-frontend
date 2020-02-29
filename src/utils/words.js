import * as data from "@/assets/words.json";

function coinFlip(probability) {
  return Math.random() < probability;
}

function choose(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

export function generateWords(variety) {
  const total =
    data.consonants.length * data.vowelEndings.length + data.vowelSounds.length;
  const n = Math.floor(variety * total);
  const words = [];

  while (words.length < n) {
    let newWord;
    if (coinFlip(0.75)) {
      const consonant = choose(data.consonants);
      const vowelEnding = choose(data.vowelEndings);
      newWord = consonant + vowelEnding;
    } else {
      newWord = choose(data.vowelSounds);
    }

    if (!words.includes(newWord)) {
      words.push(newWord);
    }
  }
  return words;
}

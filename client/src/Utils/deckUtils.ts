import { Deck } from "@/types/types";

export async function FetchNewDeck(setDeck: (deck: Deck) => void) {
  const response = await fetch("http://localhost:8080/deck");
  const deck: Deck = await response.json();
  setDeck(deck);
}

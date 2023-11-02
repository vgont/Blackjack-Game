import { Card, Deck } from "@/types/types";

const defaultCard: Card = {
  code: "0",
  image: "https://deckofcardsapi.com/static/img/back.png",
  suit: "0",
  value: 0,
};

export function CardValueParse(value: string) {
  if (value === "ACE") return 1;
  if (value.length > 1) return 10;
  return Number(value);
}

export async function FetchNewCard(deck: Deck, setCard: (card: Card) => void) {
  try {
    const response = await fetch(`http://localhost:8080/card/${deck.deck_id}`);
    const cardData = await response.json();

    const card: Card = {
      ...cardData.cards[0],
      value: CardValueParse(cardData.cards[0].value),
    };

    setCard(card);
  } catch (error) {
    console.log(error);
  }
}

export default defaultCard;

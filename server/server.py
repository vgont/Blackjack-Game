import requests
from flask import Flask, jsonify
from flask_cors import CORS


# ----Flask----
app = Flask(__name__)
CORS(app)


@app.route("/deck")
def get_new_deck():
    deck_url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    try:
        response = requests.get(deck_url)
        deck = response.json()
        return deck
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"


@app.route("/card/<deck_id>")
def get_new_card(deck_id):
    card_url = f"https://deckofcardsapi.com/api/deck/{deck_id}/draw/?count=1"
    try:
        response = requests.get(card_url)
        card = response.json()
        return card
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"


@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Hello world!"
    })


if __name__ == "__main__":
    app.run(debug=True, port=8080)

import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import oracledb as odb

# ----Oracle Database-----


def getConnection():
    try:
        con = odb.connect(user="user", password="pass",
                          dsn="oracle.fiap.com.br/orcl")
    except Exception as e:
        print(e)
    return con


def closeConnection(con):
    return con.close()


def insert_new_match(sum_cards_winner, sum_cards_loser, winner, winner_cards_drawed, loser_cards_drawed):
    sql = f"insert into t_cppy_match values (null, {sum_cards_winner}, {sum_cards_loser}, '{winner}', {winner_cards_drawed}, {loser_cards_drawed})"
    try:
        conn = getConnection()
        cursor = conn.cursor()
        cursor.execute(sql)
        conn.commit()
    except odb.exceptions.DatabaseError as e:
        print(f'Error: {e}')
    finally:
        closeConnection(conn)


# ----Flask----
app = Flask(__name__)
CORS(app)


@app.route("/deck")
def get_new_deck():
    deck_url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    # deck_url = "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,AD,2D,AC,2C,AH,2H"
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


@app.route("/registerMatch", methods=['POST'])
def register_new_match():
    try:
        matchData = request.get_json()
        insert_new_match(sum_cards_loser=matchData['loserCardsSum'], sum_cards_winner=matchData['winnerCardsSum'],
                         winner=matchData['winner'], winner_cards_drawed=matchData['winnerCardsDrawed'], loser_cards_drawed=matchData['loserCardsDrawed'])
        return jsonify({'message': 'Match registered'}), 201
    except Exception as e:
        print(f"Error: {e}")
        return {'message': 'An error occurred while registering the match'}, 500


if __name__ == "__main__":
    app.run(debug=True, port=8080)

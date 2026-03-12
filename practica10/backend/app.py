from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

cliente = MongoClient("mongodb://localhost:27017/")
db = cliente["videojuegosDB"]
coleccion = db["games"]

# OBTENER TODOS
@app.route('/games', methods=['GET'])
def obtener_games():
    lista = []
    for juego in coleccion.find():
        juego["_id"] = str(juego["_id"])
        lista.append(juego)
    return jsonify(lista)

# INSERTAR
@app.route('/games', methods=['POST'])
def insertar_game():
    datos = request.json
    coleccion.insert_one(datos)
    return jsonify({"mensaje": "Juego insertado"})

# ACTUALIZAR
@app.route('/games/<id>', methods=['PUT'])
def actualizar_game(id):
    datos = request.json
    coleccion.update_one(
        {"_id": ObjectId(id)},
        {"$set": datos}
    )
    return jsonify({"mensaje": "Juego actualizado"})

# ELIMINAR
@app.route('/games/<id>', methods=['DELETE'])
def eliminar_game(id):
    coleccion.delete_one({"_id": ObjectId(id)})
    return jsonify({"mensaje": "Juego eliminado"})

if __name__ == '__main__':
    app.run(debug=True)



from flask import Flask, jsonify
from flask_cors import CORS  
import sqlite3
import json
from collections import OrderedDict

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

class CustomJSONEncoder(json.JSONEncoder):
    def encode(self, o):
        return super().encode(o).replace('/', '\\/')

app.json_encoder = CustomJSONEncoder

def get_ordered_pokemon(row):
    return OrderedDict([
        ('id', row[0]),
        ('generation', row[1]),
        ('name', json.loads(row[2], object_pairs_hook=OrderedDict)),
        ('image', row[3]),
        ('image_shiny', row[4]),
        ('height', row[5]),
        ('weight', row[6]),
        ('stats', json.loads(row[7], object_pairs_hook=OrderedDict)),
        ('types', json.loads(row[8])),
        ('evolvedFrom', json.loads(row[9])),
        ('evolvesTo', json.loads(row[10]))
    ])

@app.route('/api/pokemon', methods=['GET'])
def get_pokemon():
    conn = sqlite3.connect('pokedex.db')
    c = conn.cursor()
    c.execute('SELECT * FROM pokemon ORDER BY id')
    rows = c.fetchall()
    conn.close()
    
    return jsonify({
        'success': True,
        'data': [get_ordered_pokemon(row) for row in rows]
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from os import getenv, environ
from os.path import join, dirname
from dotenv import load_dotenv
import os

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
if getenv('FLASK_ENV') == 'development':
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test.db')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    currency = db.Column(db.Integer, nullable=False, default=100)

    def __repr__(self):
        return f'<User {self.username}>'

class Fox(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    health = db.Column(db.Float, nullable=False, default=1.0)
    hunger = db.Column(db.Float, nullable=False, default=1.0)
    happiness = db.Column(db.Float, nullable=False, default=1.0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Fox {self.name}>'

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    effect = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Item {self.name}>'

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/users', methods=['POST'])
def create_user():
    username = request.json.get('username')
    if username is None or User.query.filter_by(username=username).first() is not None:
        return jsonify({"error": "Please provide a unique username"}), 400
    user = User(username=username)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": f"User {username} created successfully"}), 201

@app.route('/foxes', methods=['POST'])
def create_fox():
    name = request.json.get('name')
    user_id = request.json.get('user_id')
    if name is None or user_id is None or Fox.query.filter_by(name=name).first() is not None:
        return jsonify({"error": "Please provide a unique fox name and a user ID"}), 400
    fox = Fox(name=name, user_id=user_id)
    db.session.add(fox)
    db.session.commit()
    return jsonify({"message": f"Fox {name} created successfully for user {user_id}"}), 201

@app.route('/foxes/<int:user_id>', methods=['GET'])
def get_fox(user_id):
    fox = Fox.query.filter_by(user_id=user_id).first()
    if fox is None:
        return jsonify({"error": "No fox found for this user"}), 404
    return jsonify({"fox": {"name": fox.name, "health": fox.health, "hunger": fox.hunger, "happiness": fox.happiness}}), 200

@app.route('/foxes/<int:fox_id>', methods=['PUT'])
def update_fox(fox_id):
    fox = Fox.query.get(fox_id)
    if fox is None:
        return jsonify({"error": "No fox found with this ID"}), 404
    fox.health = request.json.get('health', fox.health)
    fox.hunger = request.json.get('hunger', fox.hunger)
    fox.happiness = request.json.get('happiness', fox.happiness)
    db.session.commit()
    return jsonify({"message": f"Fox {fox.name} updated successfully"}), 200

@app.route('/items/<int:item_id>/purchase', methods=['POST'])
def purchase_item(item_id):
    user_id = request.json.get('user_id')
    user = User.query.get(user_id)
    item = Item.query.get(item_id)
    if user is None or item is None:
        return jsonify({"error": "Invalid user or item ID"}), 404
    if user.currency < item.price:
        return jsonify({"error": "Not enough currency to purchase this item"}), 400
    user.currency -= item.price
    # Here you'd update the fox's stats based on the item.effect
    # For simplicity, we'll just increase the fox's health
    fox = Fox.query.filter_by(user_id=user_id).first()
    if fox is not None:
        fox.health = min(1.0, fox.health + 0.1)
    db.session.commit()
    return jsonify({"message": f"Item {item.name} purchased successfully"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
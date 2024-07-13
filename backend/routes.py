from flask import Flask, request, jsonify, Blueprint, current_app
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import db, User
import datetime
import jwt

api = Blueprint('api', __name__, url_prefix="/api")
CORS(api)

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@api.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify(message="Username and password are required"), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify(message="Username already exists"), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User created successfully"), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = generate_token(user.id)
        return jsonify(token=token), 200
    return jsonify(message="Invalid username or password"), 401

@api.route("/private", methods=["GET"])
def private():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split()[1]
    else:
        token = None

    user_id = decode_token(token)
    if user_id:
        user = User.query.get(user_id)
        return jsonify(user=user.serialize()), 200
    return jsonify(message="Invalid or expired token"), 401

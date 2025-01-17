"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, Users
from api.utils import APIException
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    """
    A simple endpoint to test API responses.
    
    Methods:
    - GET: Returns a greeting message.
    - POST: Returns a message including the JSON payload sent in the request.
    """
    try:
        if request.method == 'GET':
            response_body = {
                "message": "Hello! This is a GET response."
            }
        elif request.method == 'POST':
            data = request.json or {}
            response_body = {
                "message": f"Hello! This is a POST response. You sent: {data}"
            }
        return jsonify(response_body), 200
    except Exception as e:
        raise APIException(f"An unexpected error occurred: {str(e)}", status_code=500)

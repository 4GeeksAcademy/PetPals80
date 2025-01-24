"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Followers, Forum, Posts, Comments, Ban
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

app = Flask(__name__)
app.url_map.strict_slashes = False

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)

# Setup the admin
setup_admin(app)

# Setup commands
setup_commands(app)

# Add the API endpoints
app.register_blueprint(api, url_prefix='/api')

# Handle errors
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Serve static files
@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('PORT', 3001), debug=os.getenv("FLASK_DEBUG") == "1")

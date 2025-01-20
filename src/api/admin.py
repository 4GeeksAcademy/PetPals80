import os
from flask_admin import Admin # type: ignore
from flask import redirect, url_for
from flask_admin.contrib.sqla import ModelView # type: ignore
from api.models import db, Users, Followers, Forums, Posts, Comments, Bans

def setup_admin(app):
    # Ensure FLASK_APP_KEY is set
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'default_secret_key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    # Initialize Flask-Admin
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add models to Flask-Admin interface
    try:
        admin.add_view(ModelView(Users, db.session))
        admin.add_view(ModelView(Followers, db.session))
        admin.add_view(ModelView(Forums, db.session))
        admin.add_view(ModelView(Posts, db.session))
        admin.add_view(ModelView(Comments, db.session))
        admin.add_view(ModelView(Bans, db.session))
    except Exception as e:
        print(f"Error adding model to admin: {e}")
        raise

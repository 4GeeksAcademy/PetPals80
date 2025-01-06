import os
from flask_admin import Admin
from flask import redirect, url_for
from flask_login import current_user
from flask_admin.contrib.sqla import ModelView
from api.models import db, User, Followers, Forum, Posts, Comments, Ban

# Custom ModelView to add authentication
class MyModelView(ModelView):
    def is_accessible(self):
        # Allow access only to authenticated users with is_admin=True
        return current_user.is_authenticated and getattr(current_user, 'is_admin', False)

    def inaccessible_callback(self, name, **kwargs):
        # Redirect unauthenticated users to login page
        return redirect(url_for('login'))

def setup_admin(app):
    # Ensure FLASK_APP_KEY is set
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'default_secret_key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    # Initialize Flask-Admin
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add models to Flask-Admin interface
    try:
        admin.add_view(MyModelView(User, db.session))
        admin.add_view(MyModelView(Followers, db.session))
        admin.add_view(MyModelView(Forum, db.session))
        admin.add_view(MyModelView(Posts, db.session))
        admin.add_view(MyModelView(Comments, db.session))
        admin.add_view(MyModelView(Ban, db.session))
    except Exception as e:
        print(f"Error adding model to admin: {e}")
        raise

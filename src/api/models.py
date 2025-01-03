from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_migrate import Migrate


db = SQLAlchemy()


#USER TABLE ------------------------------------------------------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "created": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    
#FOLLOWERS TABLE ------------------------------------------------------------

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    followers_id = db.Column(db.Integer, nullable=False)
    followed_id = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "followers_id": self.followers_id,
            "followed_id": self.followed_id
        }
    
#FORUM ------------------------------------------------------------

class Forum(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.id,
            "user_id": self.user_id,
            "created_at": self.created_at
        }

#POSTS --------------------------------------------------------------

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    forum_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "forum_id": self.forum_id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at
        }
    
#COMMENTS --------------------------------------------------------------

class Comments (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    def serialize (self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at
        }

#BAN --------------------------------------------------------------

class Ban (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    reason = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    end_date = db.Column(db.DateTime, nullable=True)

    def serialize (self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "reason": self.reason,
            "start_date": self.start_date.strftime('%Y-%m-%d %H:%M:%S'),
            "end_date": self.end_date.strftime('%Y-%m-%d %H:%M:%S') if self.end_date else None
        }


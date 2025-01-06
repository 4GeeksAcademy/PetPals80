from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# USER TABLE ------------------------------------------------------------
class User(db.Model):
    __tablename__ = 'users'
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
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# FOLLOWERS TABLE ------------------------------------------------------------
class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    followers_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    follower = db.relationship('User', foreign_keys=[followers_id], backref='following')
    followed = db.relationship('User', foreign_keys=[followed_id], backref='followers')

    __table_args__ = (
        db.UniqueConstraint('followers_id', 'followed_id', name='unique_followers'),
    )

    def serialize(self):
        return {
            "id": self.id,
            "followers_id": self.followers_id,
            "followed_id": self.followed_id
        }

# FORUM TABLE ------------------------------------------------------------
class Forum(db.Model):
    __tablename__ = 'forums'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    user = db.relationship('User', backref='forums')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# POSTS TABLE ------------------------------------------------------------
class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    forum_id = db.Column(db.Integer, db.ForeignKey('forums.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    forum = db.relationship('Forum', backref='posts')
    user = db.relationship('User', backref='posts')

    def serialize(self):
        return {
            "id": self.id,
            "forum_id": self.forum_id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# COMMENTS TABLE ------------------------------------------------------------
class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    post = db.relationship('Posts', backref='comments')
    user = db.relationship('User', backref='comments')

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# BAN TABLE ------------------------------------------------------------
class Ban(db.Model):
    __tablename__ = 'bans'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reason = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    end_date = db.Column(db.DateTime, nullable=True)

    user = db.relationship('User', backref='bans')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "reason": self.reason,
            "start_date": self.start_date.strftime('%Y-%m-%d %H:%M:%S'),
            "end_date": self.end_date.strftime('%Y-%m-%d %H:%M:%S') if self.end_date else None
        }


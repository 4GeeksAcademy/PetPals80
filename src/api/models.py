from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# USER TABLE ------------------------------------------------------------
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    forums = db.relationship('Forums', backref='users', lazy=True) #esto crea una relación de uno a muchos entre Users(I) y Forums(II) permite que un User tenga múltiples Foros
    posts = db.relationship('Posts', backref='users', lazy=True) #esto crea una relación de uno a muchos entre Users(I) y Posts(II) y permite que un User tenga múltiples Posts
    comments = db.relationship('Comments', backref='user', lazy=True) #esto crea una relación de uno a muchos entre User(I) y Comments(II) y permite que un Users tenga múltiples Comments
    bans = db.relationship('Bans', backref='user', lazy=True) #permite que múltiples Bans esten asociados a un único User
    followers = db.relationship( 'Followers', foreign_keys='Followers.follower_id', backref='follower', lazy='dynamic') #define relación entre Users y Followers
    followed = db.relationship( 'Followers', foreign_keys='Followers.followed_id', backref='followed', lazy='dynamic' )


    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    
#INTERMEDIATE MODEL OF ASSOCIATION (FollId) ---------------------------------------------------------------

class FollId(db.Model): 
    __tablename__ = 'FollId' #esta tabla almacena las claves foráneas los tres modelos, permitiendo la asociación entre ellas
    id = db.Column(db.Integer, primary_key=True)
    user_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follower_id= db.Column(db.Integer, db.ForeignKey('followers.id'), nullable=False)
    #followed_id= db.Column(db.Integer, db.ForeignKey('users.followed'), nullable=False)

    def __repr__ (self):
        return f'<FollId {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "follower_id": self.follower_id,
            "followed_id": self.followed_id
        }



# FOLLOWERS TABLE ---------------------------------------------------------------
class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "followers_id": self.followers_id,
            "followed_id": self.followed_id
        }

# FORUMS TABLE ------------------------------------------------------------
class Forums(db.Model):
    __tablename__ = 'forums'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) #permite que múltiples Forums esten asociados a un único User
    posts_id = db.relationship('Posts', backref='forums', lazy=True) #permite que múltiples Posts esten asociados a un único Forum


    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# POSTS TABLE ------------------------------------------------------------
class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) #cada Post esta asociada a un único User
    forum_id = db.Column(db.Integer, db.ForeignKey('forums.id'), nullable=False) #cada Post esta asociada a un único Forum
    comments = db.relationship('Comments', backref='posts', lazy=True) # relación Forum(I) a Comments (II)

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
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    forum_id = db.Column(db.Integer, db.ForeignKey('forums.id'), nullable=False) #cada Comment esta asociado a un único Forum

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# BAN TABLE ------------------------------------------------------------
class Bans(db.Model):
    __tablename__ = 'bans'
    id = db.Column(db.Integer, primary_key=True)
    reason = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    end_date = db.Column(db.DateTime, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) #cada Ban esta asociado a un único User
    

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "reason": self.reason,
            "start_date": self.start_date.strftime('%Y-%m-%d %H:%M:%S'),
            "end_date": self.end_date.strftime('%Y-%m-%d %H:%M:%S') if self.end_date else None
        }


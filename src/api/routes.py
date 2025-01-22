"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, Users, Forums, Followers, Bans, Posts, Comments
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)
CORS(api)


#GET METHODS_________________________________________________________________________________________________________________________________________________________________

#PEDIDOS TOKENS___________________

#Pedidos para Registrar y Logear

#Acceso usuarios registrados ----------------------------

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    id = get_jwt_identity() #obtiene id almacenado en el token
    user = Users.query.get(id) #busca el usuario en la base de datos, si el resultado es None no existe
    if not user:
        return jsonify({"msg": "Algo ha ido mal"})
    return jsonify({"data": user.serialize()}), 200

#Registro de Usuario ----------------------------

@api.route('/register', methods=['POST'])
def register():
    try:
        #extraemos info
        username = request.json.get('username', None)
        email = request.json.get('email', None) #le decimos al final que si no hay email, nos devuelva none
        password = request.json.get('password', None)
        #checkeamos toda la info este
        if not email or not password:
            raise Exception ('missing data') #si no tengo email o password me devuelve esto
        #checkeamos que el usuario existe
        check_user = Users.query.filter_by(email=email).first() #.first() quiere decir que cuando encuentre el primero que pare
        #si no existe lo creamos
        if not check_user:
            new_user = Users(username=username, email=email, password=password, is_active=True) #crear un nuevo usuario
            db.session.add(new_user) #añade a la tabla de la db
            db.session.commit() #guarda los cambios en la db
            access_token = create_access_token(identity=str(new_user.id)) #estamos creando un token cuya identidad va a ser el id del usuario de arriba
        
            return ({"msg": "Ok!", "token": access_token}), 201
        #si el usuario existe devolvemos que ya hay una cuenta con ese correo
        return jsonify({"msg": "Usuario vinculado a este correo, intenta iniciar sesión"}), 400

    except Exception as error:
        return jsonify({'error': str(error)}), 400
    
#Login ----------------------------

@api.route('/login', methods=['POST'])
def login():
    try:
        #extraemos info
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        #checkeamos toda la info este
        if not email or not password:
            raise Exception ('missing data')
        #checkeamos que el usuario existe -----
        check_user = Users.query.filter_by(email=email).first() #.first() quiere decir que cuando encuentre el primero que pare
        #si existe, si el password que estoy recibiendo es igual que el almacenado
        if check_user.password == password:
            access_token = create_access_token(identity=str(check_user.id)) #si eso pasa creo mi asscess token y lo envío
            return ({"msg": "Ok!", "token": access_token}), 201
        return jsonify({"msg": "Usuario vinculado a este correo, intenta iniciar sesión"}), 400

    except Exception as error:
        return jsonify({'error': str(error)}), 400

#PEDIDOS ÚNICOS DE ADMINISTRADOR _______________________________________________________________________________________________


#OBTENER TODOS LOS USUARIOS_________ ✅ Admin ❌ Register User ❌ Unregistered Users

#CONTEXTO: el administrador puede obtener todos los usuarios de la base de datos

@api.route('/users', methods=['GET'])
def get_users():
    if not (request.user and request.user.profile == 'Admin'): #verifica que el.user existe y si existe si tiene valor de Admin
        return jsonify({"Error": "No tienes permiso para ver esta información"}), 403 
    data = Users.query.all() #devuelve lista
    data_list = [user.serialize() for user in data] #convertimos a diccionario
    return jsonify(data_list), 200

#OBTENER TODOS LOS COMENTARIOS DE UN USUARIO_________ ✅ Admin ❌ Register User ❌ Unregistered Users

#CONTEXTO: el administrador puede obtener todos los comentarios de un único usuario.

@api.route('/comments/<int:user_id>', methods=['GET'])
def get_all_user_comments(user_id):
    data = Comments.query.get(user_id)
    if not data:
        return jsonify({"Error": "This user has not made any comment"})
    comments_list = [el.serialize() for el in data]

    return jsonify(comments_list), 200

#OBTENER TODOS LOS USUARIOS QUE HAY EN UN FORO_________ ✅ Admin ❌ Register User ❌ Unregistered Users

#CONTEXTO: el administrador puede obtener todos los usuarios que hay dentro de un foro. 
#con fines de seguridad si hubiera algún tipo de irregularidad en el mismo.

@api.route('/forums/<int:user_id>', methods=['GET'])
def get_user_forums(user_id): #filtrado de foros a través del user_id
    data = Forums.query.get(user_id)
    if not data:
        return jsonify({"error": "Usuario no encontrado"})
    forum = Forums.query.filter_by(user_id=user_id).all() #si el user_id coincide con el id especificado. Solo devuelve los foros creados por el usuario
    forum_list = [el.serialize() for el in forum]

    return jsonify(forum_list), 200


#PEDIDOS DE USUARIO REGISTRADO Y NO REGISTRADO___________________________________________________________________________________



#OBTENER TODOS LOS COMENTARIOS_________ ✅ Admin ✅ Register User ✅ Unregistered Users // Lista completa de todos los comentarios de la base de datos // Usuarios registrados y no registrados solamente pueden obtener todos los comentarios de un foro o subforo

#CONTEXTO: los usuarios registrados y no registrados pueden ver los comentarios de cualquier foro y subforo

@api.route('/comments', methods=['GET'])
def get_all_comments():
    data = Comments.query.all() 
    forums_list = [el.serialize() for el in data] 

    return jsonify(forums_list), 200


#OBTENER TODAS LAS PUBLICACIONES_________ ✅ Admin ✅ Register User ✅ Unregistered Users 

#CONTEXTO: los usuarios registrados y no registrados pueden ver todas las publicaciones

@api.route('/posts', methods=['GET'])
def get_all_posts():
    data = Posts.query.all()
    posts_list = [el.serialize() for el in data]

    return jsonify(posts_list), 200


#OBTENER TODOS LOS FORUMS_________ ✅ Admin ✅ Register User ✅ Unregistered Users

#CONTEXTO: los usuarios registrados y no registrados pueden ver todos los foros

@api.route('/forums', methods=['GET'])
def get_all_forums():
    if not (el.user and el.user.profile == 'Admin'):
        return jsonify({"Error": "No tienes permiso para ver esta información"}), 403 
    data = Forums.query.all()
    forums_list = [el.serialize() for el in data]

    return jsonify(forums_list), 200


#OBTENER TODOS LOS COMENTARIOS DE UN FORO_________ ✅ Admin ✅ Register User ❌ Unregistered Users

#CONTEXTO: los usuarios registrados y no registrados pueden ver todos los comentarios del foro


@api.route('/comments/<int:forum_id>', methods=['GET'])
def get_all_forum_comments(forum_id):
    data = Forums.query.get(forum_id)
    if not data:
        return jsonify({"Error": "Foro no encontrado"}), 404
    comments = Comments.query.filter_by(forum_id=forum_id).all() #buscamos todos los comentarios asociados al forum_id
    comments_list = [el.serialize() for el in comments]

    return jsonify(comments_list), 200



#OBTENER UN USUARIO SEGUIDO_________ ✅ Admin ✅ Register User ❌ Unregistered Users

#CONTEXTO: los usuarios registrados pueden ver todos los usuarios a los que sigue

@api.route('/following/<int:user_id>', methods=['GET'])
def get_followed_user(user_id):
    try:
        data = Users.query.get(user_id) #devuelve usuario que coincida (por eso el get)
        if data is None:
            raise Exception("Usuario no encontrado")
        
        followed_users = Followers.query.filter.by(follower_id=user_id).all()
        if not followed_users:
            raise Exception("Usuario seguido no encontrado")

        followed_list = [followed_user.serialize() for followed_user in followed_users]
    
        return jsonify({"data": data.serialize(), "Seguido": followed_list}), 200
    except Exception as e:
        return jsonify({"Error": str(e)})
            

#OBTENER EL SEGUIDOR DE UN USUARIO_________ ✅ Admin ✅ Register User ❌ Unregistered Users

#CONTEXTO: los usuarios registrados pueden ver todos los usuarios que le siguen

@api.route('/following/<int:user_id>', methods=['GET'])
def get_follower_users(user_id):
    try:
        data = Users.query.get(user_id)
        if data is None:
            raise Exception("Usuario no encontrado")
        
        follower_users = Followers.query.filter.by(follower_id=user_id).all()
        if not follower_users:
            raise Exception("Usuario seguido no encontrado")

        follower_list = [follower_user.serialize() for follower_user in follower_users]
    
        return jsonify({"data": data.serialize(), "Seguido": follower_list}), 200
    except Exception as e:
        return jsonify({"Error": str(e)})





#POST METHODS 🎯 _______________________________________________________________________________________________________________________________________________________________________________________



#HACER UN COMENTARIO EN UN FORO_________ ✅ Admin ✅ Register User ❌ Unregistered Users

#CONTEXTO: los usuarios registrados pueden escribir un comentario

@api.route('/newcomment', methods=['POST'])
def new_comment():
    try:
        data = request.json
        #lo que le voy a mandar en el cuerpo
        if 'content' not in data:
            raise Exception ('No hay datos')
        
        comentario = Comments(
            content = data['content'],
            post_id = data['post_id'],
            user_id = data['user_id'],
            forum_id = data['forum_id']
        )
        db.session.add(comentario)
        db.session.commit()
        return jsonify("Comentario Creado"), 201
    except Exception as e:
        db.sesion.rollback()
        return jsonify({"error": str(e)})
    

#CREAR UN FORO_________ ✅ Admin ✅ Register User ❌ Unregistered Users

#CONTEXTO: los usuarios registrados pueden crear foro








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

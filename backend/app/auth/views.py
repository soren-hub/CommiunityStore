from flask import request
from flask_login import (login_user,
                         login_required,
                         logout_user,
                         current_user)
from werkzeug.security import generate_password_hash, check_password_hash
from ..firestore_service import login,register_community,register_user,get_user
from . import auth
from app.models import UserModel, UserData



@auth.route('/login', methods=[ 'POST','GET'])
def loging():
    if current_user.is_authenticated:
        #ya estas logeado regresar pantalla dentro de la app 
        return {
            'status':200,
            'message': 'Already logged in'
            }
    else:
        email = request.json["email"]
        password = request.json["password"] 
        response = login(email, password)
        if response['status']==200: 
            user_doc = get_user(email)
            if check_password_hash or password(user_doc['password'], password):
                username = user_doc['email']
                password_hash= user_doc['password']
                user_data = UserData(username, password_hash)
                user = UserModel(user_data)
                # logueo al usuario con Flask
                login_user(user)
        return response
    
@auth.route('/signup_community', methods=['GET', 'POST'])
def signup_community():
    email_admin = request.json["emailAdmin"]
    password = request.json["password"] 
    name_community = request.json["nameCommunity"] 
    return register_community(email_admin, password, name_community)



@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    email = request.json["email"]
    password = request.json["password"] 
    name = request.json["name"] 
    name_community = request.json["nameCommunity"] 
    response = register_user(email, password, name, name_community)
    if response['status']==200:
        password_hash = generate_password_hash(password)
        uid = response["uid"]
        user_data = UserData(uid, password_hash)
        user = UserModel(user_data)
        login_user(user)
    return response


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {
        'status':200,
        'message': 'Successfully logout user',
    }
    

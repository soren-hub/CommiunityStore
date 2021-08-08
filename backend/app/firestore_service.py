import firebase_admin
import pyrebase
from werkzeug.security import generate_password_hash
from firebase_admin import credentials, firestore, auth 
from firebase_admin._auth_utils import UserNotFoundError,EmailAlreadyExistsError
from requests import HTTPError
from .config import Fbconfig

config = Fbconfig.config
    
#Connect to firebase

cred = credentials.ApplicationDefault()
firebase = firebase_admin.initialize_app(cred,{
  'projectId': config['projectId'] 
})
pb = pyrebase.initialize_app(config)

db = firestore.client() 




def user_exist(email): 
    try: 
        get_uid_user_with_email(email)
        return True
    except UserNotFoundError : 
        return False
        
    
def get_uid_user_with_email(email): 
    user = auth.get_user_by_email(email)
    return user.uid

def get_user(email):
    uid = get_uid_user_with_email(email)
    users =   db.collection("users")
    query = users.where("uid", "==", uid).stream()
    user = [{"id":doc.id,**doc.to_dict()} for doc in query][0]
    return user

def list_communities():
    data = db.collection(u'communities').get()
    list_names = [collection.to_dict()['name'] for collection in data]
    return list_names
    
def verify_name_community_used(name_community): 
    communities = list_communities()
    if name_community in communities: 
        return True
    else:
        return False
    

    
def validates_and_inserts_user(user,password, name, name_community):
    """
    Validate user and the community he/she belongs to and insert 
    in the database to collection "users".

    Args:
        uid ([str]): ID registration 
        nickname ([str]): your nickname 
        name_community ([str]): community to which the user belongs

    Returns:
        tuple: response status codes and message  
    """
    if not verify_name_community_used(name_community): 
        return {
            'status':400,
            'message': 'Error: Community not exist'
            } 
    info_community={
        'name_community' : name_community,
        'name' : name,
        'email':user.email ,
        'password':generate_password_hash(password)
        #'uid':user.uid
    }
    db.collection("users").add(info_community)
    return {
        'status':200,
        'message': f'Successfully created user',
        "uid": uid
        }
    


def login(email,password): 
    try: 
        pb.auth().sign_in_with_email_and_password(email,password)
        return {
            'status':200,
            'message': 'Successfully login',
            "uid": get_uid_user_with_email(email)
            }
    except HTTPError: 
        return {
            'status':400,
            'message': 'Email or password is incorrect.'
            }
    
def register_auth(email, password):
    """
    Register in Googles authentication services  


    Args:
        email ([type]): [description]
        password ([type]): [description]

    Returns:
        [type]: [description]
    """
    try:
        user = auth.create_user(
                                email=email,
                                password=password
        )
        return user
    except EmailAlreadyExistsError:
        return {
            'status':400,
            'message': 'Email or password is incorrect.'
            }
    
def validates_and_inserts_community(email_admin,name_community): 
    """
    Validate the community if this have a valid name 
    if is valid insert in the database to collection "communities".

    Args:
        uid ([str]): ID registration 
        nickname ([str]): your nickname 
        name_community ([str]): community to which the user belongs

    Returns:
        tuple: response status codes and message  
    """
    if verify_name_community_used(name_community): 
        return {
            'status':400,
            'message': 'Error: Name already exist'
            }
    else:
        uid = get_uid_user_with_email(email_admin)
        data={
            'name':name_community,
            'user_admin':uid 
        }
        db.collection('communities').add(data)
        return {
            'status':200,
            'message': f'Successfully created community by user {uid}'
            }

def register_community(email_admin,password,name_community): 
    
    """
    Register  community and the adminitrator in the database.
    Consider that a user can be the administrator of more than one community. 
    Args:
        email_admin ([str]): [email of administrator ]
        password ([str]): [password of administrator]
        name_community ([str]): [name of the new community]

    Returns:
        [dict]: [responses of petition]
    """
    if user_exist(email_admin):
        is_valid = login(email_admin,password)['status']==200
        if is_valid:
            return validates_and_inserts_community(email_admin,name_community)
        else: 
            return {
                'status':400,
                'message': 'Password is incorrect'
                }
    else :
        register_auth(email_admin, password)
        return validates_and_inserts_community(email_admin,name_community)

        
def register_user(email,password, name,name_community): 
    
    """
    Register user and to which community do you belong in the database.

    Args:
        email ([str]): [user email ]
        password ([str]): [user password]
        nickname ([str]): [nicknae]
        name_community ([str]): [description]

    Returns:
        [dict]: [responses of petition]
    """
    if user_exist(email):
        return {
            'status':400,
            'message': 'Error: Email already exist'
            }
    else:    
        user = register_auth(email, password)
        return validates_and_inserts_user(user, password, name, name_community)
    
def signout(): 
    return auth.signOut()
        
        

if __name__ == '__main__':
    email="joaquinrohland@gmail.com"
    name="joaco"
    password="joaquin"
    uid='EhPf9qVOhSMtplc5zjyf4G6DXgs1'
    name_community='prueba1'
    #print(register_user(email,password,name,name_community))
    print(get_user(email))
    #print(register_user_into_community(email,password, nickname,name_community))
    #verify_name_used(name_community)
    #create_community(email_admin,name_community)
    #print(login(email,password))

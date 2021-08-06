import firebase_admin
from config import firebase_config
from firebase_admin import credentials, firestore, auth 



cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
  'projectId': firebase_config["projectId"],
})

db = firestore.client() 

def register_user(email, password, nickname):

    data_user= {
        "email":email,
        "password":password,
        "display_name":nickname
    }
    user = auth.create_user(**data_user)
    print('Register successfully')
    
def get_user_with_email(email): 
    user = auth.get_user_by_email(email)
    return user.uid

def list_communities():
    data = db.collection(u'communities').get()
    list_names = [collection.to_dict()["name"] for collection in data]
    return list_names
    
def verify_name_community_used(name_community): 
    communities = list_communities()
    if name_community in communities: 
        raise NameError('Name already exists') 
    
    
def create_community(email_admin,name_community): 
    verify_name_community_used(name_community)
    data={
        "name":name_community,
        "user_master":get_user_with_email(email_admin),
        "members":[]  
    }
    db.collection("communities").add(data)
    print('Create successfully')
    


    
    

    
    
if __name__ == '__main__':
    email_admin="joaquinrohland@gmail.com"
    password="joaquinr"
    uid='EhPf9qVOhSMtplc5zjyf4G6DXgs1'
    name_community='prueba'
    #verify_name_used(name_community)
    create_community(email_admin,name_community)

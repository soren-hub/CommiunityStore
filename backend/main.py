from flask import Flask,request
from flask_cors import CORS
from firestore_service import login,register_community, register_user

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/login', methods =['POST','GET'])
def login_user():
    email = request.json["email"]
    password = request.json["password"] 
    return login(email, password)

#Api route to sign up a new user
@app.route('/api/signup', methods =['POST','GET'])
def signup():
    email = request.json["email"]
    password = request.json["password"] 
    name = request.json["name"] 
    name_community = request.json["nameCommunity"] 
    return register_user(email, password, name, name_community)

@app.route('/api/signup_community', methods =['POST','GET'])
def signup_community():
    email_admin = request.json["emailAdmin"]
    password = request.json["password"] 
    name_community = request.json["nameCommunity"] 
    return register_community(email_admin, password, name_community)
    
if __name__=='__main__':
    app.run(debug=True, port= 8000) 
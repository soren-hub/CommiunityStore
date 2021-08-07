from flask import Flask,request
from flask_cors import CORS
from firestore_service import login,register_community, register_user

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

#Api route to sign up a new user
@app.route('/api/signup', methods =['GET', 'POST'])
def signup():
    email = request.json["email"]
    password = request.json["password"] 
    name = request.json["name"] 
    name_community = request.json["name_community"] 
    return register_user(email, password, name, name_community)
    
if __name__=='__main__':
    app.run(debug=True, port= 8000) 
from flask_cors import CORS
from app import create_app


app = create_app()
CORS(app)
#
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__=='__main__':
    app.run(debug=True, port= 8000) 
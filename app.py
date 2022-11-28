from flask import Flask, jsonify, request
from flask_cors import CORS

from router import query_api

app = Flask(__name__)
CORS(app)


@app.route('/hello', methods=['GET'])
def greetings():
    return jsonify({"msg": "Hello Interns!!"})


@app.route("/hello/input", methods=['GET', 'POST'])
def hello_input():
    data_dict = {'name': request.json['name'], 'age': request.json['age']}
    return jsonify({
        'Name': data_dict['name'],
        'age': data_dict['age']
    })


app.register_blueprint(query_api, url_prefix='/api/')
if __name__ == '__main__':
    app.run(host='localhost', port=5000)

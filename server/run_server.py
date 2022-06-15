import os
from flask import Flask, request, render_template, send_from_directory, jsonify
app = Flask(__name__, static_folder=None)

from dotenv import load_dotenv

load_dotenv() 

CLIENT_FOLDER = os.environ.get('CLIENT_FOLDER')
PORT = os.environ.get('PORT')

# Commented to update the homepage to show piano page
# @app.route('/')
# def welcome():
#     return render_template('welcome.html')

@app.route('/note', methods=['GET', 'POST'])
def note():
    result = None

    if request.method == 'POST':
        notes = request.get_json()
        if 'C#' in notes:
            result = True
        else:
            result = False
    else:
        result = {'note': 'C#'}
    
    return jsonify(result)

@app.route('/', methods=['GET'])
def serve_app():
    return send_from_directory(CLIENT_FOLDER, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    print(path)
    return send_from_directory(CLIENT_FOLDER, path)

if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=PORT
    )

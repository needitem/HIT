from flask import Flask, request
import subprocess
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import pillow

app = Flask(__name__)
CORS(app)

@app.route('/hello')
def hello():
    return 'Hello, World!'




@app.route('/resize', methods=['POST'])
def run_python_file():
    # Check if the post request has the file part
    if 'image' not in request.files:
        return 'No file part', 400

    file = request.files['image']

    # If the user does not select a file, the browser might
    # submit an empty file part without a file name.
    if file.filename == '':
        return 'No selected file', 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join('./', filename)
        file.save(file_path)
        print("경로 : " + file_path)
        # Run your Python script here with the image file
        result = subprocess.check_output(['python', 'head.py', 'output/15.png', file_path, 'output/resized_face_area.png'])

        return 'File uploaded and saved', 200

    return 'Error', 500

if __name__ == '__main__':
    app.run(debug=False)
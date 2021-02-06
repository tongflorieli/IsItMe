import traceback

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("IsItMe.html")

@app.route('/UploadImage', methods=['POST'])
def UploadImage():
    try:
        thisFile = request.files.get('imgfile')
        thisFile.save("./pictures/" + thisFile.filename)
        return jsonify(Name="success", Value="")
    except Exception as ex:
        return jsonify(Name="failure", Value=ex + traceback.format_exc())

if __name__ == '__main__':
    app.run()
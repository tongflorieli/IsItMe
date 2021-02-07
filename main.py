import traceback, face_recognition, os

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("IsItMe.html")

@app.route('/IsItMe', methods=['POST'])
def IsItMe():
    try:
        allfiles = request.files
        study_img = allfiles.get('study_img')
        unkown_img = allfiles.get('unkown_img')
        study_file_path = "./pictures/study_img"
        unkown_file_path = "./pictures/unkown_img"
        if(len(study_img.filename.split(".")) == 2):
            study_file_path += "." + study_img.filename.split(".")[1]
        if(len(unkown_img.filename.split(".")) == 2):
            unkown_file_path += "." + unkown_img.filename.split(".")[1]
        study_img.save(study_file_path)
        unkown_img.save(unkown_file_path)

        # face recognition
        image1 = face_recognition.load_image_file(study_file_path)
        image1_encoding = face_recognition.face_encodings(image1)[0]

        unknown_picture = face_recognition.load_image_file(unkown_file_path)
        unknown_face_encoding = face_recognition.face_encodings(unknown_picture)[0]

        distance = face_recognition.face_distance([image1_encoding], unknown_face_encoding)

        #delete files
        if os.path.exists(study_file_path):
            os.remove(study_file_path)
        if os.path.exists(unkown_file_path):
            os.remove(unkown_file_path)

        if distance < 0.5:
            return jsonify(Name="success", Value="yes", Distance=str(distance))
        else:
            return jsonify(Name="success", Value="no", Distance=str(distance))
    except Exception as ex:
        return jsonify(Name="failure", Value= str(ex) + traceback.format_exc())

if __name__ == '__main__':
    app.run()
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import db
from model import Upload
import os

upload_bp = Blueprint('upload', __name__)

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'dicom', 'nii', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/', methods=['POST'])
@jwt_required()
def upload_file():
    file = request.files.get('file')
    if not file or not allowed_file(file.filename):
        return jsonify({'message': 'Invalid file type'}), 400

    user_id = get_jwt_identity()
    filename = file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    new_upload = Upload(filename=filename, file_type=file.content_type, user_id=user_id)
    db.session.add(new_upload)
    db.session.commit()

    return jsonify({'message': 'File uploaded successfully', 'file': filename}), 201

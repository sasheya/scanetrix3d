from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required
from extensions import db
from model import Upload
import os

process_bp = Blueprint('process', __name__, url_prefix='/process')

PROCESSED_FOLDER = 'processed/' # This should match the directory in mriWebApp/backend/

@process_bp.route('/<int:upload_id>', methods=['POST'])
@jwt_required()
def process_file(upload_id):
    # In a real application, this would trigger the deep learning model processing
    # For now, it's a placeholder
    upload = Upload.query.get(upload_id)
    if not upload:
        return jsonify({'message': 'Upload not found'}), 404

    # TODO: Add logic to trigger model processing for the uploaded file
    # The processed results should be saved to the PROCESSED_FOLDER

    return jsonify({'message': f'Processing started for upload ID: {upload_id}'}), 200

@process_bp.route('/results/<int:upload_id>', methods=['GET'])
@jwt_required()
def get_results(upload_id):
    # In a real application, this would retrieve and return the processed results
    # For now, it's a placeholder
    upload = Upload.query.get(upload_id)
    if not upload:
        return jsonify({'message': 'Upload not found'}), 404

    # TODO: Add logic to retrieve processed results for the upload ID
    # This might involve reading a file from PROCESSED_FOLDER or querying the database

    # Example: Returning a dummy processed file
    processed_filename = f"processed_{upload.filename}.vti" # Assuming .vti is the processed format
    processed_filepath = os.path.join(PROCESSED_FOLDER, processed_filename)

    if os.path.exists(processed_filepath):
        return send_from_directory(PROCESSED_FOLDER, processed_filename)
    else:
        return jsonify({'message': 'Results not found for this upload'}), 404

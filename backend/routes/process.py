from flask import Blueprint, request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required
from extensions import db
from model import Upload
import os
import nibabel as nib
from backend.Models.mlmodel import process_single_volume # Import the new function using absolute path

process_bp = Blueprint('process', __name__, url_prefix='/process')

PROCESSED_FOLDER = 'processed/' # This should match the directory in mriWebApp/backend/
UPLOAD_FOLDER = 'uploads/' # Assuming uploads are saved here

@process_bp.route('/<int:upload_id>', methods=['POST'])
@jwt_required()
def process_file(upload_id):
    upload = Upload.query.get(upload_id)
    if not upload:
        return jsonify({'message': 'Upload not found'}), 404

    uploaded_filepath = os.path.join(UPLOAD_FOLDER, upload.filename)

    if not os.path.exists(uploaded_filepath):
        return jsonify({'message': 'Uploaded file not found'}), 404

    try:
        # Load the MRI data
        mri_img = nib.load(uploaded_filepath)
        mri_data = mri_img.get_fdata()

        # Call the ML model processing function
        processed_data = process_single_volume(mri_data)

        # Define the path to save the processed results
        # Assuming saving as a NIfTI file with a '_processed' suffix
        processed_filename = f"{os.path.splitext(upload.filename)[0]}_processed.nii"
        processed_filepath = os.path.join(PROCESSED_FOLDER, processed_filename)

        # Create a new NIfTI image from the processed data
        processed_img = nib.Nifti1Image(processed_data, affine=mri_img.affine)

        # Save the processed file
        nib.save(processed_img, processed_filepath)

        # Update the upload record in the database
        upload.processed_filepath = processed_filepath
        db.session.commit()

        return jsonify({'message': f'Processing completed and results saved for upload ID: {upload_id}'}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error during processing: {e}")
        return jsonify({'message': 'An error occurred during processing'}), 500


@process_bp.route('/results/<int:upload_id>', methods=['GET'])
@jwt_required()
def get_results(upload_id):
    upload = Upload.query.get(upload_id)
    if not upload:
        return jsonify({'message': 'Upload not found'}), 404

    # Retrieve the processed file path from the upload record
    processed_filepath = upload.processed_filepath

    if processed_filepath and os.path.exists(processed_filepath):
        # Extract the directory and filename to use send_from_directory
        processed_dir = os.path.dirname(processed_filepath)
        processed_filename = os.path.basename(processed_filepath)
        return send_from_directory(processed_dir, processed_filename)
    else:
        return jsonify({'message': 'Results not found for this upload'}), 404

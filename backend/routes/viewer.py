from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from model import Upload

viewer_bp = Blueprint('viewer', __name__)

@viewer_bp.route('/<int:upload_id>', methods=['GET'])
@jwt_required()
def get_scan(upload_id):
    upload = Upload.query.get(upload_id)
    if not upload:
        return jsonify({'message': 'Scan not found'}), 404

    # Here, you can return additional data such as the scan type, file location, etc.
    return jsonify({
        'filename': upload.filename,
        'file_type': upload.file_type,
    }), 200

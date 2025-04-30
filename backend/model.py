from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(150), nullable=False)
    file_type = db.Column(db.String(50), nullable=False)  # DICOM, NIfTI, JPG, etc.
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date_uploaded = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('uploads', lazy=True))

from extensions import db
from datetime import datetime, timezone

"""
class User:
    id:int primary Key
    username: str
    password: str
    email: str
    date_Created: datetime
"""

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __repr__(self):
        return f"<User {self.title}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

"""
class Upload:
    id:int primary Key
    filename= str
    file_type: str
    user_id: int foreign key
    date_uploaded: datetime
"""

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(150), nullable=False)
    file_type = db.Column(db.String(50), nullable=False)  # DICOM, NIfTI, JPG, etc.
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date_uploaded = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', backref=db.backref('uploads', lazy=True))

    def __repr__(self):
        return f"<Upload {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

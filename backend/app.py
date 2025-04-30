from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)  # Allow cross-origin requests (for frontend-backend communication)

# Initialize Database and JWT
db = SQLAlchemy(app)
jwt = JWTManager(app)

from routes.auth import auth_bp
from routes.upload import upload_bp
from routes.viewer import viewer_bp

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(upload_bp, url_prefix='/upload')
app.register_blueprint(viewer_bp, url_prefix='/viewer')

if __name__ == '__main__':
    app.run(debug=True)

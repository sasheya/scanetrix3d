from flask_cors import CORS
from flask_jwt_extended import JWTManager
from extensions import db, init_app
from routes.auth import auth_bp
from routes.upload import upload_bp
from routes.viewer import viewer_bp
from routes.process import process_bp
from flask import Flask
from flask_restx import Api

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)  #for frontend-backend communication

# api = Api(app, doc='/docs')

init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(upload_bp, url_prefix='/upload')
app.register_blueprint(viewer_bp, url_prefix='/viewer')
app.register_blueprint(process_bp, url_prefix='/process')


def init_db():
    with app.app_context():
        db.create_all()

init_db()

if __name__ == '__main__':
    app.run(debug=True)

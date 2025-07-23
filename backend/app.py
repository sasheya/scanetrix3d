from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .extensions import db, init_app
from .routes.auth import auth_bp
from .routes.upload import upload_bp
from .routes.viewer import viewer_bp
from .routes.process import process_bp

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)

init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(upload_bp, url_prefix='/upload')
app.register_blueprint(viewer_bp, url_prefix='/viewer')
app.register_blueprint(process_bp, url_prefix='/process')

if __name__ == '__main__':
    app.run(debug=True)

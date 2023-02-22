from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Notebook, Note, User, db
from app.forms import NotebookForm

notebooks_routes = Blueprint('notebooks', __name__)

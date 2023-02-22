from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Notebook, Note, User, db
from app.forms import NotebookForm


notebook_routes = Blueprint('notebooks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET NOTEBOOKS OF CURRENT USER
@notebook_routes.route("/")
@login_required
def get_user_notebooks():
    allNotebooks = Notebook.query.filter(Notebook.userId == current_user.id).all()
    return {"Notebooks": [notebook.to_dict() for notebook in allNotebooks]}

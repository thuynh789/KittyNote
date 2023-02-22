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
    return jsonify({"Notebooks": [notebook.to_dict() for notebook in allNotebooks]})


# GET ONE NOTEBOOK
@notebook_routes.route("/<int:id>")
@login_required
def get_one_notebook(id):
    oneNotebook = Notebook.query.get(id)
    if oneNotebook is None:
        return jsonify({'error': 'Notebook not found'}),404
    if oneNotebook.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401
    notes = [note.to_dict() for note in oneNotebook.note]
    # notes = [note.to_dict() for note in oneNotebook.note]
    return jsonify({
        'Notebook': {
            'id': oneNotebook.id,
            'title': oneNotebook.title,
            'created_at': oneNotebook.created_at,
            'updated_at': oneNotebook.updated_at,
            'notes': notes
        }})

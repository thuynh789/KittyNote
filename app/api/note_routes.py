from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Notebook, Note, User, db
from app.forms import NoteForm
from app.api.auth_routes import validation_errors_to_error_messages


note_routes = Blueprint('notes', __name__)


# GET NOTES OF CURRENT USER
@note_routes.route("/")
@login_required
def get_user_notes():
    print('WE IN THE NOTES ROUTE')
    allNotes = Note.query.filter(Note.userId == current_user.id).all()
    print(allNotes)
    return jsonify({"Notes": [note.to_dict() for note in allNotes]})

# GET ONE NOTE
@note_routes.route("/<int:id>")
@login_required
def get_one_note(id):
    print('--------WE ARE IN NOTEBOOK DETAILS ROUTE---------')
    oneNote = Note.query.get(id)
    if oneNote is None:
        return jsonify({'error': 'Note not found'}),404
    if oneNote.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401
    note = oneNote.to_dict()
    return jsonify({ 'Note': note })


#CREATE NOTE
@note_routes.route("/", methods=['POST'])
@login_required
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        note = Note(
            title=data['title'],
            content = data['content'],
            userId=current_user.id,
            notebookId = data['notebookId']
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



#UPDATE/EDIT NOTE
@note_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_note(id):
    note = Note.query.get(id)
    if note is None:
        return jsonify({'error': 'Note not found'}),404
    if current_user.id != note.userId:
        return jsonify({'error': 'Unauthorized'}), 401

    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note.title = form.data['title']
        note.content = form.data['content']
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#DELETE NOTE
@note_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_note(id):
    note = Note.query.get(id)
    if note is None:
        return jsonify({'error': 'Note not found'}),404
    if current_user.id != note.userId:
        return jsonify({'error': 'Unauthorized'}), 401
    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note deleted"}), 200

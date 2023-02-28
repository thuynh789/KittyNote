from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(),Length(min=3, max=500)])
    content = StringField('content', validators=[Length(min=0, max=1000)])
    notebookId = IntegerField('notebookId')

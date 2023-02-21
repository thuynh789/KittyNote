from app.models import db, Notebook, environment, SCHEMA

def seed_notebooks():

    notebook_1 = Notebook(
        userId= 1,
        title= 'Note 1'
    )
    notebook_2 = Notebook(
        userId= 1,
        title= 'Note 1'
    )
    notebook_3 = Notebook(
        userId= 1,
        title= 'Note 1'
    )
    notebook_4 = Notebook(
        userId= 2,
        title= 'Note 1'
    )

    db.session.add(notebook_1)
    db.session.add(notebook_2)
    db.session.add(notebook_3)
    db.session.add(notebook_4)
    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")

    db.session.commit()

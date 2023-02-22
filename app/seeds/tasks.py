from app.models import db, Task, environment, SCHEMA

def seed_tasks():

    task_1 = Task(
        userId= 1,
        title= 'Purrfect Pages',
        content
    )


    db.session.add(notebook_1)
    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")

    db.session.commit()

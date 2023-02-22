from app.models import db, Task, environment, SCHEMA

def seed_tasks():

    task_1 = Task(
        userId= 1,
        title= 'Meow for food.',
        is_completed=True
    )
    task_2 = Task(
        userId= 1,
        title= 'Lay on keyboard',
        is_completed=False
    )
    task_3 = Task(
        userId= 1,
        title= 'Catch mice and bring to humans',
        is_completed=False
    )


    db.session.add(task_1)
    db.session.add(task_2)
    db.session.add(task_3)
    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()

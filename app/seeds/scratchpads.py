from app.models import db, Scratchpad, environment, SCHEMA

def seed_scratchpads():

    scratchpad_1 = Scratchpad(
        userId= 1,
        content= ''
    )
    scratchpad_2 = Scratchpad(
        userId= 2,
        content= ''
    )
    scratchpad_3 = Scratchpad(
        userId= 3,
        content= ''
    )

    db.session.add(scratchpad_1)
    db.session.add(scratchpad_2)
    db.session.add(scratchpad_3)
    db.session.commit()


def undo_scratchpads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.scratchpads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM scratchpads")

    db.session.commit()

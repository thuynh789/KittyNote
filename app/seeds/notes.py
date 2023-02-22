from app.models import db, Note, environment, SCHEMA

def seed_notes():

# user 1 notes
    note_1 = Note(
        userId= 1,
        notebookId= 1,
        title= 'Note 1',
        content= 'Cats are fascinating creatures. They come in all shapes, sizes, and colors, and each one has its own unique personality.'
    )
    note_2 = Note(
        userId= 1,
        notebookId= 1,
        title= 'Note 2',
        content= 'Some cats are playful and energetic, while others are more laid-back and relaxed.'
    )
    note_3 = Note(
        userId= 1,
        notebookId= 1,
        title= 'Note 3',
        content= 'Some are outgoing and love attention, while others are more reserved and independent.'
    )
    note_4 = Note(
        userId= 1,
        notebookId= 2,
        title= 'Note 4',
        content= 'One thing that all cats have in common is their love of napping. They can sleep for hours on end, and they always seem to find the coziest spots to do it in.'
    )
    note_5 = Note(
        userId= 1,
        notebookId= 2,
        title= 'Note 5',
        content= "Whether it's curled up in a sunny window or snuggled up in a warm blanket, cats know how to relax."
    )
    note_6 = Note(
        userId= 1,
        notebookId= 3,
        title= 'Note 6',
        content= 'Cats are also known for their grooming habits. '
    )
    note_7 = Note(
        userId= 1,
        notebookId= 3,
        title= 'Note 7',
        content= 'They are meticulous about keeping themselves clean, and they spend a lot of time grooming their fur.'
    )
    note_8 = Note(
        userId= 1,
        notebookId= 4,
        title= 'Note 8',
        content= 'They are meticulous about keeping themselves clean, and they spend a lot of time grooming their fur.'
    )

# user 2 notes
    note_9 = Note(
        userId= 2,
        notebookId= 5,
        title= 'Note 9',
        content= 'This not only helps them look their best, but it also helps them stay healthy by removing dirt and parasites from their fur.'
    )


    # all_notes = [note_1, note_2, note_3, note_4, note_5, note_6, note_7, note_8, note_9]
    # add_notes = [db.session.add(note) for note in all_notes]
    db.session.add(note_1)
    db.session.add(note_2)
    db.session.add(note_3)
    db.session.add(note_4)
    db.session.add(note_5)
    db.session.add(note_6)
    db.session.add(note_7)
    db.session.add(note_8)
    db.session.add(note_9)
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notes")

    db.session.commit()

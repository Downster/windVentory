from app.models import MaterialClass
from ..extensions import db



def seed_material_class():
    Fiberglass = MaterialClass(
            material_class='Material', material_subclass='Fiberglass', unit='Yards')
    Carbon = MaterialClass(
            material_class='Material', material_subclass='Carbon', unit='Yards')
    PVC_Core = MaterialClass(
            material_class='Material', material_subclass='PVC Core', unit='Square Feet')
    Balsa_Core = MaterialClass(
        material_class='Material', material_subclass='Balsa Core', unit='Square Feet')
    BP_20 = MaterialClass(
        material_class='Chemical', material_subclass='Slow curing adhesive', unit='Tubes'
    )
    Wind_Filler = MaterialClass(
        material_class='Chemical', material_subclass='Fast curing adhesive', unit='Tubes'
    )
    Resin = MaterialClass(
        material_class='Chemical', material_subclass='Epoxy', unit='Cans'
    )
    Plastic = MaterialClass(
        material_class='Misc', material_subclass='Plastic Sheeting', unit='Square Feet'
    )
    Spreaders = MaterialClass(
        material_class='Misc', material_subclass='Spreaders', unit='Spreaders'
    )
    Sticks = MaterialClass(
        material_class='Misc', material_subclass='Stir Sticks', unit='sticks'
    )



    
    db.session.add(Fiberglass)
    db.session.add(Carbon)
    db.session.add(PVC_Core)
    db.session.add(Balsa_Core)
    db.session.add(BP_20)
    db.session.add(Wind_Filler)
    db.session.add(Resin)
    db.session.add(Plastic)
    db.session.add(Spreaders)
    db.session.add(Sticks)

    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_material_class():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
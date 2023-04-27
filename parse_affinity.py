import json

weapons = []

with open("./gdpr_data/affinity.txt", "r") as f:
    for l in f:
        l = l.strip()
        if "affinity" in l.lower():
            continue

        weapon, affinity = l.split(":")
        weapon = weapon.strip()
        weapon = weapon.replace("  ", " ")
        weapon = weapon.title()
        weapon = weapon.replace("- ", "-")
        weapon = weapon.replace("< ", "<")
        weapon = weapon.replace("Archwing", "ARCHWING")
        weapon = weapon.replace("Mk 1", "MK1")

        weapons += [weapon]

print(json.dumps(weapons))
print(len(weapons))

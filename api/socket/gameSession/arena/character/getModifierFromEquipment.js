export default function getModifierFromEquipment(target, equipment) {
  let modifier = 0;

  equipment.forEach((piece) => {
    if (piece.effects[target]) { modifier += piece.effects[target]; }
  });

  return modifier;
}

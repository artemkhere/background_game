import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// import { connectToSocket } from '../../actions/socketActions';

export default function Arena(props) {
  // const [hero, setHero] = useState(initiateHero(hero));
  // const [enemy, setEnemy] = useState(generateEnemy(1));

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {});

  const baseStats = {
    hitChance: 0.75,
    critChance: 0.05,
    critMultiplier: 1.5,
    dodgeChance: 0.1,
    damage: 1,
    mana: 5,
    health: 10
  };

  const hero = {
    attributes: {
      dexterity: 3, // hit chance, crit chance
      agility: 3, // dodge chance, crit dmg multiplier
      intellect: 3, // spell requirements, chances to hit, spell effect
      stamina: 5, // amount of health
      wizdom: 3, // amount of mana
      strength: 2 // dmg done
    },
    equipped: {
      weapon: undefined,
      ring: undefined,
      amulet: undefined,
      head: undefined,
      body: undefined,
      legs: {
        name: 'Poopy booties',
        rarity: 'common',
        effects: {
          dexterity: 1,
          damage: 1,
          hitChance: 0.05
        }
      },
      feet: undefined,
    }
  }

  const getModifierFromEquipment = (target, equipment) => {
    let modifier = 0;

    equipment.forEach((piece) => {
      if (piece.effects[target]) { modifier += piece.effects[target]; }
    });

    return modifier;
  }

  const applyAttributeModifiersFromEquipment = (attributes, equipped) => {
    const dexterity = attributes.dexterity + getModifierFromEquipment('dexterity', equipped);
    const agility = attributes.agility + getModifierFromEquipment('agility', equipped);
    const intellect = attributes.intellect + getModifierFromEquipment('intellect', equipped);
    const stamina = attributes.stamina + getModifierFromEquipment('stamina', equipped);
    const wizdom = attributes.wizdom + getModifierFromEquipment('wizdom', equipped);
    const strength = attributes.strength + getModifierFromEquipment('strength', equipped);

    return {
      dexterity,
      agility,
      intellect,
      stamina,
      wizdom,
      strength
    }
  }

  const calculateHitChance = (dexterity, equipped, enemyAgility = 0) => {
    let hitChance = baseStats.hitChance;
    hitChance += Math.ceil((dexterity - enemyAgility) / 2) * 0.01;
    hitChance += getModifierFromEquipment('hitChance', equipped);
    return hitChance;
  }

  const calculateCritChance = (dexterity, equipped) => {
    let critChance = baseStats.critChance;
    critChance += Math.ceil(dexterity / 2) * 0.01;
    critChance += getModifierFromEquipment('critChance', equipped);
    return critChance;
  }

  const calculateCritMultiplier = (agility, equipped) => {
    let critMultiplier = baseStats.critMultiplier;
    critMultiplier += agility * 0.03;
    critMultiplier += getModifierFromEquipment('critMultiplier', equipped);
    return critMultiplier;
  }

  const calculateDodgeChance = (agility, equipped, enemyDexterity = 0) => {
    let dodgeChance = baseStats.dodgeChance;
    dodgeChance += Math.ceil((agility - enemyDexterity) / 2) * 0.01;
    dodgeChance += getModifierFromEquipment('dodgeChance', equipped);
    return dodgeChance;
  }

  const calculateDamage = (strength, equipped, enemyArmour = 0) => {
    let damage = baseStats.damage;
    damage += strength;
    damage += getModifierFromEquipment('damage', equipped);
    damage -= enemyArmour;
    return damage > 0 ? damage : 1;
  }

  const calculateMana = (wizdom, equipped) => {
    let mana = baseStats.mana;
    mana += wizdom * 2;
    mana += getModifierFromEquipment('mana', equipped);
    return mana;
  }

  const generateStats = (attributes, equipped) => {
    const hitChance = calculateHitChance(attributes.dexterity, equipped);
    const critChance = calculateCritChance(attributes.dexterity, equipped);
    const critMultiplier = calculateCritMultiplier(attributes.agility, equipped);
    const dodgeChance = calculateDodgeChance(attributes.agility, equipped);
    const damage = calculateDamage(attributes.strength, equipped);
    const mana = calculateMana(attributes.wizdom, equipped);

    // mana: 5,
    // health: 10

    return {
      hitChance,
    }
  }

  const initiateHero = ({ attributes, equipped }) => {
    const listOfEquipment = Object.values(equipped).filter((piece) => {
      return piece != null;
    });

    const fullAttributes = applyAttributeModifiersFromEquipment(attributes, listOfEquipment);
    const stats = generateStats(fullAttributes, listOfEquipment);

    console.log(stats);
  }

  initiateHero(hero);

  const handleTurn = () => {
    console.log("turn handled");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleTurn}>Attack</button>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     socket: state.socket,
//     gameSession: state.gameSession
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     connectToSocket: connectToSocket(dispatch)
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Arena);

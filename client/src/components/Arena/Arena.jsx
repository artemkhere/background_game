import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// import { connectToSocket } from '../../actions/socketActions';

export default function Arena(props) {
  const baseStats = {
    hitChance: 0.75,
    critChance: 0.05,
    critMultiplier: 1.5,
    dodgeChance: 0.1,
    damage: 1,
    mana: 5,
    spells: 1,
    health: 10
  };

  const heroModel = {
    attributes: {
      dexterity: 3, // hit chance, crit chance
      agility: 3, // dodge chance, crit dmg multiplier
      intellect: 3, // spell requirements, spell effect
      stamina: 5, // amount of health
      wizdom: 3, // amount of mana, amount of spells
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
    damage += Math.floor(Math.random() * Math.ceil(strength / 3));
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

  const calculateSpells = (wizdom, equipped) => {
    let spells = baseStats.spells;
    spells += Math.floor(wizdom / 3);
    spells += getModifierFromEquipment('spells', equipped);
    return spells;
  }

  const calculateHealth = (stamina, equipped) => {
    let health = baseStats.health;
    health += stamina * 2;
    health += getModifierFromEquipment('health', equipped);
    return health;
  }

  const generateStats = (attributes, equipped) => {
    const hitChance = calculateHitChance(attributes.dexterity, equipped);
    const critChance = calculateCritChance(attributes.dexterity, equipped);
    const critMultiplier = calculateCritMultiplier(attributes.agility, equipped);
    const dodgeChance = calculateDodgeChance(attributes.agility, equipped);
    const damage = calculateDamage(attributes.strength, equipped);
    const mana = calculateMana(attributes.wizdom, equipped);
    const spells = calculateSpells(attributes.wizdom, equipped);
    const health = calculateHealth(attributes.stamina, equipped);

    return {
      hitChance,
      critChance,
      critMultiplier,
      dodgeChance,
      damage,
      mana,
      spells,
      health
    }
  }

  const initiateCharacter = ({ attributes, equipped }) => {
    const listOfEquipment = Object.values(equipped).filter((piece) => {
      return piece != null;
    });

    const fullAttributes = applyAttributeModifiersFromEquipment(attributes, listOfEquipment);
    const stats = generateStats(fullAttributes, listOfEquipment);

    return {
      attributes: fullAttributes,
      stats,
      equipped: listOfEquipment
    };
  }

  const [hero, setHero] = useState(initiateCharacter(heroModel));
  const [enemy, setEnemy] = useState(initiateCharacter(heroModel));
  const [turn, setTurn] = useState(1);
  const [log, setLog] = useState('');

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {});

  const getAttackResult = (attacker, defender) => {
    console.log(Math.random())
    const attackHits = Math.random() <= calculateHitChance(
      attacker.attributes.dexterity,
      attacker.equipped,
      defender.attributes.agility
    );

    if (!attackHits) {
      return {
        logUpdate: log + "Attacker missed. ",
        damage: 0
      };
    }

    const enemyDodges = Math.random() <= calculateDodgeChance(
      defender.attributes.agility,
      defender.equipped,
      attacker.attributes.dexterity
    );

    if (enemyDodges) {
      return {
        logUpdate: log + "Defender dodges. ",
        damage: 0
      };
    }

    const criticalHit = Math.random() <= calculateCritChance(
      attacker.attributes.dexterity,
      attacker.equipped
    );

    let damage = calculateDamage(
      attacker.attributes.strength,
      attacker.equipped
    );
    let logUpdate = '';

    if (criticalHit) {
      damage = damage * calculateCritMultiplier(attacker.attributes.agility, attacker.equipped);
      logUpdate = logUpdate + "CRITICAL! ";
    }

    return {
      logUpdate: logUpdate + `Attacker deals ${damage} damage. `,
      damage
    };
  }

  const handleHeroAction = (source, target, action, specialMove) => {
    switch(action) {
      case 'attack':
        const { logUpdate, damage } = getAttackResult(source, target);
        const udpatedEnemy = {...enemy};
        udpatedEnemy.stats.health -= damage;
        setEnemy(udpatedEnemy);
        console.log("HERO: " + logUpdate)
        setLog(log + logUpdate);
        break;
      default:
        console.log("Unknown move");
        return "Unknown move";
    }
  }

  const handleEnemyAction = (source, target, action, specialMove) => {
    switch(action) {
      case 'attack':
        const { logUpdate, damage } = getAttackResult(source, target);
        const udpatedHero = {...hero};
        udpatedHero.stats.health -= damage;
        setHero(udpatedHero);
        console.log("ENEMY: " + logUpdate)
        setLog(log + logUpdate);
        break;
      default:
        console.log("Unknown move");
        return "Unknown move";
    }
  }

  const handleTurn = (heroAction) => {
    return () => {
      setLog("Next turn");

      handleHeroAction(hero, enemy, heroAction);
      handleEnemyAction(enemy, hero, 'attack');

      if (hero.stats.health <= 0) {
        hero.stats.health = 0;
        setLog('Hero lost!')
      }

      if (enemy.stats.health <= 0) {
        hero.stats.health = 0;
        setLog('Hero won!')
      }
    }
  }

  const renderHero = () => {
    // const attributes = Object.keys(hero.attributes).map((attName) => {
    //   return <li>{attName}: {hero.attributes[attName]}</li>
    // });
    const stats = Object.keys(hero.stats).map((statName) => {
      return <li>{statName}: {hero.stats[statName]}</li>
    });

    return (
      <div>
        <h3>Hero:</h3>
        <br />
        <h5>Stats</h5>
        <ul>{stats}</ul>
      </div>
    );
  }

  const renderEnemy = () => {
    // const attributes = Object.keys(enemy.attributes).map((attName) => {
    //   return <li>{attName}: {enemy.attributes[attName]}</li>
    // });
    const stats = Object.keys(enemy.stats).map((statName) => {
      return <li>{statName}: {enemy.stats[statName]}</li>
    });

    return (
      <div style={{ textAlign: 'right' }}>
        <h3>Enemy:</h3>
        <br />
        <h5>Stats</h5>
        <ul>{stats}</ul>
      </div>
    );
  }

  // combat process

  return (
    <div>
      {hero.attributes && hero.stats && renderHero()}
      <h2 style={{ textAlign: 'center' }}>Log</h2>
      <p style={{ textAlign: 'center' }}>{log}</p>
      <button onClick={handleTurn('attack')}>Attack</button>
      {enemy.attributes && enemy.stats && renderEnemy()}
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

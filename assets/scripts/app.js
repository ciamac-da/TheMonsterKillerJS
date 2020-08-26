
const ATTACK_VALUE = 50; // Player hits the Monster
const STRONG_ATTACK_VALUE = 10; // Super hit! They gonna hit each other
const MONSTER_ATTACK_VALUE = 25; // Monster hits the player back!
//const STRONG_MONSTER_ATTACK_VALUE = 20; I think I don't need it anymore!
const HEAL_VALUE = 17; // HEAL the Player!

//I've made this constants avoiding typo!
const MODE_ATTACK = "ATTACK"; //MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; //STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME-OVER";


// This is how to set max life!
const enteredValue = prompt("Maximum life for Warrior and the Monster", "100"); 

//let chosenMaxLife = 100; Don't need it anymore!
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if(isNaN(chosenMaxLife || chosenMaxLife <= 0 || chosenMaxLife > 100)){
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);


function writeToLog(ev, val,  playerHealth, monsterHealth ){
 let logEntry = {
    event: ev,
    value: val,
    finalWarriorHealth: playerHealth,
    finalMonsterHealth: monsterHealth,
  };
  if(ev === LOG_EVENT_PLAYER_ATTACK){
 logEntry.target = "MONSTER";
  } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
 logEntry.target = "MONSTER";
  } else if(ev === LOG_EVENT_PLAYER_HEAL){
 logEntry.target = "PLAYER";
  } else if(ev === LOG_EVENT_GAME_OVER){
 logEntry
  }
  battleLog.push(logEntry);
}




function reset(){
  currentPlayerHealth = chosenMaxLife
  currentPlayerHealth = chosenMaxLife
  resetGame(chosenMaxLife)
}


function endRound(){
  const initialPlayerHealth = currentPlayerHealth
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
   currentPlayerHealth -= playerDamage;
   writeToLog(
     LOG_EVENT_MONSTER_ATTACK, 
     playerDamage, 
     currentPlayerHealth,
     currentMonsterHealth, 
      );

if(currentPlayerHealth <= 0 && hasBonusLife){
  removeBonusLife();
  currentPlayerHealth = initialPlayerHealth
  alert("Warrior would be dead but the bonus life saved him/her!")
  setPlayerHealth(chosenMaxLife)
}


if( currentMonsterHealth <= 0  && currentPlayerHealth > 0 ){
  alert("Warrior won!")
  writeToLog(
    LOG_EVENT_GAME_OVER,
    "  WARRIOR WON",
    currentPlayerHealth,
    currentMonsterHealth
  )
} else if( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
  alert("  Monster won!")
  writeToLog(
    LOG_EVENT_GAME_OVER,
    "MONSTER WON",
    currentPlayerHealth,
    currentMonsterHealth
  )
} else if( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ){
  alert("  WTF A DRAW!")
  reset()
  writeToLog(
    LOG_EVENT_GAME_OVER,
    "  BLOODY HELL!DRAW! BUT HOW?:)",
    currentPlayerHealth,
    currentMonsterHealth
  )
}
if(
  currentMonsterHealth <= 0  && currentPlayerHealth > 0 ||  
  currentPlayerHealth <= 0 && currentMonsterHealth > 0 || 
  currentMonsterHealth <= 0 && currentPlayerHealth <= 0 
  ){
  reset()
}
}


function attackMonster(mode){
  let maxDamage;
  let logEvent;
if(mode === MODE_ATTACK){
  maxDamage = ATTACK_VALUE;
  logEvent = LOG_EVENT_PLAYER_ATTACK;
}else if(mode === MODE_STRONG_ATTACK){
  maxDamage = STRONG_ATTACK_VALUE;
  logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
}

const damage = dealMonsterDamage(ATTACK_VALUE);
currentMonsterHealth -= damage;
writeToLog(
  logEvent,
  damage,
  currentPlayerHealth,
  currentMonsterHealth
)
endRound()
}


function attackHandler() {
  attackMonster(MODE_ATTACK)
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK)
}

function healPlayerHandler(){
  let healValue;
  if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
    alert("You can't heal more than Warrior´s maximux initial health!")
    healValue = chosenMaxLife - currentPlayerHealth
  } else{
    healValue = HEAL_VALUE
  }
increasePlayerHealth(healValue);
currentPlayerHealth += healValue
writeToLog(
  LOG_EVENT_PLAYER_HEAL,
  healValue,
  currentPlayerHealth,
  currentMonsterHealth
)
endRound()
}

function printLogHandler(){
  console.log(battleLog);
  lastLog.innerText = 
  battleLog[battleLog.length-1].event + 
  battleLog[battleLog.length-1].value 
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
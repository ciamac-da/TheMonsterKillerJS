const ATTACK_VALUE = 15; 
const STRONG_ATTACK_VALUE = 30; 
const MONSTER_ATTACK_VALUE = 20; 
//const STRONG_MONSTER_ATTACK_VALUE = 20; Bestimmt brauche ich es nicht mehr!
const HEAL_VALUE = 17; 

// um typo zu vermeiden!
const MODE_ATTACK = "ATTACK"; //MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; //STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME-OVER";


// Ich setze das Leben auf Maximal
const enteredValue = prompt("Maximum life for Warrior and the Monster", "100"); 

//let chosenMaxLife = 100; Vllt brauch ich es nicht mehr!
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if(isNaN(chosenMaxLife) || chosenMaxLife <= 0 || chosenMaxLife > 100){
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
 // if(ev === LOG_EVENT_PLAYER_ATTACK){
 //logEntry.target = "MONSTER";
 // } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
 //logEntry.target = "MONSTER";
 // } else if(ev === LOG_EVENT_PLAYER_HEAL){
 //logEntry.target = "PLAYER";
 // } else if(ev === LOG_EVENT_GAME_OVER){
 //logEntry
 // }

 // Using switch would be cleaner instead of if /else if
switch(ev){
  
  case LOG_EVENT_PLAYER_ATTACK:
  logEntry.target = "MONSTER";
  break;
  
  case LOG_EVENT_PLAYER_STRONG_ATTACK:
    logEntry.target = "MONSTER"
    break;

  case LOG_EVENT_PLAYER_HEAL:
    logEntry.target = "PLAYER";
    break;

    case LOG_EVENT_GAME_OVER:
      logEntry
      break;
      default:
      logEntry = {}
}
  battleLog.push(logEntry);
}




function reset(){
  currentMonsterHealth = chosenMaxLife
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

  // Hmmm hier ist echt ernst!!:)
if(currentPlayerHealth <= 0 && hasBonusLife){
  hasBonusLife = false;
  removeBonusLife();
  currentPlayerHealth = initialPlayerHealth
  setPlayerHealth(initialPlayerHealth)
  alert("Warrior would be dead but the bonus life saved him/her!")
  currentPlayerHealth = chosenMaxLife 
  // Make the WARRIOR great again;))
  adjustHealthBarOfPlayer(currentPlayerHealth);
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
  alert("Monster won!")
  writeToLog(
    LOG_EVENT_GAME_OVER,
    " MONSTER WON",
    currentPlayerHealth,
    currentMonsterHealth
  )
} else if( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ){
  alert("  WTF A DRAW!")
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
  // much shorter and cleaner with turnary operator
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE ;
  const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK; 
  // let maxDamage;
 // let logEvent;
//  // Iw wanna comment this and use turnary operator
//if(mode === MODE_ATTACK){
//  maxDamage = ATTACK_VALUE;
//  logEvent = LOG_EVENT_PLAYER_ATTACK;
//}else if(mode === MODE_STRONG_ATTACK){
//  maxDamage = STRONG_ATTACK_VALUE;
//  logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
//}

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
    alert("You can't heal more than Warrior´s maximum initial health!")
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

// um das letzte Index zu zugreifen! Dementsprechend brauche ich davon nur event und value 
function printLogHandler(){
  console.log(battleLog);
  
  //for( i = 0 ; i < battleLog.length; i++){
  //  console.log(battleLog[i])
  //}
  
  // the same like previous for condition but this one is much shorter 
  // in this situation you dont know which index like previous , you just get access to element
  //for (const logEntry of battleLog){
  //  console.log(logEntry)
  //}
  lastLog.innerText = 
  battleLog[battleLog.length-1].event + 
  battleLog[battleLog.length-1].value 
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
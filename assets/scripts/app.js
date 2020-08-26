const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 25;
const MONSTER_ATTACK_VALUE = 10; 
//const STRONG_MONSTER_ATTACK_VALUE = 20; 
const HEAL_VALUE = 17; 


const MODE_ATTACK = "ATTACK"; //MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; //STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";



const enteredValue = prompt("Maximum life for you and the monster", "100"); 

//let chosenMaxLife = 100;
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if(isNaN(chosenMaxLife || chosenMaxLife <= 0 || chosenMaxLife > 100)){
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);


function writeToLog(ev, val,  monsterHealth, playerHealth ){
 let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
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
if(currentPlayerHealth <= 0 && hasBonusLife){
  removeBonusLife();
  currentPlayerHealth = initialPlayerHealth
  setPlayerHealth(initialPlayerHealth)
  alert("you would be dead but the bonus life saved you!")
}
if( currentMonsterHealth <= 0  && currentPlayerHealth > 0 ){
  alert("You won!")
  //reset()
} else if( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
  alert("Monster won!")
  //reset()
} else if( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ){
  alert("You have a draw!")
  //reset()
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
if(mode === MODE_ATTACK){
  maxDamage = ATTACK_VALUE
}else if(mode === MODE_STRONG_ATTACK){
  maxDamage = STRONG_ATTACK_VALUE
}

const damage = dealMonsterDamage(ATTACK_VALUE);
currentMonsterHealth -= damage;
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
    alert("You can't heal more than your max initial health!")
    healValue = chosenMaxLife - currentPlayerHealth
  } else{
    healValue = HEAL_VALUE
  }
increasePlayerHealth(healValue);
currentPlayerHealth += healValue
endRound()
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
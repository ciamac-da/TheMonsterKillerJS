const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 25;
const MONSTER_ATTACK_VALUE = 10; 
//const STRONG_MONSTER_ATTACK_VALUE = 20; 
const HEAL_VALUE = 17; 

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);

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
} else if( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
  alert("Monster won!")
} else if( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ){
  alert("You have a draw!")
}
}


function attackMonster(mode){
  let maxDamage;
if(mode === "ATTACK"){
  maxDamage = ATTACK_VALUE
}else if(mode === "STRONG_ATTACK"){
  maxDamage = STRONG_ATTACK_VALUE
}

const damage = dealMonsterDamage(ATTACK_VALUE);
currentMonsterHealth -= damage;
endRound()
}


function attackHandler() {
  attackMonster("ATTACK")
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK")
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
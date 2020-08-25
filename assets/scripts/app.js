const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 25;
const MONSTER_ATTACK_VALUE = 10; 
//const STRONG_MONSTER_ATTACK_VALUE = 20; 

const HEAL_VALUE = 17; 

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(mode){

  let maxDamage;
if(mode === "ATTACK"){
  maxDamage = ATTACK_VALUE
}else if(mode === "STRONG_ATTACK"){
  maxDamage = STRONG_ATTACK_VALUE
}

const damage = dealMonsterDamage(ATTACK_VALUE);
currentMonsterHealth -= damage;
const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
currentPlayerHealth -= playerDamage;
if( currentMonsterHealth <= 0  && currentPlayerHealth > 0 ){
  alert("You won!")
} else if( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
  alert("Monster won!")
} else if( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ){
  alert("You have a draw!")
}
}


function attackHandler() {
  attackMonster("ATTACK")
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK")
}

function healPlayerHandler(){

}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
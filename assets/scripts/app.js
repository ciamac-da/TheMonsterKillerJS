const ATTACK_VALUE = 10;
const MOSTER_ATTACK_VALUE = 10; 

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MOSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if( currentMonsterHealth <= 0  && currentPlayerHealth > 0 ){
    alert("You won!")
  } else if( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
    alert("Monster won!")
  } else if( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ){
    alert("Draw!")
  }
}

attackBtn.addEventListener('click', attackHandler);
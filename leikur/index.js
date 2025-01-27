const canvasGame = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
const cash = document.getElementById("cash")

let playerWidth = 40;
let playerHeight = 60;
let enemyWidth = 20*1.5;
let enemyHeight = 30*1.5;
let skatturWidth = 30;
let skatturHeight = 30;
let cashWidth = 30;
let cashHeight = 30;

let x0 = canvas.width/2 - playerWidth/2;
let y0 = canvas.height/2 - playerHeight/2;
let speed = 1; //breyta þessu
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let playerPlacement = [{x: (x0), y: (y0)}];
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = 0;
// Vertical velocity
let dy = 0;
let keyPressed = 0;
let skattur_x = Math.floor(Math.random()*(canvas.width-playerWidth));
let skattur_y = Math.floor(Math.random()*(canvas.height-playerHeight));
let enemy_x = Math.floor(Math.random()*(canvas.width-playerWidth));
let enemy_y = Math.floor(Math.random()*(canvas.height-playerHeight));
let cash_x = Math.floor(Math.random()*(canvas.width-playerWidth));
let cash_y = Math.floor(Math.random()*(canvas.height-playerHeight));

let skatt_add_increment = 2000;
let skatt_count = 0;
let start_time = Date.now();
let skatturList = [];

let enemy_add_increment = 2000;
let enemy_count = 0;
let enemyList = [];

let cash_add_increment = 2000;
let cash_count = 0;
let cashList = [];

//Game Loop


//taka þessa af til að starta leiknum
function drawGame(){
    ctx.drawImage(background,0,0,canvas.width+2,canvas.height+1);
    
    ctx.drawImage(playerImage, 0,0, playerImage.width, playerImage.height, playerPlacement[0].x, playerPlacement[0].y, playerWidth,playerHeight);
    
    //skatturinn/maturinn poppar upp - drepur þig
    skatt_count += 16.67*0.4;
    inputs();

    if (skatt_count > skatt_add_increment){
  
    createSkatt();
    skatt_count=0;
    
    }
    updateSkatturPositions();
    
    
    //vondi kall poppar upp - enemy lætur þig fara hraðar
    enemy_count += 16.67*0.2;
    inputs();

    if (enemy_count > enemy_add_increment){
  
        createEnemy();
        enemy_count=0;
        
        }
        updateEnemyPositions();
    
    //cash poppar upp - gefur þér stig
    cash_count += 16.67*2;
    inputs();

    if (cash_count > cash_add_increment){
  
        createCash();
        cash_count=0;
        
        }
        updateCashPositions();
    
    requestAnimationFrame(drawGame);
}


//býr til nýjan skatt/mat - MAX 8
function createSkatt() {
    if  (skatturList.length < 8){
    const newSkattur = {
      x: skattur_x,
      y: skattur_y
    };
    skatturList.push(newSkattur);
    skattur_x = Math.floor(Math.random()*(canvas.width-playerWidth));
    skattur_y = Math.floor(Math.random()*(canvas.width-playerHeight));
  }
  else if (skatturList.length >= 8)
    skatturList.shift()
}
//prentar ut mynd af skatt/mat
function updateSkatturPositions() {
    for (let i = 0; i < skatturList.length; i++) {
      const skattur = skatturList[i];
      ctx.drawImage(skatturImage, 0, 0, skatturImage.width, skatturImage.height, skattur.x, skattur.y, skatturWidth, skatturHeight);
    }}


    //býr til nýjan vondan kall - MAX 4
function createEnemy() {
    if  (enemyList.length < 4){
    const newEnemy = {
      x: enemy_x,
      y: enemy_y
    };
    enemyList.push(newEnemy);
    enemy_x = Math.floor(Math.random()*(canvas.width-playerWidth));
    enemy_y = Math.floor(Math.random()*(canvas.width-playerHeight));
  }
  else if (enemyList.length >= 4)
    enemyList.shift()
}
//prentar ut mynd af vondum kalli
function updateEnemyPositions() {
    for (let i = 0; i < enemyList.length; i++) {
      const enemy = enemyList[i];
      ctx.drawImage(enemyImage, 0, 0, enemyImage.width, enemyImage.height, enemy.x, enemy.y, enemyWidth, enemyHeight);
    }}

//býr til nýjan cash - MAX 10
function createCash() {
    if  (cashList.length < 10){
    const newCash = {
      x: cash_x,
      y: cash_y
    };
    cashList.push(newCash);
    cash_x = Math.floor(Math.random()*(canvas.width-playerWidth));
    cash_y = Math.floor(Math.random()*(canvas.width-playerHeight));
  }
  else if (cashList.length >= 10)
    cashList.shift()
}
//prentar ut mynd af cash
function updateCashPositions() {
    for (let i = 0; i < cashList.length; i++) {
      const cash = cashList[i];
      ctx.drawImage(cashImage, 0, 0, cashImage.width, cashImage.height, cash.x, cash.y, cashWidth, cashHeight);
    }}

//hreyfingar kallsins
function inputs(){
    const goingUp = dy === -speed;
    const goingDown = dy === speed;
    const goingRight = dx === speed;  
    const goingLeft = dx === -speed;
    //upp
    if(upPressed && !goingDown){
        dx = 0;
        dy = -speed;
    }
    //niður
    if(downPressed && !goingUp){
        dx = 0;
        dy = speed;
    }
    //vinstri
    if(leftPressed && !goingRight){
        dx = -speed;
        dy = 0;
    }
    //hægri
    if(rightPressed && !goingLeft){
       dx = speed;
       dy = 0;
    }
    playerPlacement[0].x += dx;

    playerPlacement[0].y += dy;

}


//myndir leikmanna og bakgrunnur
const playerImage = new Image();
playerImage.src = "images/Johann.jpg";
const background = new Image();
background.src = "images/X-Jóhann í gjaldkera.jpg";
const enemyImage = new Image();
enemyImage.src = "images/gudjon.jpg";
const skatturImage = new Image();
skatturImage.src = "images/skattur.jpg"
const cashImage = new Image();
cashImage.src = "images/cash.jpg"
 
document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

function keyDown(event){
    keyPressed = event.keyCode;
    //upp
    if(event.keyCode == 38){
        upPressed = true;
    }
    //niður
    if(event.keyCode == 40){
        downPressed = true;
    }
    //vinstri
    if(event.keyCode == 37){
        leftPressed = true;
    }
    //hægri
    if(event.keyCode == 39){
        rightPressed = true;
    }

}

function keyUp(event){
    //upp
    if(event.keyCode == 38){
        upPressed = false;
    }
    //niður
    if(event.keyCode == 40){
        downPressed = false;
    }
    //vinstri
    if(event.keyCode == 37){
        leftPressed = false;
    }
    //hægri
    if(event.keyCode == 39){
        rightPressed = false;
    }

}


drawGame(); 
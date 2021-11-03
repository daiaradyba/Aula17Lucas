//cria variavel

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var gover;
var img_gover;
var restart;
var img_restart;
var seleciona;
//se apertar para cima, quero destruir todos meus elementos 
var pontuacao = 0;

var estadodejogo = "JOGAR";

var novaimagem;
var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;

var grupodenuvens;
var grupodeobstaculos;

var somjump;
var somdie;
var somcheck;

//colocar os arquivos
function preload(){
  trex_correndo =loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
   
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  
  img_gover = loadImage("gameOver.png");
  img_restart = loadImage("restart.png");
  
  somjump = loadSound("jump.mp3");
  somdie = loadSound("die.mp3");
  somcheck = loadSound("checkPoint.mp3");
  
}
//criar as sprites

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided",trex_colidiu)
  trex.scale = 0.5;
  
  
  gover = createSprite(300,100,300,20);
  gover.addImage(img_gover);
  gover.scale=0.5
  gover.visible = false;
  
  restart = createSprite(300,140,300,20);
  restart.addImage(img_restart);
  restart.scale=0.5
  restart.visible = false;
  
  
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  grupodenuvens = new Group();
  grupodeobstaculos = new Group();
  
  
  
  
  

}

function draw() {
    background(180);
    text("Pontuação:"+pontuacao,500,30);
  
       
  //fazer o dino colidir no solo invisivel
  trex.collide(soloinvisivel);
  if(estadodejogo==="JOGAR"){
    pontuacao = pontuacao +5;
    solo.velocityX = -4-pontuacao/400;
    grupodeobstaculos.setVelocityXEach(-4-pontuacao/400);
     if(pontuacao % 1000  ===  0){
    somcheck.play();  
      }
    
    //fazer o  dino pular quando apertar a barra de espaço e ter gravidade
  if(keyDown("space") && trex.y>=100) {
    trex.velocityY = -10;
     somjump.play();
            
  }
    //fazer ele correr
  trex.velocityY = trex.velocityY + 0.8
  //fazer o solo se repitir e mover
  if (solo.x < 0){
    solo.x = solo.width/2;
  }
   //gerar as nuvens
  gerarNuvens();
  //gerar os cactos ou obstaculos em geral
  gerarObstaculo(); 
    
  
    
    if(grupodeobstaculos.isTouching(trex)){
      estadodejogo = "ENCERRAR";
      somdie.play();
      //trex.velocityY = -10;
    //somjump.play();
       

      
    }
      
    
  }
  if(estadodejogo ==="ENCERRAR"){
  
    solo.velocityX = -0;
    grupodenuvens.setVelocityXEach(0);
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setLifetimeEach(-1);
    grupodeobstaculos.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_colidiu);
    gover.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
    reset();
    }
    
    
  }

  //criar pontuação
  
  
  /*if(keyDown("up")){
   grupodeobstaculos.destroyEach();
   grupodenuvens.destroyEach();
  }*/
  
  
  //fazer o  dino pular quando apertar a barra de espaço e ter gravidade
  //if(keyDown("space") && trex.y>=100) {
   // trex.velocityY = -10;
 // }
  
  
  
  drawSprites();
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem)
    nuvem.y = Math.round(random(35,100))
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;
    nuvem.lifetime = 200;
    //ajustando a profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;
    gover.depth = trex.depth + 1;    
    grupodenuvens.add(nuvem);
    }
}

function gerarObstaculo() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    obstaculo = createSprite(600,165,40,10);
    seleciona = Math.round(random(1,6))
    //var seleciona = 6;
   //fazer os obstaculos aparecerem aleatoriamente
    switch(seleciona){
      case 1:  obstaculo.addImage(ob1);
        break;
        case 2: obstaculo.addImage(ob2);
        break;
        case 3:  obstaculo.addImage(ob3);
        break;
        case 4: obstaculo.addImage(ob4);
        break;
        case 5:  obstaculo.addImage(ob5);
        break;
        case 6: obstaculo.addImage(ob6);
        break;
    }
   //velocidade dos cactos,tempo de vida e escala
    obstaculo.velocityX = -3;
    obstaculo.lifetime = 200;
    obstaculo.scale=0.65;
    grupodeobstaculos.add(obstaculo);
    restart.depth =obstaculo.depth
    obstaculo.depth = restart.depth - 1;    
 

    }
}

function reset(){
 //estado de jogo deve voltar para jogar 
  //fazer o botão do restar ficar invisivel
}

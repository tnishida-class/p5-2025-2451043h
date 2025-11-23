// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

 if(keyIsDown(LEFT_ARROW)){ x -= 5; }
 if(keyIsDown(RIGHT_ARROW)){ x += 5; }
 if(keyIsDown(UP_ARROW)){ y -= 5; }
 if(keyIsDown(DOWN_ARROW)){ y += 5; }
 if (keyIsDown("S".charCodeAt(0))) {
  if (keyIsDown(LEFT_ARROW))  x -= 10;
  if (keyIsDown(RIGHT_ARROW)) x += 10;
}// BLANK[1] キャラクターの左右移動

  vy += g;
  if(keyIsDown(" ".charCodeAt(0)) && y>= groundY - size / 2 ){ vy = -20; } 
  else if(y >= groundY - size / 2){y = groundY - size /2; vy = 0}// BLANK[2] 重力とジャンプ 円の座標は円の中心で表される→円の下を地面と合わせるには上方向に半径分動かす必要がある。

  // 速くなりすぎないように制限
 
  vy = constrain(vy, -20, 20);

  // 位置を更新
  
  y += vy;

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}
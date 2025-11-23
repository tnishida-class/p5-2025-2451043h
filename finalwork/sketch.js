// 2D アニメーションゲームのようなインタラクション
let x, y;
let vy;
const g = 1;

let playerSize;     // プレイヤーの大きさ
let enemies = [];   // 敵ボール
let gameOver = false;
let cleared = false;
const groundRatio = 0.8; // 地面の高さ

function setup(){
  createCanvas(windowWidth, windowHeight);

  x = width / 2;
  y = height / 2;
  vy = 0;
  playerSize = height * 0.1;
  gameOver = false;
  cleared = false;

  enemies = [];
  for (let i = 0; i < 5; i++) {
    enemies.push({
      x: random(width),
      y: random(height * 0.6),
      r: random(20, 80),
      vx: random(-3, 3),
      vy: random(-3, 3)
    });
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const groundY = height * groundRatio;

  // 地面
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  const size = playerSize;

  // --- ゲームオーバー時 ---
  if(gameOver){
    textSize(60);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("GAME OVER", width/2, height/2);
    return; // ゲーム更新停止
  }

  // --- クリア時 ---
  if(cleared){
    textSize(60);
    textAlign(CENTER, CENTER);
    fill(0, 255, 0);
    text("CLEAR!!", width/2, height/2);
    return; // ゲーム更新停止
  }

  // プレイヤー操作
  if(keyIsDown(LEFT_ARROW))  x -= 5;
  if(keyIsDown(RIGHT_ARROW)) x += 5;
  if(keyIsDown(UP_ARROW))    y -= 5;
  if(keyIsDown(DOWN_ARROW))  y += 5;

  if (keyIsDown("S".charCodeAt(0))) {
    if (keyIsDown(LEFT_ARROW))  x -= 10;
    if (keyIsDown(RIGHT_ARROW)) x += 10;
  }

  // 重力とジャンプ
  vy += g;
  if(keyIsDown(" ".charCodeAt(0)) && y >= groundY - size/2){
    vy = -20;
  } else if(y >= groundY - size/2){
    y = groundY - size/2;
    vy = 0;
  }
  vy = constrain(vy, -20, 20);
  y += vy;

  // --- 敵の動きと描画 ---
  for (let e of enemies){
    e.x += e.vx;
    e.y += e.vy;

    if(e.x - e.r < 0 || e.x + e.r > width) e.vx *= -1;
    if(e.y - e.r < 0) e.vy *= -1;
    if(e.y + e.r > groundY){
      e.y = groundY - e.r;
      e.vy *= -1;
    }

    fill(255, 100, 100);
    ellipse(e.x, e.y, e.r*2);
  }

  // 衝突判定
  for(let i = enemies.length - 1; i >= 0; i--){
    let e = enemies[i];
    let d = dist(x, y, e.x, e.y);

    if(d < size/2 + e.r){
      if(size/2 > e.r){
        // 吸収
        playerSize += e.r * 0.3;
        enemies.splice(i, 1);
      } else {
        // 敵が大きい → ゲームオーバー
        gameOver = true;
      }
    }
  }

  // クリアチェック
  if(enemies.length === 0){
    cleared = true;
  }

  // プレイヤー描画
  fill(0);
  ellipse(x, y, size, size);
}
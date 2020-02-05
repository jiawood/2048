let canvas = document.getElementById("canvas")
let canvasText = canvas.getContext("2d")
let currScore = document.getElementById("score")
let highscore = document.getElementById("highscore")
let newGameBtn = document.getElementById("new-game")
let gameEnd = document.getElementById("gameEnd")
let tryAgainBtn = document.getElementById("try-again")

let score = 0
let highScore = 0
let gameLost = false
let cells = []

startGame()

function cell(row,col){
  this.value = 0
  this.x = 7.5 + 125 * col
  this.y = 7.5 + 125 * row
}

function canvasClean(){
  canvasText.clearRect(0,0,500,500)
}

function createCells(){
  for(var i=0;i<4;i++){
    cells[i] = []
    for(var j=0;j<4;j++){
      cells[i][j] = new cell(i,j)
    }
  }
}

function drawCell(cell){
  canvasText.beginPath()
  canvasText.rect(cell.x,cell.y,110,110)
  switch(cell.value){
    case 0    : canvasText.fillStyle = "#efefdf";
    break;
    case 2    : canvasText.fillStyle = '#dbd6d6';
      break;
    case 4    : canvasText.fillStyle = '#ede0c8';
      break;
    case 8    : canvasText.fillStyle = '#f2b179';
      break;
    case 16   : canvasText.fillStyle = '#f59563';
      break;
    case 32   : canvasText.fillStyle = "#f67c5f";
      break;
    case 64   : canvasText.fillStyle = '#f65e3b';
      break;
    case 128  : canvasText.fillStyle = '#edcf72';
      break;
    case 256  : canvasText.fillStyle = '#edcc61';
      break;
    case 512  :	canvasText.fillStyle = '#edc850';
      break;
    case 1024 : canvasText.fillStyle = "#edc53f";
      break;
    case 2048 : canvasText.fillStyle = '#edc22e';
      break;
  }
  canvasText.fill()
  if(cell.value){
    canvasText.fontSize = "50px"
    canvasText.fillStyle = "black"
    canvasText.textAligh = "center"
    canvasText.fillText(cell.value,cell.x + 55,cell.y + 55)
  }
}

function drawCells(){
  for(let i = 0;i<4;i++){
    for(let j = 0;j<4;j++){
      drawCell(cells[i][j])
    }
  }
}

function finishGame(){
  gameLost = true
  highScore = score
  canvas.style.display = "inline-block"
  gameEnd.classList.remove("hide")

}

function direction(){
  let left = false
  let right = false
  let up = false
  let down = false
//left
  for(let i = 0;i<4;i++){
    for(let j = 0;j<3;j++){
      if(cells[i][j+1].value){
        let col_index = j+1
        while(col_index>=0){
          if(cells[i][col_index].value === cells[i][col_index-1].value){
            left = true
            return left
          }
          else{
            col_index--
          }
        }
      }
    }
  }
//right
  for(let i = 0;i<4;i++){
    for(let j = 3;j>0;j--){
      if(cells[i][j-1].value){
        let col_index = j-1
        while(col_index+1 < 4){
          if(cells[i][col_index].value === cells[i][col_index+1].value){
            right = true
            return right
          }
          else{
            col_index++
          }
        }
      }
    }
  }
//up
for(let j = 0;j<4;j++){
  for(let i = 0;i<3;i++){
    if(cells[i+1][j].value){
      let row_index = i+1
      while(row_index > 0){
        if(cells[row_index][j].value === cells[row_index - 1][j].value){
          up = true
          return up
        }
        else{
          col_index--
        }
      }
    }
  }
}
//down
for(let j = 0;j<4;j++){
  for(let i = 3;i>0;i--){
    if(cells[i-1][j].value){
      let row_index = i-1
      while(row_index + 1 < 4){
        if(cells[row_index][j].value === cells[row_index + 1][j].value){
          down = true
          return down
        }
        else{
          col_index++
        }
      }
    }
  }
}
return false
}


function pasteNewCells(event){
  while(1){
    let row = Math.floor(Math.random() * 4)
    let col = Math.floor(Math.random()* 4)
    if(!cells[row][col].value){
      cells[row][col].value = 2
      drawCells()
      break
    }
  }
  let freeCells = 0
  for(let i = 0;i < 4;i++){
    for(let j = 0;j < 4;j++){
      if(!cells[i][j].value){
        freeCells++
      }
    }
  }
  if(!freeCells){
    let dir = direction()
    if(!dir){
      finishGame()
      return
    }
  }
}


function startGame(){
  gameEnd.classList.add("hide")
  createCells()
  drawCells()
  pasteNewCells()
  pasteNewCells()
}

function newGameFunc(){
  if(score > highScore){
    highScore = score
  }
  highscore.innerHTML = "Best <br> " + highScore
  score = 0
  currScore.innerHTML = "Score <br>" + score

  gameLost = false
  canvasClean()
  startGame()
}


newGameBtn.addEventListener("click",newGameFunc)

document.addEventListener("keydown",function(event){
  if(!gameLost){
    if(event.keyCode === 37)
    moveLeft(37);
    else if(event.keyCode === 38)
    moveUp(38);
    else if(event.keyCode === 39)
    moveRight(39);
    else if(event.keyCode === 40)
    moveDown(40);
  }
  currScore.innerHTML = "Score <br>" + score
})


function moveLeft(event){
  let movedLeft = false
  for(var i = 0;i<4;i++){
    let doubledLeft = false
    for(let j = 0;j<3;j++){
      if(cells[i][j+1].value){
        let col_index = j + 1
        while(col_index - 1 >= 0){
          if(!cells[i][col_index - 1].value){
            movedLeft = true
            cells[i][col_index-1].value = cells[i][col_index].value
            cells[i][col_index].value = 0
            col_index--
          }
          else if(cells[i][col_index].value === cells[i][col_index-1].value && doubledLeft===false){
            movedLeft = true
            doubledLeft = true
            cells[i][col_index - 1].value *= 2
            score += cells[i][col_index-1].value
            cells[i][col_index].value = 0
            break
          }
          else{
            break
          }
        }
      }
    }
  }
  if(movedLeft)
  pasteNewCells(event)
}

function moveRight(event){
  let movedRight = false
  for(var i = 0;i<4;i++){
    let doubledRight = false
    for(let j = 3;j>0;j--){
      if(cells[i][j-1].value){
        let col_index = j - 1
        while(col_index + 1 < 4){
          if(!cells[i][col_index + 1].value){
            movedRight = true
            cells[i][col_index+1].value = cells[i][col_index].value
            cells[i][col_index].value = 0
            col_index++
          }
          else if(cells[i][col_index].value === cells[i][col_index+1].value && doubledRight===false){
            movedRight = true
            doubledRight = true
            cells[i][col_index + 1].value *= 2
            score += cells[i][col_index+1].value
            cells[i][col_index].value = 0
            break
          }
          else{
            break
          }
        }
      }
    }
  }
  if(movedRight)
  pasteNewCells(event)
}


function moveUp(event){
  let movedUp = false
  for(var j = 0;j<4;j++){
    let doubledUp = false
    for(let i = 0;i<3;i++){
      if(cells[i+1][j].value){
        let row_index = i + 1
        while(row_index  > 0){
          if(!cells[row_index - 1][j].value){
            movedUp = true
            cells[row_index - 1][j].value = cells[row_index][j].value
            cells[row_index][j].value = 0
            row_index--
          }
          else if(cells[row_index - 1][j].value === cells[row_index][j].value && doubledUp===false){
            movedUp = true
            doubledUp = true
            cells[row_index - 1][j].value *= 2
            score += cells[row_index - 1][j].value
            cells[row_index][j].value = 0
            break
          }
          else{
            break
          }
        }
      }
    }
  }
  if(movedUp)
  pasteNewCells(event)
}


// function moveDown(event){
//   let movedDown = false
//   for(var j = 0;j<4;j++){
//     let doubledDown = false
//     for(let i = 3;i>0;i--){
//       if(cells[i-1][j].value){
//         let row_index = i - 1
//         while(row_index  < 3){
//           if(!cells[row_index + 1][j].value){
//             movedDown = true
//             cells[row_index + 1][j].value = cells[row_index][j].value
//             cells[row_index][j].value = 0
//             row_index++
//           }
//           else if(cells[row_index + 1][j].value === cells[row_index][j].value && doubledDown===false){
//             movedDown = true
//             doubledDown = true
//             cells[row_index + 1][j].value *= 2
//             score += cells[row_index + 1][j].value
//             cells[row_index][j].value = 0
//             break
//           }
//           else{
//             break
//           }
//         }
//       }
//     }
//   }
//   if(movedDown)
//   pasteNewCells(event)
// }

function moveDown( event ){

  let movedDown = false;
  let boardSize = 4
  for( var j = 0; j<boardSize; j++ ){
      let doubledDown = false;

      for( var i = boardSize-1; i>0; i-- ){

          if( cells[i-1][j].value ){
              let row_index = i-1;

              while(row_index + 1 < boardSize){

                  //if the block is empty, simply swipe left
                  if( !cells[row_index + 1][j].value ){

                      movedDown = true;
                      //swipe left
                      cells[row_index + 1][j].value = cells[row_index][j].value;
                      //make the next block empty
                      cells[row_index][j].value = 0;
                      //for traversing the entire row
                      row_index++;
                  }

                  // if 2 consecutive blocks have same value
                  else if( cells[row_index][j].value === cells[row_index+1][j].value && doubledDown == false){
                      movedDown = true;
                      doubledDown = true;
                      //doubling up the value
                      cells[row_index+1][j].value *= 2;
                      //updating the score
                      score += cells[row_index + 1][j].value;
                      //updating the value of the right block
                      cells[row_index][j].value = 0;
                      break;
                  }

                  else{
                      // console.log('down');
                      break;
                  }
              }
          }
      }
  }
  if(movedDown)
      pasteNewCells( event );
}




function gameBoard(){
    const rows = 3;
    const columns = 3;
    let rounds=9;
    
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        
        for (let j = 0; j < columns; j++) {
          board[i].push('');
        }
      }
    const getBoard = () => board;
    const selectCell=(r,c,player)=>{

        if(!board[r][c]=="") return 0;

        board[r][c]=player.token;
    
         rounds--;
        if(rounds<6&& rounds>0){
            for (let i = 0; i < 3; i++) {
                const a = board[i][0];
                const b = board[i][1];
                const c = board[i][2];
        
                if (a != '' && a === b && b === c) {
                    alert(`${player.name} is the Winner`);
                    location.reload();

                }
            }
        
            // Checking columns
            for (let i = 0; i < 3; i++) {
                const a = board[0][i];
                const b = board[1][i];
                const c = board[2][i];
        
                if (a != '' && a === b && b === c) {
                    alert(`${player.name} is the Winner`);
                    location.reload();

                }
            }
        
            // Left Top to Bottom right diagonal
            const a = board[0][0];
            const b = board[1][1];
            const c = board[2][2];
                       
            if (a != '0' && a === b && b === c) {
                alert(`${player.name} is the Winner`);
                    location.reload();

            }  
            const x = board[0][2];
            const y = board[1][1];
            const z = board[2][0];
        
            if (x != '0' && x === y && y === z) {
                alert(`${player.name} is the Winner`);
                    location.reload();

            }  
        }
        
        else if(rounds===0){
            alert(`Draw`);
            location.reload();

        }
        return 1 ;
    }
    const printBoard=()=>{
        console.log(board);
    }
    return {getBoard, selectCell, printBoard};
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = gameBoard();
    const players = [
      {
        name: playerOneName,
        token: 'X'
      },
      {
        name: playerTwoName,
        token: "O"
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };
    const playRound = (r,c) => {
        // Drop a token for the current player
        
        if(!board.selectCell(r,c, getActivePlayer())) {
            console.log("Choose another Cell");
             return 0;
            }
        
        console.log(
            `Selecting ${getActivePlayer().name}'s token into cell  [${r}] [${c}]...`
          );
        switchPlayerTurn();
        printNewRound();
        return 1 ;
      };
      printNewRound();
      return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
      };
    
}

function screenController(){
    const game = gameController();
    const turnDiv =document.querySelector('.turn')
    const boardDiv = document.querySelector('.board');
    let cell;
    const updateScreen=()=>{
        turnDiv.textContent="";
     const activePlayer = game.getActivePlayer();
       
        turnDiv.textContent=`${activePlayer.name}'s Turn`
       const btText=(ap)=>{
            document.getElementById(`${parseInt(cell)}`).textContent= `${ap.token}`;

        }
       
         return {btText} 
    }
    function clickHandlerBoard(e) {
         cell = parseInt(e.target.value);
         const ap = game.getActivePlayer();
        console.log(cell);
        if (!cell) return;
        switch (cell) {
            case 1 : 
           if( game.playRound(0,0))
            updateScreen().btText(ap);
            break;
        case 2 :  
        if(game.playRound(0,1))
            updateScreen().btText(ap);

            break;
        case 3 :  
             if(game.playRound(0,2))
             updateScreen().btText(ap);

            
            break;
        case 4 :
            if(game.playRound(1,0))
            updateScreen().btText(ap);

            break;
        case 5 :
            if(game.playRound(1,1))
            updateScreen().btText(ap);

            
            break;
        case 6 :
            if(game.playRound(1,2))
            updateScreen().btText(ap);

            break;
        case 7 :
            if(game.playRound(2,0))
            updateScreen().btText(ap);

            break;
        case 8 :
            if(game.playRound(2,1))
            updateScreen().btText(ap);

            break;
        case 9 :
            if(game.playRound(2,2))
            updateScreen().btText(ap);

            break;
        
            default:
                console.log("def");
                break;
        }
        
        
            
        
        
        
        updateScreen();
      }
      boardDiv.addEventListener("click", clickHandlerBoard);
    
      // Initial render
      updateScreen();
    
      // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
    }
    
    screenController();

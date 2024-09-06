function gameBoard(){
    const rows = 3;
    const columns = 3;
    let rounds=9;
    
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        
        for (let j = 0; j < columns; j++) {
          board[i].push(0);
        }
      }
    const getBoard = () => board;
    const selectCell=(r,c,player)=>{

        if(board[r][c]!==0) return 0;

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
        token: "Y"
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
        
        if(!board.selectCell(r,c, getActivePlayer())) {console.log("Choose another Cell");
             return;}
        
        console.log(
            `Selecting ${getActivePlayer().name}'s token into cell  ${r ,c}...`
          );
        switchPlayerTurn();
        printNewRound();
        
      };
      printNewRound();
      return {
        playRound,
        getActivePlayer
      };
    
}
const game = gameController();
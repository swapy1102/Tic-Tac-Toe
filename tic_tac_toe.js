const player=(name,mark)=>{
    const getName=()=>name;
    const getMarker=()=>mark;
    const setName=(newName)=>name=newName;
    return {getName,getMarker,setName};
}
const gameBoard=(()=>{
    let gameOver=false;
    let board=[["","",""],["","",""],["","",""]];
    const player1=player("p1","X");
    const player2=player("p2","O");
    let turn=1;
    const getTurn=()=>turn;
    const nextTurn=()=>{
        return ++turn;
    }
    const whosTurn=()=>{
        if(turn%2==0){
            return player1;
        }
        return player2;
    }
    const checkWinner=(rowIndex,colIndex)=>{
        let curr_player=whosTurn();
        let symbol=curr_player.getMarker();
        let diagonalWin=((board[0][0]==symbol && board[1][1]==symbol && board[2][2]==symbol) || (board[2][0]==symbol && board[1][1]==symbol && board[0][2]==symbol));
        let rowWin = board[rowIndex].every(function(position) {  return position == symbol;  });
        let colWin = board.every(function(position) {  return position[colIndex] == symbol;  });
        return(rowWin || colWin || diagonalWin);
    }
    const reset=()=>{
        gameOver=true;
        for(i=0;i<board.length;i++){
            for(j=0;j<board[i].length;j++){
                board[i][j]="";
            }
        }
    }
    return (nextTurn,getTurn,whosTurn,checkWinner,reset);
})();
$("#grid").on("click",".grid-box",function(){
    let pos=$(this).attr("id");
    let row=parseInt(pos[0],10);
    let col=parseInt(pos[2],10);
    if(!gameOver && gameBoard.board[row][col]==""){
        gameBoard.board[row][col]=gameBoard.whosTurn().getMarker();
        $(this).innerHTML=gameBoard.whosTurn().getMarker();
        if(gameBoard.checkWinner(row,col)){
            alert(gameBoard.whosTurn() + "has won the game");
            gameBoard.gameOver=true;
        }
        else if(gameBoard.getturn()>=9){
            alert("This game is a Tie!");
            gameBoard.gameOver=true;
        }
        gameBoard.nextTurn();
    }
});
$("#reset-btn").click(function(){
    gameBoard.reset();
    for(i=0;i<$("#grid").children().length;i++){
        for(j=0;j<$("#grid").children()[i].children().length;j++){
            $("#grid").children()[i].children()[j].innerHTML="";
        }
    }
});


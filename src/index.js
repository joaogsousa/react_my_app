import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squareValues: Array(9).fill(null),
      lastValue:null
    };
  }


  handleClick(i){
    const winner = calculateWinner(this.state.squareValues);
    if(this.state.squareValues[i] == null && !winner){
      const newSquares = this.state.squareValues;
      if(this.state.lastValue == null || this.state.lastValue == 'o'){
          newSquares[i] = 'x';
          this.setState({squareValues:newSquares,
          lastValue:'x'})
      }else{
          newSquares[i] = 'o';
          this.setState({squareValues:newSquares,
          lastValue:'o'})
      }
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squareValues[i]}
    onClick={() => this.handleClick(i) } />;
  }

  render() {
    const winner = calculateWinner(this.state.squareValues);

    let myPlayer
    if(this.state.lastValue == null || this.state.lastValue == 'o'){
      myPlayer = 'x';
    }else{
      myPlayer = 'o';
    }
    let status = null;
    if(!winner){
        status = 'Next player: ' + myPlayer;
    }else{
        status = 'Winner: ' + winner;
    }


    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

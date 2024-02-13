import { useState , useEffect } from "react";

function Mybuttons({ value, onSquareClick }) {
  return <button onClick={onSquareClick}>{value}</button>;
}

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [bodyColor, setBodyColor] = useState("");

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleNewGame() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  }

  const updateGameStatus = () => {
    const calculatedWinner = calculateWinner(squares);
    setWinner(calculatedWinner);

    if (calculatedWinner) {
      setBodyColor(calculatedWinner === "X" ? "green" : "red");
    }
  };

  // useEffect to update game status when squares change
  useEffect(() => {
    updateGameStatus();
  }, [squares]);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="parent" style={{ backgroundColor: bodyColor }}>
        <h1>X-O Game </h1>
      </div>
      <div className="game">
        <div className="status">{status}</div>
        <div>
          <Mybuttons value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Mybuttons value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Mybuttons value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>

        <div>
          <Mybuttons value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Mybuttons value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Mybuttons value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>

        <div>
          <Mybuttons value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Mybuttons value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Mybuttons value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>

        {winner && (
            <h2 className="newgame" onClick={handleNewGame}>NewGame</h2>
        )}
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;

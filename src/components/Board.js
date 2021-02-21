import styled from 'styled-components';
import Square from './Square';

const Container = styled.div`
    height: ${({ boardSize }) => `${boardSize}px`};
    width: ${({ boardSize }) => `${boardSize}px`};

    display: flex;
    flex-direction: row;
    align-items: space-around;
    justify-content: center;
    flex-wrap: wrap;
`;

const Board = ({ squares, handleSquareClick }) => {
    const boardSize = 300;
    const squareSize = 300 / Math.sqrt(squares.length);

    return (
        <Container boardSize={boardSize}>
            {squares.map((symbol, i) => (
                <Square
                    squareSize={squareSize}
                    key={i}
                    onClick={() => { handleSquareClick(i); }}
                >
                    {symbol}
                </Square>
            ))}
        </Container>
    )
}

export default Board;
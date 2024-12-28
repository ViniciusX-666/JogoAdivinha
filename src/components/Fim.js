import "./Fim.css";

const Fim = ({reiniciar,score}) => {
  return (
    <div>
        <h1>Fim de jogo</h1>
        <h2>
          A sua pontuação foi:<span>{score}</span>
        </h2> 
        <button onClick={reiniciar}>Reiniciar o jogo</button>
    </div>
  )
}

export default Fim
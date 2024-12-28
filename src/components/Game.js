import "./Game.css";
import {useState,useRef} from "react";

const Game = ({verificar,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetterss,
    wrongLetterss,
    guesses,
    score}) => {

    const [letter,setLetter] = useState("");
    const letterInputRef = useRef(null);
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        verificar(letter);
        setLetter("");

        letterInputRef.current.focus();
    }
  return (
    <div className="game">
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra: </h1>
        <h3 className="tip">
            Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas</p>
        <div className="wordContainer">
            {letters.map((letter,i)=>(
                guessedLetterss.includes(letter)?(
                    <span key={i} className="blankSquare">{letter}</span>

                ):(
                    <span key={i} className="blankSquare"></span>
                )
            ))}            
        </div>
        <div className="letterContainer">
            <p>Tente advinhar uma letra da palavra: </p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="letter" maxLength={1} required onChange={(e)=>setLetter(e.target.value)} 
                value={letter} 
                ref={letterInputRef}/>
                <button>Jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras já utilizadas: </p>
            {wrongLetterss.map((letter,i)=>(
                guessedLetterss.includes(letter)?(
                    <span key={i}>{letter},</span>

                ):(
                    <span key={i}></span>
                )
            ))}     
        </div>
        {/* <button onClick={verificar}>finalizar jogo</button> */}
    </div>
  )
}

export default Game
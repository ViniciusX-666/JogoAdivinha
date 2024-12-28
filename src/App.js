// css
import './App.css';

//react
import {useCallback,useEffect,useState} from "react";

import {wordsList} from "./data/words";

//components
import Inicio from './components/Inicio';
import Game from './components/Game';
import Fim from './components/Fim';

const estagios = [
  {id:1,name:"start"},
  {id:2,name:"game"},
  {id:3,name:"end"},
];

function App() {

  const [gameStage,setGameStage] = useState(estagios[0].name);
  const [words] = useState(wordsList);

  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory,setPickedCategory] = useState("");
  const [letters,setletters] = useState([]);

  const [guessedLetterss,setGuessedLetterss] = useState([]);
  const [wrongLetterss,setWrongLetterss] = useState([]);
  const [guesses,setguesses] = useState(3);
  const [score,setScore] = useState(0);

  const pickedWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words)
    const category = 
    categories[Math.floor(Math.random()* Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random()* words[category].length)];

    return {word,category}
  },[words]);

  const startGame = useCallback(() =>{
    clearLetterStates();
    const {word,category} = pickedWordAndCategory();
    
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    
    setGameStage(estagios[1].name);

    setPickedWord(word);
    setPickedCategory(category);
    setletters(wordLetters);
  },[pickedWordAndCategory]);

  //process the letter input
  const verificar = (letter)=>{
    
    const normalizedLetter = letter.toLowerCase();
    if(guessedLetterss.includes(normalizedLetter) || wrongLetterss.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetterss((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    }else{
      setWrongLetterss((actualWrongLetters)=>[
        ...actualWrongLetters,normalizedLetter
      ]);

      setguesses((actualGuesses)=>actualGuesses-1);
    }
    // setGameStage(estagios[2].name);
  }

  const clearLetterStates = ()=> {
    setGuessedLetterss([]);
    setWrongLetterss([]);
  }

  useEffect(()=>{
    if(guesses<=0){
      clearLetterStates()
      setGameStage(estagios[2].name)
    }
  },[guesses]);

  useEffect(()=>{
    const uniqueLetters = [... new Set(letters)];

    if(guessedLetterss.length === uniqueLetters.length){
      setScore((actualScore)=> actualScore +=100);

      startGame();

    }

  },[guessedLetterss,letters,startGame]);

  // reiniciar
  const reiniciar = () =>{
    setScore(0);
    setguesses(3);
    setGameStage(estagios[0].name);

  }

  return (
    <div className="App">
       {gameStage === 'start' && <Inicio startGame={startGame}/>}
       {gameStage === 'game' && <Game verificar={verificar} 
       pickedWord={pickedWord} 
       pickedCategory={pickedCategory} 
       letters={letters}
       guessedLetterss={guessedLetterss}
       wrongLetterss={wrongLetterss}
       guesses={guesses}
       score={score}/>}
       {gameStage === 'end' && <Fim reiniciar={reiniciar} score={score}/>} 
        
    </div>
  );
}

export default App;

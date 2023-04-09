import React from "react"
import Die from "./Die"
import Button from './Button';
import Texts from './Texts';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';


export default function App() {


    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [txt_btn, setTxt_btn] = React.useState("Roll")
    
    React.useEffect(() =>{
        const allHeld = dice.every(die => die.isHeld)
        const firtValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firtValue)
        if (allHeld && allSameValue){
            setTenzies(true)
            setTxt_btn(prevState => prevState = "New game")
            console.log('You won!')
        }
    },[dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
   
    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map((die=>{
                return die.isHeld ?
                    die :
                    generateNewDie()
                }))
            )
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setTxt_btn('Roll')
        }
        
    }
    
    function holdDice(id){
        setDice(oldDice => oldDice.map((die=>{
            return die.id === id ?
                {...die, isHeld: !die.isHeld}
                : die
        }))
        )
    }
    
    
    const diceElements = dice.map(die => {
        return( 
            <Die 
                Key={die.id} 
                value={die.value} 
                isHeld={die.isHeld} 
                holdDice={()=>holdDice(die.id)} 
            />)
    })
    
    return (
        <main className="page">
            {tenzies && <Confetti />}
            <Texts />
            <div className="dice-container">
                {diceElements}
            </div>
            <Button 
                handleOnClick={rollDice}
                tenzies = {txt_btn}
            />
        </main>
    )
}
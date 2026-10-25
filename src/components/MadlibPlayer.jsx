import { useState } from "react";
import { parseTemplate } from "../utils/madlib";


export default function MadLibPlayer({template}){
    const parts = parseTemplate(template.text)
    // should produce a list with two-three attributes: type, value, and index if it's a blank
    const blanks = parts.filter((p) => p.type === 'blank')

    // fill the answers with blanks
    const [answers, setAnswers] = useState(() => Array(blanks.length).fill(''))
    const [showStory, setShowStory] = useState(false)

    // this will be handled upon each letter change
    // takes in the index of typed box 
    function handleChange(index, value) {
        // function takes the current answer and returns as the new state
        // maps through each item and builds an array
        setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)))
    }

    //reseett!!
    function playAgain() {
        setAnswers(Array(blanks.length).fill(''))
        setShowStory(false)
    }
}
import { useState } from "react";
import { parseTemplate } from "../utils/madlib";


export default function MadLibPlayer({template}){
    const parts = parseTemplate(template.text)
    // should produce a list with two-three attributes: type, value, and index if it's a blank
    const blanks = parts.filter((p) => p.type === 'blank')

    // fill the answers with blanks
    const [answers, setAnswers] = useState(() => Array(blanks.length).fill(''))
    const [showStory, setShowStory] = useState(false)

}
import { useState } from "react";
import { parseTemplate } from "../utils/madlib";

export default function MadLibPlayer({ template, goBack }) {
  const parts = parseTemplate(template.text);
  // should produce a list with two-three attributes: type, value, and index if it's a blank
  const blanks = parts.filter((p) => p.type === "blank");

  // fill the answers with blanks
  const [answers, setAnswers] = useState(() => Array(blanks.length).fill(""));
  const [showStory, setShowStory] = useState(false);

  // this will be handled upon each letter change
  // takes in the index of typed box
  function handleChange(index, value) {
    // function takes the current answer and returns as the new state
    // maps through each item and builds an array
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
  }

  //reseett!!
  function playAgain() {
    setAnswers(Array(blanks.length).fill(""));
    setShowStory(false);
  }

  if (showStory) {
    return (
      <div className="card">
        <h2>{template.title}</h2>
        <p>
          {parts.map((part, i) =>
            part.type === "text" ? (
              <span key={i}>{part.value}</span>
            ) : (
              <strong key={i} className="filled">
                {answers[part.index]}
              </strong>
            ),
          )}
        </p>
        <div className="row">
          <button onClick={playAgain}>New Words, Same Story</button>
          <button className="secondary" onClick={goBack}>
            Back home
          </button>
        </div>
      </div>
    );
  }

  //general return if showStory not true
  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{template.title}</h2>
      <p className="hint">Fill in the blanks! Don't peek at the story!</p>
      {blanks.map((blank) => (
        <label key={blank.index} className="field">
          <span>
            {blank.index + 1}. {blank.label}
          </span>
          <input
            value={answers[blank.index]}
            onChange={(e) => handleChange(blank.index, e.target.value)}
            placeholder={`Enter a ${blank.label}`}
            required
          />
        </label>
      ))}
      <div className="row">
        <button type="submit">Show my story</button>
        <button type="button" className="secondary" onClick={goBack}>Back</button>
      </div>
    </form>
  );
}

import { useState } from "react";
import { builtIn } from "./data/templates";
import MadLibPlayer from "./components/MadlibPlayer";
import "./App.css";

export default function App() {
  const [currentTemplate, setCurrentTemplate] = useState(null);

  function playRandom() {
    //choose a random one
    const index = Math.floor(Math.random() * builtIn.length);
    play(builtIn[index]);
  }

  function goHome() {
    setCurrentTemplate(null);
  }

  return (
    <main className="app">
      <h1 onClick={goHome}>Mad Libs</h1>
      {/* home view */}
      {currentTemplate ? (
        <MadLibPlayer
          key={currentTemplate.id}
          template={currentTemplate}
          onBack={goHome}
        />
      ) : (
        <div className="card">
          <h2>Pick a Story</h2>
          <div className="row">
            <button onClick={playRandom}>Random MadLib</button>
          </div>
          <ul className="list">
            {builtIn.map((t) => (
              <li key={t.id}>
                <span>{t.title}</span>
                <button onClick={() => setCurrentTemplate(t)}>Play</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

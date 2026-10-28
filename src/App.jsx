import { useState, useEffect } from "react";
import { builtIn } from "./data/templates";
import MadLibPlayer from "./components/MadlibPlayer";
import MadlibCreator from "./components/MadlibCreator";
import "./App.css";

//saving the information onto localStorage
const STORAGE_KEY = "madlibs";

function loadCustomTemp() {
  // using try and catch so the site doesn't crash
  try {
    //if parses broken data return empty array
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export default function App() {
  const [view, setView] = useState("home"); // we'll have three modes for view
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [customTemplates, setCustomTemplates] = useState(loadCustomTemp);

  //save the custom madlibs into local storage so it's accessible
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customTemplates));
  }, [customTemplates]); //renders whenever custom templates is modified

  function play(template) {
    setCurrentTemplate(template);
    setView("play");
  }

  function playRandom() {
    //choose a random one
    const index = Math.floor(Math.random() * builtIn.length);
    play(builtIn[index]);
  }

  function saveCustom(template) {
    setCustomTemplates((prev) => [...prev, template]);
    play(template);
  }

  function deleteCustom(id) {
    setCurrentTemplate((prev) => prev.filter((t) => t.id !== id));
  }

  function goHome() {
    setView("home");
    setCurrentTemplate(null);
  }

  return (
    <main className="app">
      <h1 onClick={goHome}>Mad Libs</h1>
    </main>
  );
}

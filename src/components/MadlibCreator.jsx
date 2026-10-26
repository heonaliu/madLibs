import { useRef, useState } from "react";
import { parseTemplate } from "../utils/madlib";

const BLANKS = [
  "noun",
  "verb",
  "past tense verb",
  "adjective",
  "adverb",
  "-ing verb",
  "place",
  "name",
  "number",
  "plural noun",
];

export default function MadlibCreator({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  // checking for blanks from the text
  const blanks = parseTemplate(text).filter((p) => p.type === "blank");
  const canSave = title.trim() !== "" && blanks.length > 0;

  function insertBlank(label) {
    //function is meant to run whenever user clicks the label
    const el = textareaRef.current;
    // el is the real textarea on the page
    // tracking where the user's selection begins and ends
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const token = `{${label.replace(/ /g, "_")}}`;
    // the g stands for replacing every space into an underscore
    // so it'll come out as {plural_noun}
    //this edits how the text is parsed
    setText(text.slice(0, start) + token + text.slice(end));
    // sections out and sets it to the text

    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + token.length;
    });
    // refocuses the cursor

    function handleSave(e) {
        e.preventDefault()
        if (!canSave) return
        onSave({ id: crypto.randomUUID(), title: title.trim(), text})
        // give it a random id, save the title, and the text
    }

    

  }
}

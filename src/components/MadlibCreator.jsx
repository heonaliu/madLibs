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
}

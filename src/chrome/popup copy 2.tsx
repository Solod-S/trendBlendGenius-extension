import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import Logo from "../components/Logo";
import "./common.css";

interface Emojis {
  [key: string]: string;
}

const emojis: Emojis = {
  Excited: "🎉",
  Happy: "😄",
  Gracious: "🤗",
  Supportive: "👏",
  Polite: "🙏",
  Respectful: "🤔",
  Provocative: "😈",
  Controversial: "🤯",
  Disappointed: "😔",
  Sad: "😢",
  Frustrated: "😤",
  Sarcastic: "😏",
  Angry: "😡",
  Nasty: "😠",
};

const Popup: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [useEmojis, setUseEmojis] = useState<boolean>(false);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [endWithQuestion, setEndWithQuestion] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log({
      searchQuery,
      tone,
      useEmojis,
      useLink,
      endWithQuestion,
    });
  };

  const handleToneChange = (event: SelectChangeEvent<string>): void => {
    const selectedTone: string = event.target.value as string;
    setTone(selectedTone);
    // Если выбрана опция с эмодзи, убираем их перед сохранением в state
    if (useEmojis) {
      const toneWithoutEmoji: string =
        Object.keys(emojis).find(key => emojis[key] === selectedTone) || "";
      setTone(toneWithoutEmoji);
    }
  };

  return (
    <div>
      <Logo className="logo" />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search Query"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Tone</InputLabel>
          <Select
            value={useEmojis ? emojis[tone] || "" : tone}
            onChange={handleToneChange}
            label="Tone"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.keys(emojis).map((option: string) => (
              <MenuItem key={option} value={option}>
                {useEmojis ? emojis[option] + " " + option : option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={useEmojis}
              onChange={e => setUseEmojis(e.target.checked)}
            />
          }
          label="Use Emojis"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={useLink}
              onChange={e => setUseLink(e.target.checked)}
            />
          }
          label="Use Link"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={endWithQuestion}
              onChange={e => setEndWithQuestion(e.target.checked)}
            />
          }
          label="End with Question"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);

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
} from "@mui/material";
import Logo from "../components/Logo";
import "./common.css";

const Popup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tone, setTone] = useState("");
  const [useEmojis, setUseEmojis] = useState(false);
  const [useLink, setUseLink] = useState(false);
  const [endWithQuestion, setEndWithQuestion] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      searchQuery,
      tone,
      useEmojis,
      useLink,
      endWithQuestion,
    });
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
            value={tone}
            onChange={e => setTone(e.target.value)}
            label="Tone"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {[
              "🎉 Excited",
              "😄 Happy",
              "🤗 Gracious",
              "👏 Supportive",
              "🙏 Polite",
              "🤔 Respectful",
              "😈 Provocative",
              "🤯 Controversial",
              "😔 Disappointed",
              "😢 Sad",
              "😤 Frustrated",
              "😏 Sarcastic",
              "😡 Angry",
              "😠 Nasty",
            ].map(option => (
              <MenuItem key={option} value={option}>
                {option}
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

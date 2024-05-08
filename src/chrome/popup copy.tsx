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
  List,
  ListItem,
} from "@mui/material";
import Logo from "../components/Logo";
import "./common.css";

import { emojis, tones } from "../utils/constants";
import useChromeStorage from "../hooks/useChromeStorage";

const Popup = () => {
  const [searchQuery, setSearchQuery, { loading: searchQueryLoading }] =
    useChromeStorage<string>("tbg-search-query", "");
  const [tone, setTone, { loading: toneLoading }] = useChromeStorage<string>(
    "tbg-tone",
    tones[0]
  );
  const [useEmoji, setUseEmoji, { loading: useEmojiLoading }] =
    useChromeStorage<boolean>("tbg-use-emojis", false);
  const [useLink, setUseLink, { loading: useLinkLoading }] =
    useChromeStorage<boolean>("tbg-use-link", false);
  const [
    endWithQuestion,
    setEndWithQuestion,
    { loading: endWithQuestionLoading },
  ] = useChromeStorage<boolean>("tbg-end-with-question", false);

  return (
    <div>
      <Logo className="logo" />
      <form>
        <TextField
          label="Search Query"
          variant="outlined"
          value={searchQuery}
          disabled={searchQueryLoading}
          onChange={e => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Tone</InputLabel>
          <Select
            value={tone}
            disabled={toneLoading}
            onChange={e => setTone(e.target.value)}
            label="Tone"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {tones.map(option => (
              <MenuItem key={option} value={option}>
                {emojis[option]} {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <List>
          <ListItem style={{ padding: "0px 0px 0px 4px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useEmoji}
                  disabled={useEmojiLoading}
                  onChange={e => setUseEmoji(e.target.checked)}
                />
              }
              label="Use Emojis"
            />
          </ListItem>
          <ListItem style={{ padding: "0px 0px 0px 4px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useLink}
                  disabled={useLinkLoading}
                  onChange={e => setUseLink(e.target.checked)}
                />
              }
              label="Use Link"
            />
          </ListItem>
          <ListItem style={{ padding: "0px 0px 0px 4px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={endWithQuestion}
                  disabled={endWithQuestionLoading}
                  onChange={e => setEndWithQuestion(e.target.checked)}
                />
              }
              label="End with Question"
            />
          </ListItem>
        </List>
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

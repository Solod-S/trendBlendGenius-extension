import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, update } from "../../redux/user/userActions";
import { User } from "../../redux/user/userTypes";
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
import Logo from "../../components/Logo";
import "../../../src/chrome/common.css";

import { emojis, tones } from "../../utils/constants";

export const SettingsPage: React.FC<{
  userData: User;
}> = ({ userData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [useEmoji, setUseEmoji] = useState<boolean>(false);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [endWithQuestion, setEndWithQuestion] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const { query, tone, useEmojis, useLink, endWithQuestion } = userData;
      setSearchQuery(query ?? "");
      setTone(tone ?? "");
      setUseEmoji(useEmojis ?? false);
      setUseLink(useLink ?? false);
      setEndWithQuestion(endWithQuestion ?? false);
    }
  }, [userData]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFormData = () => {
    const formData = {
      id: userData.id,
      query: searchQuery,
      tone,
      useEmojis: useEmoji,
      useLink,
      endWithQuestion,
    };
    console.log(formData);
    dispatch(update(formData));
  };

  return (
    <div>
      <Logo className="logo" />
      <form>
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
                  onChange={e => setEndWithQuestion(e.target.checked)}
                />
              }
              label="End with Question"
            />
          </ListItem>
          <ListItem style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormData}
            >
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </ListItem>
        </List>
      </form>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import Logo from "../../components/Logo";
import "../../../src/chrome/common.css";

import { emojis, tones } from "../../utils/constants";
import { clearError, clearNotify } from "../../redux/user/userSlice";
import { RootState } from "../../redux/rootReducer";

import { instanceToken } from "../../axios/instance";

export const SettingsPage: React.FC<{
  userData: User;
}> = ({ userData }) => {
  const dispatch = useDispatch();
  const { isLoading, error, notify, accessToken } = useSelector(
    (state: RootState) => state.user
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openAIkey, setOpenAIkey] = useState<string>("");
  const [newsApiKey, setNewsApiKey] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [useEmoji, setUseEmoji] = useState<boolean>(false);
  const [useLink, setUseLink] = useState<boolean>(false);
  const [endWithQuestion, setEndWithQuestion] = useState<boolean>(false);

  const [showAIKey, setShowAIKey] = useState(false);
  const [showNewsKey, setShowNewsKey] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorNotify, setErrorNotify] = useState(true);

  useEffect(() => {
    instanceToken.set(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (error && error.length > 0) {
      setErrorNotify(true);
      setMessage(error);
      setOpen(true);
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    if (notify) {
      setErrorNotify(false);
      setMessage(notify);
      setOpen(true);
      dispatch(clearNotify());
    }
  }, [notify]);

  useEffect(() => {
    if (userData) {
      const {
        query,
        tone,
        useEmojis,
        useLink,
        endWithQuestion,
        openAIkey,
        newsApiKey,
      } = userData;
      setSearchQuery(query ?? "");
      setTone(tone ?? "");
      setUseEmoji(useEmojis ?? false);
      setUseLink(useLink ?? false);
      setEndWithQuestion(endWithQuestion ?? false);
      setOpenAIkey(openAIkey ?? "");
      setNewsApiKey(newsApiKey ?? "");
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
      openAIkey,
      newsApiKey,
    };
    dispatch(update(formData));
  };

  return (
    <div style={{ minWidth: "270px" }}>
      {/* <Logo className="logo" /> */}
      <form>
        <TextField
          label="Search Query"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", position: "relative" }}>
          <TextField
            label="OpenAI key"
            variant="outlined"
            type={showAIKey ? "text" : "password"}
            value={openAIkey}
            onChange={e => setOpenAIkey(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={() => {
              setShowAIKey(!showAIKey);
            }}
            sx={{
              position: "absolute",
              right: 0,
              top: "10px",
              fontSize: "8px",
            }}
          >
            {showAIKey ? "hide" : "show"}
          </Button>
        </Box>
        <Box sx={{ display: "flex", position: "relative" }}>
          <TextField
            label="NewsAi key"
            variant="outlined"
            type={showNewsKey ? "text" : "password"}
            value={newsApiKey}
            onChange={e => setNewsApiKey(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={() => {
              setShowNewsKey(!showNewsKey);
            }}
            sx={{
              position: "absolute",
              right: 0,
              top: "10px",
              fontSize: "8px",
            }}
          >
            {showAIKey ? "hide" : "show"}
          </Button>
        </Box>

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
              disabled={isLoading}
            >
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </ListItem>
        </List>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={errorNotify ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

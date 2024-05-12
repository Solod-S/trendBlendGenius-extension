import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { login } from "../../../redux/user/userActions";
import { Close } from "@mui/icons-material";
import {
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import Logo from "../../../components/Logo";
import { LoginFormType } from "../../../redux/user/userTypes";

export const LoginComp: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      dispatch(login(formData));
    } catch (error: any) {
      setOpen(true);
      setMessage(error);
      console.log(`error`, error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <Logo className="logo" />
      <form style={{ textAlign: "center" }}>
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          style={{ marginBottom: "20px" }}
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
      {/* {error && <p>{error}</p>}
       */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <SnackbarContent
          style={{ backgroundColor: "red" }}
          message={error}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
};

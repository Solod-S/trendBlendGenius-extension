import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { create } from "../../../redux/user/userActions";
import {
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Logo from "../../../components/Logo";
import { LoginFormType } from "../../../redux/user/userTypes";
import { clearError, clearNotify } from "../../../redux/user/userSlice";

export const RegisterComp: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error, notify } = useSelector(
    (state: RootState) => state.user
  );
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorNotify, setErrorNotify] = useState(true);

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
      setFormData({
        email: "",
        password: "",
      });
      dispatch(clearNotify());
    }
  }, [notify]);

  const handleRegisteration = async () => {
    try {
      if (formData.email.length <= 0 || formData.password.length <= 0) {
        setMessage("All fields are required");
        setTimeout(() => {
          setOpen(true);
        }, 50);
        return;
      }
      dispatch(create(formData));
    } catch (error) {
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
          onClick={handleRegisteration}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Register"}
        </Button>
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

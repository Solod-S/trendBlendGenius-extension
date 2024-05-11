import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { login } from "../redux/auth/authActions";
import { Button, TextField, CircularProgress } from "@mui/material";
import Logo from "../components/Logo";
import { LoginFormType } from "../redux/auth/authTypes";

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      dispatch(login(formData));
    } catch (error) {
      // Обработка ошибок
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default AuthForm;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthForm />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

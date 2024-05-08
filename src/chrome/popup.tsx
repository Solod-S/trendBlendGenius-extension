import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { login } from "../redux/auth/authActions";

const Popup: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    try {
      await dispatch(
        login({ email: "example@example.com", password: "password123" })
      );
    } catch (error) {
      // Обработка ошибок
    }
  };

  return (
    <div>
      {/* Добавьте форму для входа пользователя */}
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default Popup;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Popup />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

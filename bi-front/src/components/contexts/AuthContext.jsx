import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  alerta: "",
  userData: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        alerta: "",
        userData: action.payload.userData,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, userData: null };
    case "isLoading":
      return { ...state, isLoading: action.payload.isLoading };
    case "alerta":
      return { ...state, alerta: action.payload.alerta };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading, alerta, userData }, dispatch] =
    useReducer(reducer, initialState);

  //Autenticação de sessão ao usuario abrir o navegador e intervalo de autenticação a cada 60 minutos
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:3000/auth", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({
            type: "login",
            payload: { user: data.user.name, userData: data },
          });
        } else {
          // Se a resposta não for ok (por exemplo, 401 Unauthorized), efetua o logout
          dispatch({ type: "logout" });
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        dispatch({ type: "logout" });
      }
    }

    // Verifica a autenticação imediatamente ao carregar o componente
    checkAuth();

    // Cria um intervalo que verifica a sessão a cada 60 minutos
    const intervalId = setInterval(checkAuth, 60 * 60 * 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  async function login(email, password) {
    if (email === "" || password === "") {
      dispatch({
        type: "alerta",
        payload: { alerta: "Preencha os campos corretamente!" },
      });
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      dispatch({
        type: "alerta",
        payload: { alerta: "Por favor, insira um email válido." },
      });

      return;
    }
    try {
      dispatch({ type: "isLoading", payload: { isLoading: true } });
      const loginData = { email: email, password: password };
      // Faz a requisição POST para a API
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      // Converte a reposta em JSON
      const data = await response.json();
      // Ver resposta no log
      console.log(data);
      dispatch({
        type: "login",
        payload: { user: data.user.name, userData: data },
      });
    } catch (error) {
      // Trata erros de rede ou da API
      dispatch({
        type: "alerta",
        payload: { alerta: "Erro ao fazer login, credenciais incorretas." },
      });
      console.error("Erro durante o login:", error);
    } finally {
      dispatch({ type: "isLoading", payload: { isLoading: false } });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  function cleanUpAlerta() {
    dispatch({ type: "alerta", payload: { alerta: "" } });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        alerta,
        login,
        logout,
        userData,
        cleanUpAlerta,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };

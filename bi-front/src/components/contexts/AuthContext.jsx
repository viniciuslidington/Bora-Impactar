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

  // Verifica a autenticação ao carregar o componente e em intervalos regulares
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:3000/auth", {
          credentials: "include", // Inclui cookies na requisição
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

  // Função de login
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
        },
        body: JSON.stringify(loginData),
        credentials: "include", // Inclui cookies na requisição
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      // Converte a resposta em JSON
      const data = await response.json();
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

  // Função de logout
  async function logout() {
    try {
      // Faz a requisição POST para a rota de logout no backend
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // Inclui cookies na requisição
      });

      // Limpa o estado de autenticação no frontend
      dispatch({ type: "logout" });
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  }

  // Função para limpar alertas
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
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

<<<<<<< HEAD
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
=======
        if(user){
            if (user.role === "ADMIN") {
                dispatch({type: 'LOGIN', payload: user})
            }
            dispatch({type: 'LOGIN', payload: user})
            
        };
            },[])
>>>>>>> 74ab7b114fd266ea800e414c83d81c2b076d7ced

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

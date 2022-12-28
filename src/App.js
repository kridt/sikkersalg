import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { LoggedInContext } from "./context/LoggedInContext";
import CreateProduct from "./pages/CreateProduct";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import StartPage from "./pages/StartPage";

function App() {
  const [userLoggedIn] = useState(false);
  //const test = useContext(LoggedInContext);
  useEffect(() => {
    // console.log(test);
  }, []);

  return (
    <LoggedInContext.Provider value={userLoggedIn}>
      <AuthProvider>
        <BrowserRouter className="App">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/minSide" element={<Dashboard />} />
            <Route path="/opretBruger" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createProduct" element={<CreateProduct />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoggedInContext.Provider>
  );
}

export default App;

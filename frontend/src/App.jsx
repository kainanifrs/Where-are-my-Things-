import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Objetos from "./pages/Objetos";
import "./App.css";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro"
import RecuperarSenha from "./pages/RecuperarSenha"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/objetos" element={<Objetos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import PersistentLogin from "./Auth/PersistentLogin";
import RequireAuth from "./Auth/RequireAuth";
import Home from './Components/Home';
import MenuHome from "./Components/Menu";
import Contact from "./Components/Contact";
import Aboutus from "./Components/Aboutus";
import Unauthorized from "./Components/Unauthorized";

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
        <Routes>
          <Route element={<PersistentLogin />}>

            <Route path="" element={<Home />}></Route>
            <Route path="/menu" element={<MenuHome />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/about" element={<Aboutus />}></Route>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />}> </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

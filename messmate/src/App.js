import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home.jsx';
import Main from "./Components/Main.jsx";
import PersistentLogin from "./Auth/PersistentLogin";
import RequireAuth from "./Auth/RequireAuth";
import MenuHome from "./Components/Menu";
import Contact from "./Components/Contact";
import Aboutus from "./Components/Aboutus";
import Unauthorized from "./Components/Unauthorized";
import Sidebar from './Admin/Components/Sidebar.jsx';
import Admin from './Admin/Admin.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route element={<PersistentLogin />}>
            <Route path="/" element={<Main />}>
              <Route path="" element={<Home />}></Route>
              <Route path="/menu" element={<MenuHome />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/about" element={<Aboutus />}></Route>
            </Route>
            <Route element={<RequireAuth accessRole={1}/>}>
               <Route path="/admin" element={<Admin/>}></Route>

            </Route>
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />}> </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

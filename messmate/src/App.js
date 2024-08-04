import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home.jsx';
import Main from "./Components/Main.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />}>
              <Route path="" element={<Home />}></Route>
            </Route>
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

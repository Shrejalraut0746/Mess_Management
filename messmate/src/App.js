import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistentLogin from "./Auth/PersistentLogin";
import RequireAuth from "./Auth/RequireAuth";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<PersistentLogin />}>
            <Route path="" element={<Home />}></Route>
             
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

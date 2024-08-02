import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistentLogin from "./Auth/PersistentLogin";
import RequireAuth from "./Auth/RequireAuth";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<PersistentLogin />}>
              
             
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

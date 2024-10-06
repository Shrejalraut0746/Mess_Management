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

import Admin from './Admin/Admin.jsx';
import EditProfile from "./User/Pages/EditProfile.jsx";
import Adduser from './Admin/Pages/Adduser.jsx';
import Dashboad from './Admin/Pages/Dashboad.jsx';
import QrAttendance from './Admin/Pages/QrAttendance.jsx';
import Inventory from "./Admin/Pages/Inventory";
import Menu from "./Admin/Pages/Menu";

import Alluser from "./Admin/Pages/Alluser.jsx"
import Dailyentry from './Admin/Pages/Dailyentry.jsx';
import User from './User/User.jsx';
import ProfileScanner from './User/Pages/ProfileScanner.jsx';
import UserMenu from './User/Pages/UserMenu.jsx';
import Subscription from "./User/Pages/Subscription.jsx";
import Info from "./User/Pages/Info.jsx";
import Attendance from './User/Pages/Attendance.jsx';
import Piecard from './Employee/Pages/Piecard.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Piecard/>}></Route>
          <Route element={<PersistentLogin />}>
            <Route path="/" element={<Main />}>
              <Route path="" element={<Home />}></Route>
              <Route path="/menu" element={<MenuHome />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/about" element={<Aboutus />}></Route>
            </Route>

           
            <Route element={<RequireAuth accessRole={1} />}>
              <Route path="/admin" element={<Admin />}>
                <Route path='' element={<Dashboad />}></Route>
                <Route path='attendance' element={<Dailyentry/>}></Route>
                <Route path='qrattendance' element={<QrAttendance />}></Route>
                <Route path="adduser" element={<Adduser />}></Route>
                 <Route path="inventory" element={<Inventory />}></Route>
                 <Route path="menu" element={<Menu />}> </Route>
                <Route path="alluser" element={<Alluser/>}></Route>
              </Route>
            </Route>
          </Route>
          <Route element={<RequireAuth accessRole={0} />}>
               <Route path="/user" element={<User/>}>
                  <Route path="" element={<ProfileScanner/>}></Route>
                  <Route path="editprofile" element={<EditProfile />}></Route>
                  <Route path="subscription" element={<Subscription />}></Route>
                  <Route path="usermenu" element={<UserMenu/>}></Route>
                  <Route path="attendance" element={<Attendance/>}></Route>
                  <Route path="information" element={<Info />}></Route>
               </Route>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />}> </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SignInSide from "./pages/signin";
import Dashboard from './pages/Dashboard'
import CreateGroup from "./pages/CreateGroup";
import {
  BrowserRouter,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Sign_up from "./pages/signup";
import GroupList from "./pages/GroupList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/create/group" element={<CreateGroup />} />
        <Route path="/grouplist" element={<GroupList />} />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;

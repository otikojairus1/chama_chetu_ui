import logo from "./logo.svg";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SignInSide from "./pages/signin";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import { BrowserRouter, Routes, Switch, Route, Link } from "react-router-dom";
import Sign_up from "./pages/signup";
import GroupList from "./pages/GroupList";
import GroupRequests from "./pages/GroupRequests";
import GroupMembers from "./pages/GroupMembers";
import Mpesa from "./pages/Mpesa";
import MyGroup from "./pages/MyGroup";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import { Helmet } from "react-helmet";
import Contribute from "./pages/Contribute";
import Shares from "./pages/Shares";
import SharesForm from "./pages/SharesForm";

function App() {
  return (
    <BrowserRouter>
 
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/create/group" element={<CreateGroup />} />
        <Route path="/grouplist" element={<GroupList />} />
        <Route path="/group/requests" element={<GroupRequests />} />
        <Route path="/group/members" element={<GroupMembers />} />
        <Route path="/deposit" element={<Mpesa />} />
        <Route path="/mygroup" element={<MyGroup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/contribute/groupmember" element={<Contribute />} />
        <Route path="/buy/shares" element={<Shares />} />
        <Route path="/buy/shares/form" element={<SharesForm />} />



        <Route exact path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

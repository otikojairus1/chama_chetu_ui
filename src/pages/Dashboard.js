import React from "react";
import AppBarComponent from "../components/Appbar";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import chatIcon from "../assets/chat.gif";
import TopNavbar2 from "../components/Nav/TopNav2";
import Footer from "../components/Sections/Footer"
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function Dashboard({ navigation }) {
  let location = useLocation();
  let navigate = useNavigate();

  const [balance, setBalance] = React.useState(0);
  const [email, setEmail] = React.useState("otikojairus@yahoo.com");
  const [groupName, setGroupName] = React.useState("");
  const [groupNameAvailable, setGroupNameAvailability] = React.useState(false);
  const [sessionNo, setSessionNo] = React.useState("");

  React.useEffect(() => {
    console.log(location.state.username);
    axios
      .post("http://localhost:3000/api/v1/group/get/group", {
        email: location.state.email,
      })
      .then((res) => {
        setGroupName(res.data.data.groupName);
        console.log(groupName);
        setGroupNameAvailability(true);
        setSessionNo(res.data.data.sessionNo);
      })
      .catch((err) => console.log(err));
    // console.log(location.state.email);
    if (location.state !== null) {
      setBalance(location.state.user);
    } else {
      setBalance(0);
    }

    // if (location.state.email !== null) {
    //   setEmail(location.state.email);
    // }
  });
  return (
    <div style={{ backgroundColor: "#E2E2E2" }}>
      {/* <AppBarComponent navigation={navigation} email={location.state.email} /> */}
      <TopNavbar2/>
      <div style={{ height: 100 }}></div>
      <Container maxWidth="lg">
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: 30 }}>Welcome Back </p>
          <p style={{ color: "green", marginLeft:10, marginTop:4, fontSize: 25 }}>
            {location.state.username},
          </p>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>MY WALLET</h3>
                <AccountBalanceWalletTwoToneIcon color="#3C4D97" fontSize={"large"}/>
                <h1>Kshs {balance}.00</h1>
              </CardContent>
              <CardActions>
                <Link
                  style={{
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 130,
                    backgroundColor: "green",
                    color: "#fff",
                    textDecoration: "none",
                    paddingLeft: 20,
                    display:"flex",
              
                    paddingBottom: 10,
                    borderRadius: 20,
                  }}
                  to="/deposit"
                >
                  <p style={{marginTop:10, marginLeft:-5}}>Deposit</p>
                  <ExpandLessIcon />
                </Link>
                <Link
                  style={{
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 120,
                    backgroundColor: "red",
                    color: "#fff",
                    display:"flex",
                    textDecoration: "none",
                    paddingLeft: 20,
                    paddingBottom: 10,
                    borderRadius: 20,
                  }}
                  to="/create/group"
                >
                  <p style={{marginTop:8}}>Withdraw</p>
                  <KeyboardArrowDownIcon/>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 , backgroundColor:"#3C4D97"}}>
              <CardContent>
                <h3 style={{ color:"#fff"}}>GROUP CREATION</h3>
                <p style={{ color:"#fff"}}>
                As an admin you can create a group here, this group will then be
                able to receive join requests from member who already have an
                account with us.</p>
              </CardContent>
              <CardActions>
                <Link to="/create/group">
                  <Button size="small"><p style={{ color:"#fff", fontWeight:"bold"}}>Get Started</p></Button>

                  <KeyboardDoubleArrowRightIcon sx={{ color: "#fff" }} />
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>MANAGE MEMBERSHIP REQUESTS</h3>
                View members who need to join different groups and approve their
                requests
              </CardContent>
              <CardActions>
                <Link to="/group/requests">
                  <Button size="small">View Details</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ Width: 200, backgroundColor:"#3C4D97" }}>
              <CardContent>
                <div>
                  {groupNameAvailable ? (
                    <h3 style={{ color:"#fff"}}>{groupName}</h3>
                  ) : (
                    <h3>MY GROUP (NO GROUP FOUND)</h3>
                  )}
                </div>
                <p style={{ color:"#fff"}}>You are member number: {sessionNo} <br />
                This is a number assigned to you by the group admin. It is a
                session that tracks your contribution statuses.</p>
              </CardContent>
              <CardActions>
                {/* <Link
                  to={{
                    pathname: "/mygroup",

                    state: {
                      name: true,
                    },
                  }}
                > */}
                <Button
                  onClick={() => {
                    navigate("/contributions", { state: { group: groupName } });
                  }}
                  size="small"
                >
                  <p style={{ color:"#fff"}}>Send Contribution</p>
                </Button>
                {/* </Link> */}
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card style={{ backgroundColor: "#3C4D97" }} sx={{ Width: 200 }}>
              <CardContent>
                <h3 style={{ color: "#fff" }}>GROUP CHAT</h3>
                <p style={{ color: "#fff" }}>
                  Talk to other group members via inbuilt chat provided by
                  chamachetu
                </p>
              </CardContent>
              <CardActions>
                {/* <Link to="/chat"> */}
                <p
                  onClick={() => {
                    navigate("/chat", {
                      state: { groupname: groupName },
                    });
                  }}
                  style={{ color: "#fff", cursor: "pointer" }}
                >
                  Chat
                </p>
                <img style={{ height: 100, width: 100 }} src={chatIcon} />

                {/* </Link> */}
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>JOIN A GROUP</h3>
                <p >
                Join any group of your choice from a list of verified groups
                created by the admin. You may also check the members in the
                group prior to joining if you want.</p>
              </CardContent>
              <CardActions>
                {/* <Link to="/grouplist"> */}
                <Button
                  onClick={() => {
                    navigate("/grouplist", {
                      state: { email: location.state.email },
                    });
                  }}
                  size="small"
                >
                  Join a new group
                </Button>
                {/* </Link> */}
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200, backgroundColor:"#3C4D97" }}>
              <CardContent>
                <h3 style={{ color:"#fff"}}>LOANS</h3>
                <p style={{ color:"#fff"}}>
                  Get soft loans as per your shares. we will calculate interest
                  rates at a 5% rate. feel free and start enjoying loan services
                  by chamachetu{" "}
                </p>
              </CardContent>
              <CardActions>
                <Link to="/grouplist">
                  <Button size="small"><p style={{ color:"#fff"}}>Get started</p></Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>SHARES & DIVIDENDS</h3>
                <p>
                  Harvest your chamachetu income via selling share or
                  withdrawing dividends to your wallet{" "}
                </p>
              </CardContent>
              <CardActions>
                <Link to="/grouplist">
                  <Button size="small">Get started</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>WELFARE KIT</h3>
                <p>
                  Get started with the new welfare kit. You can now start
                  contributing to the new welfare kit!
                </p>
              </CardContent>
              <CardActions>
                <Link to="/grouplist">
                  <Button size="small">Get started</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
        </Grid>
      </Container>
      <div style={{height:40}}></div>
      <Footer />
    </div>
  );
}

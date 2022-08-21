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
import { Link, useLocation } from "react-router-dom";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
export default function Dashboard() {
  let location = useLocation();
  return (
    <>
      <AppBarComponent />
      <Container maxWidth="lg">
        Welcome Jane Doe,
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>WALLET BALANCE</h3>
                <h1>Kshs 0.00</h1>
              </CardContent>
              <CardActions>
                <Link
                  style={{
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 100,
                    backgroundColor: "green",
                    color: "#fff",
                    textDecoration:"none",
                    paddingLeft:20,
                    paddingBottom:10,
                    borderRadius: 20,
                  }}
                  to="/deposit"
                >
                  <p>Deposit</p>
                  <ExpandLessIcon/>
                </Link>
                <Link
                  style={{
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 100,
                    backgroundColor: "red",
                    color: "#fff",
                    textDecoration:"none",
                    paddingLeft:20,
                    paddingBottom:10,
                    borderRadius: 20,
                  }}
                  to="/create/group"
                >
                  <p>Withdraw</p>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>GROUP CREATION</h3>
                As an admin you can create a group here, this group will then be
                able to receive join requests from member who already have an
                account with us.
              </CardContent>
              <CardActions>
                <Link to="/create/group">
                  <Button size="small">Get Started</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>NEXT UP</h3>
                Make a contribution to the next member.
              </CardContent>
              <CardActions>
                <Link to="/create/group">
                  <Button size="small">View Details</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>MY GROUP</h3>
                Check all group details
              </CardContent>
              <CardActions>
                <Link to="/create/group">
                  <Button size="small">View Details</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>KEEP IN TOUCH</h3>
                Talk to other group members via inbuilt chat provided by
                chamachetu
              </CardContent>
              <CardActions>
                <Link to="/create/group">
                  <Button size="small">Chat</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>JOIN A GROUP</h3>
                Join any group of your choice from a list of verified groups
                created by the admin. You may also check the members in the
                group prior to joining if you want.
              </CardContent>
              <CardActions>
                <Link to="/grouplist">
                  <Button size="small">Join a new group</Button>
                </Link>
              </CardActions>
            </Card>
            {/* CARD LIST */}
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ Width: 200 }}>
              <CardContent>
                <h3>LOANS</h3>
                <p>
                  Get soft loans as per your shares. we will calculate interest
                  rates at a 5% rate. feel free and start enjoying loan services
                  by chamachetu{" "}
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
    </>
  );
}

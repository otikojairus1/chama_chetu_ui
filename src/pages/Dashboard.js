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
import {Link} from 'react-router-dom'
export default function Dashboard() {
  return (
    <>
      <AppBarComponent />
      <Container maxWidth="lg">
        Welcome Jane Doe,
        <Grid container spacing={2}>
       
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
        </Grid>
      </Container>
    </>
  );
}

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { AppBar } from "@mui/material";
import AppBarComponent from "../components/Appbar";
import { ClipLoader, GridLoader } from "react-spinners";
import axios from 'axios'

export default function GroupList() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/v1/group/get/groups')
    .then((response)=>{
      console.log(response.data)
    })
  });
  const override = {
    display: "block",
    margin: "auto auto",
    borderColor: "red",
  };

  if (loading) {
    return (
      <div>
        <AppBarComponent />
        <div style={{flex:1, marginTop:250, justifyContent:"center", alignItems:"center"}}>
          <GridLoader
            color={"blue"}
            loading={true}
            cssOverride={override}
            size={30}
          />
          <div style={{marginLeft:420, fontSize:25}}>Please wait as we fetch the latest groups</div>
        </div>
      </div>
    );
  }
  return (
    <>
      <AppBarComponent />
      <div style={{fontSize:30, marginLeft: 'auto'}}>Top Group</div>
      <Container maxWidth="sm">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            marginTop: 10,
            bgcolor: "background.paper",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Container>
    </>
  );
}

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../Assets/loadingicon.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import swal from "sweetalert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        the chamachetu foundation
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function CreateGroup() {
  // STATES
  let navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [success, setOpenSuccess] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    // <React.Fragment>
    //   <Button color="secondary" size="small" onClick={handleClose}>
    //     UNDO
    //   </Button>
    //   <IconButton

    //     size="small"
    //     aria-label="close"
    //     color="inherit"
    //     onClick={handleClose}
    //   >
    //     <CloseIcon fontSize="small" />
    //   </IconButton>
    // </React.Fragment>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        success
      </Alert>
    </Snackbar>
  );

  <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
    An error occured while trying to create a group!
  </Alert>
</Snackbar>

  // END OF STATES
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    setLoading(true);
    if( data.get("groupName") == "" ||  data.get("Admin") == "" ||  data.get("groupDescription") == ""){
      swal("Group Creation Failed!", "Kindly Provide accurate information regarding the chama", "error");

    }else{
      axios
      .post("http://localhost:3000/api/v1/group/create", {
        groupName: data.get("groupName"),
        Admin: data.get("Admin"),
        groupDescription: data.get("groupDescription"),
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.responseStatusCode == "401") {
          setOpen(true);
        } else {
          swal("Group Creation Success!", "A group/chama with the provided details is created successfully and now available to start receiving join requests", "success");
          // navigate("/dashboard");
          // setTimeout(()=>{
          // navigate("/dashboard");

          // }, 2000);
        }
      })
      .catch((err) => {
        setLoading(false);
      swal("Group Creation Failed!", "Kindly Provide accurate information regarding the chama", "error");

        console.log(err);
      });
    }
 
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1509099342178-e323b1717dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              CREATE A NEW GROUP (CHAMA)
            </Typography>
            <Typography component="h1" variant="h5">
              Kindly provide the following details correctly.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="groupName"
                label="Group Name"
                name="groupName"
                autoComplete="groupName"
                autoFocus
              />
                     <TextField
                margin="normal"
                required
                fullWidth
                id="Admin"
                label="Administrator's Email"
                name="Admin"
                autoComplete="Admin"
                autoFocus
              />
                     <TextField
                margin="normal"
                required
                fullWidth
                id="groupDescription"
                label="Group Description"
                name="groupDescription"
                autoComplete="groupDescription"
                autoFocus
              />
              
         
          
              <Button
                type="submit"
                fullWidth
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "creating group..." : "Create New Group"}
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}
              />
              
             
            
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

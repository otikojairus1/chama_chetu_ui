import React from "react";
import TopNavbar2 from "../components/Nav/TopNav2";
import Footer from "../components/Sections/Footer";

// MUi INOUTS

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
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

// 


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

export default function Contribute() {
  React.useEffect(()=>console.log(location.state));
  let location = useLocation();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  let navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        We encountered a problem while making the contributions!!
      </Alert>
    </Snackbar>
  );

  // END OF STATES
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      amount: data.get("amount"),
    
    });
    setLoading(true);
    axios
      .post("http://localhost:3000/api/v1/group/make/contribution", {
        amount: data.get("amount"),
        email: 'otikojairus@gmail.com',

        // email: location.state.email,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.responseDescription !== "your contribute was successfully") {
          setOpen(true);
        } else {
          navigate("/dashboard", {state:{amount:data.get("amount")}});
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  
  return (
    <>
      <TopNavbar2 />
      <div>Contribute</div>

      <div
        style={{
           height: '120vh',
          justifyContent: "cemter",
          alignItems: "center",
          backgroundColor: "#E2E2E2",
        }}
      >
        <div
          style={{
            height: 400,
            // width: 600,
            // marginLeft: 400,
            backgroundColor: "red",
          }}
        >
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
              CHAMACHETU FOUNDATION
            </Typography>
            <Typography component="p" color="green" variant="p">
              You are contributing to {location.state.email}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              /> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Enter amount to pay"
                type="number"
                id="amount"
                autoComplete="current-password"
              />
          
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "Processing payment.." : "Make merryGoRound Payment"}
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
        </div>
      </div>
      <Footer />
    </>
  );
}

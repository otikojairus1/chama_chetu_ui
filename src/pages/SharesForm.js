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

export default function SharesForm() {
  function updatedb(amount) {
    axios.post("http://localhost:3000/api/v1/group/update/wallet").then(() => {
      navigate("/dashboard", {
        _id: "63048de4eca8ab98f4158618",
        amount: amount,
      });
    });
  }
  // STATES
  let navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

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
        You provided the wrong login credentials!!
      </Alert>
    </Snackbar>
  );

  // END OF STATES
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      amount: parseInt(data.get("amount")),
      // password: data.get("password"),
    });
    setLoading(true);
    // axios
    //   .post("http://localhost:3000/api/v1/group/update/wallet", {
    //     id: "63048de4eca8ab98f4158618",
    //     amount: parseInt(data.get("amount")),
    //   })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((err) => console.log(err));
    axios
      .post("http://localhost:3000/api/v1/group/buy/share", {
        "email":"otikojairus@gmail.com",
        "share":100
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (
          res.data.responseDescription ==
          "share was created successfully"
        ) {
          //   setOpen(true);
          let amountparam = data.get("amount");
          // updatedb(amountparam);

          swal(
            "Share bought Successful!",
            "We have successfully processed your share purchase request",
            "success"
          );
          // navigate("/dashboard");
        } else {
          swal(
            "Share purchase Request failed!",
            "We encountered an error while trying to make your reqest. Try again later!",
            "error"
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        swal(
          "Share purchase Request failed!",
          "We encountered an error while trying to make your reqest. Try again later!",
          "error"
        );
      });
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
              "url(https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
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
            <Typography>
             Buy shares directly from your wallet.
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
                type="number"
                id="amount"
                label="Enter Amount"
                name="amount"
                autoComplete="amount"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading
                  ? "Please wait, purchasing shares..."
                  : "Buy Shares"}
              </Button>

              <Button
                // type="submit"
                onClick={() =>{
                  setLoading2(true);
                  axios.post("http://localhost:3000/api/v1/group/fetch/share", {
                    "email":"otikojairus@gmail.com"
                  })
                  .then((res)=>{

                    console.log(res.data);
                  })
                  .catch((err)=>console.log(err))
                }}
                
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading2
                  ? "Checking shares..."
                  : "Check my Shares"}
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

import React from "react";
import { useLocation } from "react-router-dom";
import AppBarComponent from "../components/Appbar";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
export default function Chat() {
  let location = useLocation();
  const [data, setData] = React.useState([]);
  const [activeConvo, setActiveConvo] = React.useState("");

  let dataArray = [];
  React.useEffect(() => {
    console.log(location.state);

    axios
      .post("http://localhost:3000/api/v1/group/get/members", {
        groupName: location.state.groupname,
      })
      .then((res) => {
        console.log(res.data.data);
        dataArray = res.data.data;

        setData(dataArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <AppBarComponent />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <h2>Conversations for ({location.state.groupname})</h2>
              {data.map((convo) => (
                <div
                  onClick={() => setActiveConvo(convo.memberEmail)}
                  style={{
                    height: 50,
                    cursor: "pointer",

                    hoverColor: "green",
                    width: "100%",
                    marginTop: 5,
                    backgroundColor: "#D5D4D4",
                  }}
                >
                  {convo.memberEmail}
                </div>
              ))}
            </Item>
          </Grid>
          <Grid item xs={8}>
            <div>
              {activeConvo == "" ? (
                <div
                  style={{
                    height: 500,
                    width: "100%",
                    marginLeft: 100,
                    marginTop: 300,
                  }}
                >
                  <p style={{ fontSize: 20 }}>
                    Chama Chetu chat system is very secure for members to
                    discuss about their group
                  </p>
                </div>
              ) : (
                // <Loopcomponent activeConvo={activeConvo} messages={['sdsda','adada','adada']} />
                <ChatModule
                  messages={["sdsda", "adada", "adada"]}
                  sender={"otikojairus@gmail.com"}
                  activeConvo={activeConvo}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

function Loopcomponent({ messages, activeConvo }) {
  messages.map((t) => {
    <ChatModule sender={"otikojairus@gmail.com"} activeConvo={activeConvo} />;
  });
}

function ChatModule({ sender, activeConvo, messages }) {
  let marginDefinition;
  let borderBottomLeftRadiusC;
  if (sender == activeConvo) {
    marginDefinition = 670;
    borderBottomLeftRadiusC = 20;
  } else {
    marginDefinition = 10;
    borderBottomLeftRadiusC = 0;
  }

  return (
    // <p>{activeConvo}</p>
    <div style={{ height: "100vh", position: "relative", width: "100%" }}>
      <div style={{ height: 10 }}></div>
      <div
        style={{
          paddingLeft: 10,
          paddingRight: 5,
          paddingTop: 7,
          paddingBottom: 7,
          width: 200,
          position: "relative",

          marginLeft: marginDefinition,
          borderBottomLeftRadius: borderBottomLeftRadiusC,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "blue",
        }}
      >
        <p style={{ color: "#fff" }}>Text message!!</p>
        <div
          style={{
            position: "absolute",
            bottom: 2,
            fontSize: 10,
            color: "#fff",
            right: 2,
          }}
        >
          Sent at 12pm
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 0,
          height: 40,
          display: "flex",
          width: "100%",
          // justifyContent: "space-between",
          // backgroundColor: "#D5D4D4",
        }}
      >
        <div style={{ marginRight: 20 }}>test</div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <input style={{ borderWidth: 0, width: 700, height: "90%" }} />
        </div>
        <div
          style={{
            height: 40,
            width: 80,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "green",
          }}
        >
          <p style={{ color: "#fff", marginTop: 10, marginLeft: 20 }}>send</p>
        </div>
      </div>
    </div>
  );
}

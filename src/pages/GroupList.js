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
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavbar2 from "../components/Nav/TopNav2";
import Footer from "../components/Sections/Footer";

export default function GroupList() {
  let dataArray = [];
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    console.log(location.state.email);
    setLoading(true);
    axios
      .get("http://localhost:3000/api/v1/group/get/groups")
      .then((response) => {
        // console.log(response.data);
        dataArray = response.data.data;
        console.log(dataArray);
        setData(dataArray);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, []);
  const override = {
    display: "block",
    margin: "auto auto",
    borderColor: "red",
  };

  if (loading) {
    return (
      <div>
        <TopNavbar2 />

        <div
          style={{
            flex: 1,
            marginTop: 250,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GridLoader
            color={"#101871"}
            loading={true}
            cssOverride={override}
            size={20}
          />
          <div style={{ marginLeft: 450, fontSize: 25 }}>
            Please wait as we fetch the latest groups
          </div>
          <div style={{ height: 170 }}></div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: "#E2E2E2" }}>
      <TopNavbar2 />

      <Container maxWidth="sm">
        <div style={{ fontSize: 30, marginLeft: "auto" }}>Top Group</div>
        <div style={{ height: 40 }}></div>
        {data.map((groupDetails) => {
          return (
            <div
              // onClick={() => console.log("working")}
              style={{
                height: 150,
                pointer: "cursor",
                marginTop: 7,
                borderRadius: 10,
                padding: 10,
                display:"flex",
                position: "relative",
                backgroundColor: "#0A1DB9",
              }}
            >
                 <img style={{borderRadius:"50%", height:90, width:90, marginLeft:10, marginRight:10}} src={"http://source.unsplash.com/random/200x200/"} alt="portrait" />
              <div>
              <div style={{ color: "#fff", fontSize: 25 }}>
                {groupDetails.groupName}
              </div>
              <div style={{ color: "#fff" }}>
                {groupDetails.groupDescription}
              </div>

              <div style={{ color: "#fff" }}>
                GROUP REG NO. {groupDetails._id}
              </div>
              <div style={{ color: "#fff" }}>
                GROUP ADMIN: {groupDetails.Admin}
              </div>
              <div style={{ color: "#fff" }}>
                GROUP INITIALIZED AT: {groupDetails.createdAt}
              </div>
              </div>

              <div
                onClick={() => {
                  setLoading(true);
                  axios
                    .post(
                      "http://localhost:3000/api/v1/group/membership/request",
                      {
                        user_email: location.state.email,
                        groupName: groupDetails.groupName,
                      }
                    )
                    .then((res) => {
                      console.log(res.data);

                      swal(
                        "Group joining request sent!",
                        "Group joining request was successfully received. We will review that and respond immediately",
                        "success"
                      );
                      setTimeout(() => {
                        setLoading(false);
                      }, 2000);
                    })
                    .catch((err) => {
                      console.log(err);
                      swal(
                        "Group joining request Failed!",
                        "we could not send the request at the moment",
                        "error"
                      );
                    });
                }}
                style={{
                  height: 40,
                  justifyContent: "center",
                  cursor: "pointer",
                  alignItems: "center",
                  // borderBottomLeftRadius: 10,
                  width: 100,
                  position: "absolute",
                  paddingBottom: 10,
                  right: 0,
                  top: 0,
                  borderRadius: 10,
                  marginRight: 10,

                  marginBottom: 10,
                  backgroundColor: "#50DEC2",
                }}
              >
                <p style={{ color: "#fff", marginTop: 10, marginLeft: 30 }}>
                  Join
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/group/members", {
                    state: { groupname: groupDetails.groupName },
                  });
                }}
                style={{
                  height: 40,
                  justifyContent: "center",
                  cursor: "pointer",
                  alignItems: "center",
                  // borderBottomLeftRadius: 10,
                  width: 120,
                  position: "absolute",
                  marginBottom: 10,

                  right: 120,
                  top: 0,
                  borderRadius: 10,
                  backgroundColor: "#C59D4E",
                }}
              >
                <p style={{ color: "#fff", marginTop: 10, marginLeft: 30 }}>
                  Members
                </p>
              </div>
            </div>
          );
        })}
      </Container>
      <div style={{ height: 40 }}></div>
      <Footer />
    </div>
  );
}

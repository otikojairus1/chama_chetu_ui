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
import { useNavigate } from "react-router-dom";

export default function GroupList() {
  let dataArray = [];
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();

  React.useEffect(() => {
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
        <AppBarComponent />
        <div
          style={{
            flex: 1,
            marginTop: 250,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GridLoader
            color={"blue"}
            loading={true}
            cssOverride={override}
            size={30}
          />
          <div style={{ marginLeft: 420, fontSize: 25 }}>
            Please wait as we fetch the latest groups
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <AppBarComponent />

      <Container maxWidth="sm">
        <div style={{ fontSize: 30, marginLeft: "auto" }}>Top Group</div>

        {data.map((groupDetails) => {
          return (
            <div
              // onClick={() => console.log("working")}
              style={{
                height: 100,
                pointer: "cursor",
                marginTop: 7,
                borderRadius: 10,
                padding: 10,
                position: "relative",
                backgroundColor: "#D7DED7",
              }}
            >
              <div style={{}}>{groupDetails.groupName}</div>
              <div style={{}}>{groupDetails.groupDescription}</div>

              <div style={{}}>GROUP REG NO. {groupDetails._id}</div>
              <div style={{}}>GROUP ADMIN: {groupDetails.Admin}</div>
              <div style={{}}>
                GROUP INITIALIZED AT: {groupDetails.createdAt}
              </div>

              <div
                onClick={() => {
                  setLoading(true);
                  axios
                    .post(
                      "http://localhost:3000/api/v1/group/membership/request",
                      {
                        user_email: "otikojairus@yahoo.com",
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
                  height: 50,
                  justifyContent: "center",
                  cursor: "pointer",
                  alignItems: "center",
                  borderBottomLeftRadius: 10,
                  width: 100,
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  backgroundColor: "green",
                }}
              >
                <p style={{ color: "#fff", marginTop: 10, marginLeft: 30 }}>
                  Join Group
                </p>
              </div>
              <div
                onClick={() => {
                  navigate("/group/members", {
                    state: { groupname: groupDetails.groupName },
                  });
                }}
                style={{
                  height: 50,
                  justifyContent: "center",
                  cursor: "pointer",
                  alignItems: "center",
                  borderBottomLeftRadius: 10,
                  width: 100,
                  position: "absolute",
                  right: 120,
                  bottom: 0,
                  backgroundColor: "orange",
                }}
              >
                <p style={{ color: "#fff", marginTop: 10, marginLeft: 30 }}>
                  View Members
                </p>
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
}

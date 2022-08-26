import React from "react";
import AppBarComponent from "../components/Appbar";
import { Container } from "@mui/system";
import dp from "../Assets/dpp.png";
import { ClipLoader, GridLoader } from "react-spinners";
import axios from "axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

export default function GroupMembers() {
  const location = useLocation();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  let dataArray = [];

  React.useEffect(() => {
    console.log(location.state.groupname);
    axios
      .post("http://localhost:3000/api/v1/group/get/members", {
        groupName: location.state.groupname,
      })
      .then((response) => {
        if (response.data.responseStatusCode == 401) {
          swal(
            "No member found!",
            "The selected chama does not currently have any members. you can send a join request and be one of the first ",
            "success"
          );
        }
        // console.log(response.data);
        dataArray = response.data.data;
        console.log(dataArray);
        setData(dataArray);
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
    <div>
      <AppBarComponent />
      <Container maxWidth="sm">
        <p>Group Members</p>

        {data.map((member) => {
          return (
            <div
              style={{
                marginTop: 10,
                height: 130,
                padding: 10,
                position: "relative",
                // display: "flex",
                borderRadius: 10,
                backgroundColor: "#EEF0EE",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <img style={{ height: 100, width: 100 }} src={dp} />
                </div>
                <p style={{ fontSize: 25, marginLeft: 20, fontWeight: "bold" }}>
                  {member.memberEmail}
                </p>
              </div>

              <p style={{ margin: "auto" }}>{member.memberEmail}</p>
              <div
                style={{
                  height: 40,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  pointer: "cursor",
                  backgroundColor: "green",
                }}
              >
                {" "}
                <p style={{ color: "#fff" }}>Contribute</p>
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

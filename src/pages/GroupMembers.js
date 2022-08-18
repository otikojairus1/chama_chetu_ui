import React from "react";
import AppBarComponent from "../components/Appbar";
import { Container } from "@mui/system";
import dp from "../Assets/dpp.png";
import { ClipLoader, GridLoader } from "react-spinners";
import axios from "axios";
import swal from "sweetalert";
export default function GroupMembers() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  let dataArray = [];

  React.useEffect(() => {
    axios
      .post("http://localhost:3000/api/v1/group/get/members", {
        "groupName":"wamama"
      })
      .then((response) => {

        if( response.data.responseStatusCode == 401){
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

        <div
          style={{
            height: 130,
            padding: 10,
            display: "flex",
            backgroundColor: "#EEF0EE",
          }}
        >
          <div>
            <img style={{ height: 100, width: 100 }} src={dp} />
          </div>
          <p style={{fontSize:25, marginLeft:20, fontWeight:"bold"}}>Name</p>

        </div>
      </Container>
    </div>
  );
}

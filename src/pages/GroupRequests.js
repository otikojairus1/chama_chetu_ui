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
import TopNavbar2 from "../components/Nav/TopNav2";
import Footer from "../components/Sections/Footer";



export default function GroupRequests() {
  let dataArray = [];
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataContent, setDataContent] = React.useState(false);
let render ;
if(data.length == 0){
  render = <p>There are no requests at the moment!</p>
}
  React.useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/v1/group/view/membership/request")
      .then((response) => {
        // console.log(response.data);
        dataArray = response.data.data;
        console.log(dataArray);
        setData(dataArray);
        setDataContent(true);
        setTimeout(()=>{
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
      <TopNavbar2/>
       
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
            Please wait as we fetch the latest groups requests
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
           <TopNavbar2/>

<div style={{height:40}}></div>
      <Container maxWidth="sm">
        <div style={{ fontSize: 30, marginLeft: "auto" }}>Group Requests</div>

{render}

        {data.map((groupDetails) => {
          return (
            <div
              // onClick={() => console.log("working")}
              style={{
                height: 130,
                pointer: "cursor",
                marginTop: 7,
                borderRadius: 10,
                padding: 10,
                position: "relative",
                backgroundColor: "#DCB608",
              }}
            >
              <div style={{}}>{groupDetails.groupName}</div>
              

              <div style={{}}>GROUP REG NO. {groupDetails._id}</div>
              <div style={{}}>MEMBER EMAIL: {groupDetails.user_email}</div>
              <div style={{}}>
                REQUESTED AT: {groupDetails.createdAt}
              </div>

              <div
                onClick={() => {
                  axios
                    .post(
                      "http://localhost:3000/api/v1/group/accept/membership/request",
                      {
          
                        "request_id":groupDetails._id
                      }
                    )
                    .then((res) => {
                      console.log(res.data);
                      swal(
                        "Group membership accepted!",
                        "Group membership request accepted successfully, Member can now contribute in the group",
                        "success"
                      );
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
                  Accept Request 
                </p>
              </div>
            </div>
          );
        })}
      </Container>
      <Footer/>
    </>
  );
}

import React from "react";
import AppBarComponent from "../components/Appbar";
import { Container } from "@mui/system";
import dp from "../Assets/dpp.png";
import { ClipLoader, GridLoader } from "react-spinners";
import axios from "axios";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar2 from "../components/Nav/TopNav2";
import Footer from "../components/Sections/Footer";
// import UserCards from "../components/UserCard";
import UserCard from "../components/UserCard";


export default function GroupMembers() {
  const location = useLocation();
  let navigate = useNavigate();


  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  let dataArray = [];

  React.useEffect(() => {
    setLoading(true);
    console.log(location.state.groupname);
    axios
      .post("http://localhost:3000/api/v1/group/get/members", {
        groupName: location.state.groupname,
      })
      .then((response) => {
        setLoading(false);
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
          Please wait as we get the active group members
        </div>
        <div style={{ height: 170 }}></div>
      </div>
      <Footer />
    </div>
    );
  }
  return (
    <div  style={{ backgroundColor: "#E2E2E2" }}>
           <TopNavbar2 />
           <div style={{height:40}}></div>

      <Container maxWidth="sm">
        <div style={{height:50}}></div>
        <p style={{fontSize:20}}>Group Members</p>

        {data.map((member) => {
          return (
           <section
          style={{
            backgroundColor: "#DCB608",
            padding: 15,
            position: "relative",
            borderRadius: 10,
            elevation: 1,
            marginTop: 10,
          }}
          className="user-card"
        >
          <div style={{ display: "flex" }}>
            <img
              style={{
                borderRadius: "50%",
                height: 90,
                width: 90,
                marginLeft: 10,
                marginRight: 10,
              }}
              src={"http://source.unsplash.com/random/200x200/?portrait"}
              alt="portrait"
            />
            <div>
              <h2>Jane Doe</h2>
              <p>Phone: +254726372286</p>
              <p>E-Mail: {member.memberEmail}</p>
            </div>
          </div>
          <div
         onClick={()=>navigate('/contribute/groupmember',{state:{email:member.memberEmail}})}
            
            style={{
              position: "absolute",
              backgroundColor: "green",
              paddingBottom: 5,
              borderRadius: 10,
              paddingTop: 5,
              paddingleft: 10,
              padddingRight: 10,
              cursor: "pointer",
              top: 10,
              right: 10,
            }}
          >
            <p style={{ color: "#fff" }}>Contribute</p>
          </div>
        </section>


          );
        })}
      </Container>
      <div style={{ height: 40 }}></div>
      <Footer />
    </div>
  );
}

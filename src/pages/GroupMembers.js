import React from "react";
import AppBarComponent from "../components/Appbar";
import { Container } from "@mui/system";
import dp from "../Assets/dpp.png";

export default function GroupMembers() {
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

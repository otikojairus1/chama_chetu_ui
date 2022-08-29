import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ contact }) {
  // let navigate = useNavigate();
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
          src={contact.imgUrl}
          alt="portrait"
        />
        <div>
          <h2>{contact.name}</h2>
          <p>Phone: {contact.phone}</p>
          <p>E-Mail: {contact.mail}</p>
        </div>
      </div>
      <Link
        to="/contribute"
      
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
      </Link>
    </section>
  );
}

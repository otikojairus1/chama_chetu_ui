import React from "react";

export default function UserCard({ contact }) {
  return (
    <section style={{backgroundColor:"#DCB608", marginTop:10}} className="user-card">
      <img src={contact.imgUrl} alt="portrait" />
      <div style={{display:"flex"}}>
      <h2>{contact.name}</h2>
      <p>Phone: {contact.phone}</p>
      <p>E-Mail: {contact.mail}</p>
      </div>
   
    </section>
  );
}

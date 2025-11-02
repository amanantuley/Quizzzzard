import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile(){
  const { user } = useAuth();
  return (
    <div className="container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name || user.email}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : <p>Not logged in</p>}
    </div>
  );
}

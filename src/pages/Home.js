import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const currentUser = useSelector(state => state.currentUser);
  return (
    <div className="container">
      <p className="text-center mt-5">
        {currentUser.user && currentUser.user.user
          ? "Welcome " + currentUser.user.user.displayName
          : "Please Login"}
      </p>
    </div>
  );
}

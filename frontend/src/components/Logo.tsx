import React from "react";
import { Link } from "react-router-dom";

export default function Logo({className=""}) {
  return (
    <div>
      <Link to="/" className={`text-xl font-bold text-primary ${className}`}>
        SmartChat
      </Link>
    </div>
  );
}

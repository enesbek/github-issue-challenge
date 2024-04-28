import { Chip } from "@nextui-org/react";
import React from "react";
import "./issue.css";

const Label = ({ label }) => {
  return (
    <Chip
      key={label.id}
      size="sm"
      className="label"
      style={{
        backgroundColor: `#${label.color}`,
        color: "#FFF",
        marginRight: "4px",
      }}
    >
      {label.name}
    </Chip>
  );
};

export default Label;

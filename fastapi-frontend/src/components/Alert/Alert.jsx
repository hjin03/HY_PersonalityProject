import React from "react";
import PropTypes from "prop-types";

const Alert = ({ variant = "default", style, children }) => {
  const baseStyle = {
    padding: "10px 16px",
    borderRadius: "4px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
  };

  const variantStyles = {
    default: {
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      color: "#111827",
    },
    destructive: {
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      color: "#991b1b",
    },
  };

  const alertStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...style,
  };

  return <div style={alertStyle}>{children}</div>;
};

Alert.propTypes = {
  variant: PropTypes.oneOf(["default", "destructive"]),
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

const AlertDescription = ({ children }) => {
  return <div style={{ fontSize: "14px" }}>{children}</div>;
};

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Alert, AlertDescription };

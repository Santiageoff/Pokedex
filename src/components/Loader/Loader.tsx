import React from "react";
import "./Loader.css";

interface LoaderProps {
  size?: string;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = "30px", 
  color = "#3498db"
}) => (
  <div
    className="loader"
    style={{ 
      width: size, 
      height: size, 
      borderWidth: `calc(${size} / 10)`, // Ajusta grosor dinámicamente
      borderTopColor: color 
    }}
  ></div>
);

export default Loader;

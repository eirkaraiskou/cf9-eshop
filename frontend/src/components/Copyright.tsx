import React from "react";

const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mx-auto bg-gray-200 border-t border-gray-300 p-4 gap-2">
      <div className="flex items-center gap-2">
        <img className="w-10 h-10" src="/icons/developer.png"/>
        <p style={{ fontFamily: "'Caveat', cursive" }}>Coding Factory 9 <br/>Karaiskou Anna Eirini</p>
      </div>
      
      <p>All Rights Reserved © {currentYear}</p>
    </div>
  );
};

export default Copyright;
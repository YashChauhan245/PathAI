import React from "react";

const MainLayout = async ({ children }) => {
  return <div className="container mx-auto mt-24 mb-24 px-4 md:px-6 page-enter">{children}</div>;
};

export default MainLayout;
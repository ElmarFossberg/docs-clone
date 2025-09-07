"use client";

import NavBar from "./navbar";
import TemplateGallery from "./template-gallery";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
      </div>
    </div>
  );
};

export default Loading;

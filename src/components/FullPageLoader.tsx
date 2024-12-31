import React from "react";

const FullPageLoader: React.FC = () => {
  return (
    <div className="dark fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-green-400"></div>
      </div>
    </div>
  );
};

export default FullPageLoader;

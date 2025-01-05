import React from "react";

const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Loader com animação */}
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-green-600"></div>
        {/* Texto abaixo do loader */}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default FullPageLoader;

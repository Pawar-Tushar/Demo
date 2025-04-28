import React from 'react';

const SecurePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Secure Page</h1>
        <p className="text-gray-600 mb-6">
          You are accessing a <span className="text-green-600 font-semibold">secure route</span>.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SecurePage;

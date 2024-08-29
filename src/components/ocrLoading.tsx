import React from 'react';

// const OcrLoading: React.FC = () => {
//   return (
//     <div className="absolute bg-gradient-to-r from-green-300 via-teal-300 to-sky-400 w-[100%] h-[100%] top-0 flex items-center justify-center">
//       <div className="relative">
//         <div className="w-24 h-24 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
//         <div className="absolute top-0 left-0 w-24 h-24 border-4 border-white border-b-transparent border-solid rounded-full animate-spin-slower"></div>
//       </div>
//       <p className="text-2xl text-white absolute bottom-[40%] left-[50%] transform -translate-x-1/2 animate-pulse">
//         Loading...
//       </p>
//     </div>
//   );
// };

// export default OcrLoading;

const OcrLoading: React.FC = () => {
  return (
    <div className="absolute bg-gradient-to-r from-green-300 via-teal-300 to-sky-400 bg-opacity-80 w-[100%] h-[100%] top-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-white border-b-transparent border-solid rounded-full animate-spin-slower"></div>
      </div>
      <p className="text-2xl text-white absolute bottom-[40%] left-[50%] transform -translate-x-1/2 animate-pulse">
        Loading...
      </p>
    </div>
  );
};
export default OcrLoading;

// const OcrLoading: React.FC = () => {
//   return (
//     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(255,255,255,0.8)] z-50">
//       <div className="flex flex-col items-center">
//         <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
//         <p className="mt-2 text-sm text-gray-700">Loading...</p>
//       </div>
//     </div>
//   );
// };

// export default OcrLoading;

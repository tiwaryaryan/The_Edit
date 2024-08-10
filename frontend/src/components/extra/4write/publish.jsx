import React from 'react';

const PublishButton = ({ onClick }) => {
  return (
   <div>
     <button
      type='submit'
    //   gradient is not working
      className="bg-[#36df36] text-white font-medium py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out hover:from-blue-500 hover:to-green-400 hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
      style={{
        background: 'linear-gradient(to right, #38b2ac, #4299e1)'
      }}">
      Publish
      </button>
   </div>
  );
}

export default PublishButton;

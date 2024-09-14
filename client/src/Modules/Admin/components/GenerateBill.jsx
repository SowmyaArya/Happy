// import React from 'react';
// import axios from 'axios';

// const GenerateBill = () => {
//   const handleGenerateBill = async () => {
//     try {
//       const response = await axios.get('http://localhost:5002/api/bill/generateBill', { responseType: 'blob' });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'completed_bookings_bill.pdf');
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error('Error generating bill:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGenerateBill}>Generate Bill for Completed Bookings</button>
//     </div>
//   );
// };

// export default GenerateBill;

import React from 'react';
import axios from 'axios';

const GenerateBill = ({ onGenerateBill }) => {
  return (
    <div>
      <button onClick={onGenerateBill}>Generate Bill for Completed Bookings</button>
    </div>
  );
};

export default GenerateBill;

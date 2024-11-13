import React from 'react'
// Custom hook providing common utility functions
export const useCommon = () => {
    // Function to format an amount with commas for thousands
    const getAmountWithCommas = (amount)=>{
        return amount.toLocaleString()
    }
    // Function to format a date to 'DD/MM/YYYY' format
    const getDate = (date) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-GB', options);
  };
    


  return {
    getAmountWithCommas,
    getDate
  }
}

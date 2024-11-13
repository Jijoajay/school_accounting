import { useState } from 'react'
import request from '../Request'

export const useVoucher = () => {
    const [voucherData, setVoucherData] = useState([])
    const [voucherTotal, setVoucherTotal] = useState([])

    const handleGetAllVoucher = async(paramsItems) =>{
        try {
            const params = new URLSearchParams()
            for(const [key, value] of Object.entries(paramsItems)){
                if(value){
                    params.append(key, value)
                }
            }
            const response = await request.get(`getAllVoucher?${params.toString()}`)
            setVoucherData(response.data.data)
            setVoucherTotal(response.data.total)
        } catch (error) {
            console.log("error at fetching voucher", error.message)
        }
    }
  return {
    voucherData, voucherTotal, handleGetAllVoucher
  }
}
/**
 * useVoucher Hook
 * 
 * This custom React hook manages the state and fetching of voucher data from an API.
 * It provides functionality to retrieve all vouchers based on specified parameters and maintains
 * the state of the voucher data and the total count of vouchers.
 *
 * Usage:
 * 
 * import { useVoucher } from 'path/to/useVoucher';
 *
 * const Component = () => {
 *   const { voucherData, voucherTotal, handleGetAllVoucher } = useVoucher();
 * 
 *   // Call handleGetAllVoucher with parameters to fetch vouchers
 *   const fetchVouchers = () => {
 *     const params = { status: 'active', type: 'discount' };
 *     handleGetAllVoucher(params);
 *   };
 * 
 *   return (
 *     <div>
 *       <button onClick={fetchVouchers}>Fetch Vouchers</button>
 *       <div>Total Vouchers: {voucherTotal}</div>
 *       <ul>
 *         {voucherData.map(voucher => (
 *           <li key={voucher.id}>{voucher.name}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * };
 *
 * State:
 * - voucherData: An array containing the fetched voucher data.
 * - voucherTotal: The total number of vouchers retrieved from the API.
 *
 * Functions:
 * - handleGetAllVoucher(paramsItems): Asynchronously fetches all vouchers based on the provided parameters.
 *   Accepts an object where keys are the parameter names and values are their corresponding values.
 *   If a value is falsy, that parameter is excluded from the request.
 *
 * Error Handling:
 * Logs any errors encountered during the fetching process to the console.
 */

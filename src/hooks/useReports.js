import React, { useState } from 'react'
import request from '../Request'

export const useReports = () => {
    const [reportData, setReportData] = useState([])
    const [reportTotal, setReportTotal] = useState(0)
    
    const handleGetAllReports = async(paramItems)=>{
        try {
            const params = new URLSearchParams();

            for(const [key, value] of Object.entries(paramItems)){
                if(value){
                    params.append(key, value);
                }
            }
            const response = await request.get(`getAllReports?${params.toString()}`)
            setReportData(response.data.data)
            setReportTotal(response.data.total)
        } catch (error) {
            console.log("error at fetching reports", error)
        }
    }
  return {
    reportData, reportTotal, handleGetAllReports
  }
}

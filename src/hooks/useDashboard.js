import React, { useState } from 'react'
import request from '../Request'

export const useDashboard = () => {
    const [dashBoard, setDashboard] = useState([])

    const handleFetchDashboardData = async()=>{
        try {
            const response = await request.get("getTotalAmount")
            setDashboard(response.data)
        } catch (error) {
            console.log("error at dashboard", error)
        }
    }

  return {
    dashBoard,
    handleFetchDashboardData,
  }
}

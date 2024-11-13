import React, { useState } from 'react'
import request from '../Request'

export const useJournal = () => {

    const [journalData, setJournalData] = useState([])
    const [journalTotal, setJournalTotal] = useState(0)

    // accountHead, subAccountHead, rp, transactionMode, page,limit, from, to, search

    const handleGetAllJournalData = async(paramItems) =>{
        try {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(paramItems)) {
                if (value) {
                    params.append(key, value);
                }
            }
    
            const response = await request.get(`getJournalEntry?${params.toString()}`);
            setJournalData(response.data.data);
            setJournalTotal(response.data.total)
        } catch (error) {
            console.log("error at openingBalance", error);
        }
    }

  return {
    journalData, journalTotal, handleGetAllJournalData
  }
}

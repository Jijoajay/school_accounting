import { useState, useEffect } from 'react';
import request from "../Request"; // Adjust the import path according to your project structure

// Custom hook to fetch account heads and sub-account heads from the API
const useAccountHeads = () => {
    const [accountHeads, setAccountHeads] = useState([]);
    const [subAccountHeads, setSubAccountHeads] = useState([]);
    const [selectedHead, setSelectedHead] = useState("")

    useEffect(() => {
        const fetchAccountHeads = () => {
            request.get("getAccountMasterWithoutLimit")
                .then((response) => {
                    const data = response.data.data; 
                    const uniqueAccountHeads = [...new Set(data.map(account => account.accountHead))];
                    setAccountHeads(uniqueAccountHeads);
                })
                .catch((err) => {
                    console.error("Error fetching account heads:", err);
                });
        };

        fetchAccountHeads(); 
    }, []);

    useEffect(()=>{
        if(selectedHead){
            const fetchSubAccountHead = async()=>{
                try {
                    const response = await request.get(`getSubAccountByHead/${selectedHead}`)
                    setSubAccountHeads(response.data.data)
                    console.log("subAccountHead",response.data )
                } catch (error) {
                    console.log("error while getting the subAccountHead", error.message)
                }
            }
            fetchSubAccountHead()
        }
    },[selectedHead])

    return { accountHeads, subAccountHeads, setSubAccountHeads, setSelectedHead }; 
};

export default useAccountHeads;

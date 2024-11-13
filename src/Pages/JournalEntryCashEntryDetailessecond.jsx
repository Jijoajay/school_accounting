import React, { useEffect, useState } from "react";
import request from "../Request";
import { useCommon } from "../hooks/useCommon";

function JournalEntryCashEntryDetailessecond({ accountHead }) {
    const [cashData, setCashData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {getAmountWithCommas} = useCommon()

    useEffect(() => {
        if (accountHead) {
            const handleGetSingleJournal = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await request.get(`getAccountHeadAmount/${accountHead}`);
                    const fetchedData = response.data; 
                    setCashData(fetchedData);
                } catch (error) {
                    console.error("Error fetching cash entry details:", error);
                } finally {
                    setLoading(false);
                }
            };

            handleGetSingleJournal();
        }
    }, [accountHead]);


    if (error) {
        return <div>{error}</div>;
    }
    const { accountHead: head} = cashData || {};
    console.log("cashData", cashData)

    return (
        <div className="mt-3">
            {
                cashData && Object.keys(cashData)?.length > 0 &&
                <>

                    <h5><b className="title " style={{textTransform:'uppercase'}}>{head}</b></h5>


                    <div className="d-flex justify-content-start" style={{ textAlign: "center",alignItems:'center' }}>
                        <h5><b className="title">C/B CASH </b></h5>
                        <p><b className="ms-3 title">:</b></p>
                        <h5 className="mx-3"><b>₹ {getAmountWithCommas(cashData?.amount?.cash || 0)}</b></h5>
                    </div>


                    <div className="d-flex justify-content-start" style={{ textAlign: "center",alignItems:'center' }}>
                        <h5><b className="title">C/B BANK </b></h5>
                            <p><b className="ms-3 title">:</b></p>
                        <h5 className="mx-3"><b>₹ {getAmountWithCommas(cashData?.amount?.bank || 0)}</b></h5>
                    </div>
                    <div className="d-flex justify-content-start" style={{ textAlign: "center" ,alignItems:'center'}}>
                        <h5><b className="title">C/B DIO </b></h5>
                        <p><b className="ms-4 ps-3 title">:</b></p>
                        <h5 className="mx-3"><b>₹ {getAmountWithCommas(cashData?.amount?.diocesan || 0)}</b></h5>
                    </div>
                    
                </>
            }
        </div>
    );
}

export default JournalEntryCashEntryDetailessecond;

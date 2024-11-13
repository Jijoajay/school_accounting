import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useAccountHeads from '../hooks/useAccountHeads';

function AccountHead({ onSelect, isTitle=true, data }) {
    const {accountHeads} = useAccountHeads()
    const [selectedHead, setSelectedHead] = useState("");

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedHead(selectedValue);
        onSelect(selectedValue);
    };

    useEffect(()=>{
        if(data){
            setSelectedHead(data)
        }
    },[data])

    return (
        <div>
            <InputGroup className="InputGroupText">
                {
                    isTitle &&
                    <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "#FFFFFF" }}>
                        Account Head :
                    </InputGroup.Text>
                }          
                <Form.Select
                    aria-describedby="basic-addon1"
                    style={{ borderLeft: isTitle ? "none" : "",textTransform:'capitalize' }}
                    value={selectedHead}
                    onChange={handleSelectChange}
                    
                >
                    <option value="" style={{textTransform:'capitalize'}}>All</option>
                    {accountHeads.map((accountHead, index) => (
                        <option key={index} value={accountHead} style={{textTransform:'capitalize'}}>
                            {accountHead}
                        </option>
                    ))}
                </Form.Select>
            </InputGroup>
        </div>
    );
}

export default AccountHead;

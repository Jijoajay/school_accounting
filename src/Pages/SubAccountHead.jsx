import React, { useState } from 'react'
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import useAccountHeads from '../hooks/useAccountHeads';


export const SubAccountHead = ({onSelect, isTitle=true}) => {
    const {subAccountHeads} = useAccountHeads()
    const [selectedHead, setSelectedHead] = useState("");

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedHead(selectedValue);
        onSelect(selectedValue); 
    };

  return (
    <InputGroup>
        {
            isTitle &&
            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "#FFFFFF" }}>
                Sub Account Head :
            </InputGroup.Text>
        }
        <Form.Select 
            aria-describedby="basic-addon1" 
            style={{ borderLeft: isTitle ? "none" : "" ,textTransform:'capitalize'}}
            value={selectedHead}
            onChange={handleSelectChange}
        >
            <option value="" style={{textTransform:'capitalize'}}>All</option>
            {
                subAccountHeads.map((subAccountHead, index) => (
                    <option value={subAccountHead} key={index} style={{textTransform:'capitalize'}}>{subAccountHead}</option>
                ))
            }
        </Form.Select>
    </InputGroup>
  )
}

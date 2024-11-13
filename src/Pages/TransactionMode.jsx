import React from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const CustomTableColumn = ({title, selectedItem, setSelectedItem}) => {

    const onChange = (e)=>{
        const selectedValue = e.target.value;
        setSelectedItem(selectedValue);
    }

    const items = title === "Receipt/Payment :" ? ["Receipt", "Payment"] : ["Cash", "Bank", "Diocesan"]
  return (
    <InputGroup    >
        <InputGroup.Text
            id="basic-addon1"
            style={{ backgroundColor: "#FFFFFF" }}
        >
            {title}
        </InputGroup.Text>
        <Form.Select
            aria-describedby="basic-addon1"
            style={{ borderLeft: "none" }}
            value={selectedItem}
            onChange={onChange}
        >
            <option value="">All</option>
            {
                items.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                ))
            }
        </Form.Select>
    </InputGroup>
  )
}

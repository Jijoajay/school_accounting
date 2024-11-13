import React from 'react'
import Form from "react-bootstrap/Form";

export const Search = ({search, setSearch}) => {

    const onChange = (e)=>{
        setSearch(e.target.value)
    }
  return (
    <Form.Control
        id="Search"
        type="text"
        placeholder="Search"
        name="Search"
        value={search}
        onChange={onChange}
        style={{ fontSize: "small" }}
    />
  )
}

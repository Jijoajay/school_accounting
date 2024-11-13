import React from 'react'

export const NoData = ({model}) => {
  return (
    model.length === 0 && ( 
        <div style={{ width: "100%", display: "flex", paddingTop: "10px", justifyContent: "center", alignItems: "center" }}>
            <p>No data found</p>
        </div>
    )
  )
}

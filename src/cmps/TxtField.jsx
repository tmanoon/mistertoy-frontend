import { TextField } from "@mui/material"
import React, { useState } from "react"

export function TxtField({ by, setFilterByToEdit }) {
  const [name, setName] = useState("")

  function handleChange(e) {
    e.stopPropagation()
    const { value } = e.target
    setName(value)
    setFilterByToEdit(prevFilter => ({ ...prevFilter, ["name"]: value }))
  }

  return (
    <div
      style={{
        marginLeft: "10px",
        padding: 0
      }}
    >
      <TextField
        value={name}
        placeholder={` Filter by ${by}`}
        onChange={handleChange}
        inputProps={{ style: { padding: '0.25em' },}}
    
      />
    </div>
  )
}


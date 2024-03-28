import { TextField } from "@mui/material"
import React, { useState } from "react"

export function TxtField({ by, filterByToEdit, setFilterByToEdit }) {
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
      }}
    >
      <TextField
        value={name}
        label={`By ${by}`}
        onChange={handleChange}
      />
    </div>
  )
}


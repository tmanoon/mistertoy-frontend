import React from 'react'
import { Select, MenuItem } from "@mui/material"
import { useState } from 'react'

export function SelectEl({ options, setFilterByToEdit, name }) {
    const [currChoice, setCurrChoice] = useState("all")

    function handleChange(e) {
        const { value } = e.target
        console.log(value)
        setCurrChoice(value)
        console.log(currChoice)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    return (
            <Select
                onChange={handleChange}
                sx={{
                    marginTop: 0,
                    width: 150,
                    height: 30,
                }}
                value={currChoice}
            >
                <MenuItem value={"all"}>Choose</MenuItem>
                {options.map(option => {
                   return  <MenuItem key={option.status} value={option.value || ''}>
                        {option.status}
                    </MenuItem>
})}
            </Select>
    )
}

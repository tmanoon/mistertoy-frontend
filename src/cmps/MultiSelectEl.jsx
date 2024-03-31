import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'

export function MultiSelectEl({ options, by, setFilterByToEdit }) {

    const [selectedValues, setSelectedValues] = useState([])
    const labels = [...options]

    useEffect(() => {
        return () => {
            clearFilters()
        }
    }, [])

    function clearFilters() {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [by.toLowerCase()]: '' }))
        setSelectedValues([])
    }

    function handleChange(event, selectedOptions) {
        event.stopPropagation()
        setSelectedValues(selectedOptions)
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [by.toLowerCase()]: selectedOptions }))
    }

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
             sx={{
                '& .MuiInputBase-root': {
                  padding: 0,
                }
              }}
                multiple
                id="tags-outlined"
                options={labels}
                getOptionLabel={(option) => option}
                value={selectedValues}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={`${by}`}
                    />
                )}
            />
        </Stack>
    )
}
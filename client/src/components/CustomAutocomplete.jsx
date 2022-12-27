import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CustomAutocomplete = ({setState, label, options, ...props}) => {
    const handleChange = (e) => {
        setState(e.target.value);
    }
    
    const handleAutocomplete = (_, values) => {
        if (values && typeof values === 'object') setState(values.label)
    }

    return (
        <Autocomplete 
            freeSolo
            onChange={handleAutocomplete}
            options={options}
            sx={{flexGrow: 1}}
            {...props}
            renderInput={(params) => <TextField name={label} {...params} onChange={handleChange} label={label} variant="standard"/>}
        />
    );

}

export default CustomAutocomplete;
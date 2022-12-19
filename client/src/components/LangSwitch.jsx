import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function LangSwitch() {
  const [alignment, setAlignment] = React.useState('RU');
    
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx = {{mr: 4}}
    >
      <ToggleButton value="RU">RU</ToggleButton>
      <ToggleButton value="EN">EN</ToggleButton>
    </ToggleButtonGroup>
  );
}
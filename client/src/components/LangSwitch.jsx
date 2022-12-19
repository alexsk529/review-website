import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';

export default function LangSwitch({mr}) {
  const [alignment, setAlignment] = React.useState(localStorage.getItem('i18nextLng') || 'ru');
    
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    i18n.changeLanguage(newAlignment)
  };

  const { i18n } = useTranslation();
  
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx = {{mr: mr}}
    >
      <ToggleButton value="ru">RU</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );
}
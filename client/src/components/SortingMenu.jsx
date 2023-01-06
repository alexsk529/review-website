import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { changeIndex } from '../redux/reducers/selectedSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SortingMenu = ({ options }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    const dispatch = useDispatch();
    const selectedIndex = useSelector(state => state.selected)

    const handleMenuItemClick = (event, index) => {
        dispatch(changeIndex(index));
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            return
        }
        setOpen(false)
    }

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleToggle}> {options[selectedIndex]} </Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="split-button-menu"
                                    autoFocusItem
                                >
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === 0}
                                            selected={index === selectedIndex}
                                            onClick={(e) => handleMenuItemClick(e, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );

}

export default SortingMenu;
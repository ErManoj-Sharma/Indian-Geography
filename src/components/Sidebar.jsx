"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { SidebarOptions } from '@/constant/SideBarOption';
export default function SideBar({ open, toggleDrawer, handleSelectionChange }) {
  const [checked, setChecked] = React.useState([]);
  
  const handleToggle = (option_code) => () => {
    const currentIndex = checked.indexOf(option_code);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(option_code);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleSelectionChange(newChecked); // Pass updated codes to parent
  };
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
              <List>
          {SidebarOptions.map((option, index) => (
            <ListItem key={option.option_code} disablePadding>
              <ListItemButton onClick={handleToggle(option.option_code)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(option.option_code)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={option.option_name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}

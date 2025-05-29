import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar({ toggleDrawer }) {
    return (
        <Box className="absolute top-0 left-0  bg-opacity-80 z-10 " sx={{
            flexGrow: 1, backgroundColor: '#ffffff00',
            boxShadow: 'none'
        }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: '#ffffff00',
                    boxShadow: 'none'
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'black' }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: 'black',
                            fontWeight: 'bold'
                        }}
                    >
                        GeoGraphy & Maps
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

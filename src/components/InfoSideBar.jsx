"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hide } from "@/Slices/InfoSideBarSlice";
import { Typography } from '@mui/material';
export default function InfoSideBar() {
    const dispatch = useDispatch();
    const showInfoSideBar = useSelector((state) => state?.infoSideBar?.open);
    const data = useSelector((state) => state?.infoSideBar?.data);
    return (
        <Drawer open={showInfoSideBar} onClose={() => dispatch(hide())}>
            <Box
                sx={{ width: 300 }}
                role="presentation"
                onClick={() => dispatch(hide())}
            >
                {data ? (
                    <>
                        <Typography variant="h6" sx={{ padding: 2 }}>
                            {data.title}
                        </Typography>
                        <Divider />
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="body1"><strong>State:</strong> {data.state}</Typography>
                            <Typography variant="body2" sx={{ marginTop: 1 }}>{data.desc}</Typography>
                            <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
                                Coordinates: {data.lat}, {data.lng}
                            </Typography>
                        </Box>
                        <Divider /> {/* 👈 Breaker line at the bottom */}
                    </>
                ) : (
                    <>
                        <Typography sx={{ padding: 2 }}>No data selected.</Typography>
                        <Divider /> {/* 👈 Breaker line even if data is missing */}
                    </>
                )}
            </Box>
        </Drawer>
    );
}

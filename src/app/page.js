"use client";
import * as React from 'react';
import Sidebar from "@/components/Sidebar"
import TopBar from "@/components/TopBar";
import { useState } from "react";
import Typography from '@mui/material/Typography';
import Map from '@/components/Map';
export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleSelectionChange = (codes) => {
    setSelectedCodes(codes);
  };

  return (
    <div >
      <TopBar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
      {selectedCodes.length > 0 && (
        selectedCodes.map((code) => (
          <Typography key={code} variant="h6" gutterBottom sx={{ color: 'white' }}>
            {code}
          </Typography>
        ))
      )}
      <Map/>
      <main className="flex">
        <Sidebar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} handleSelectionChange={handleSelectionChange} />
      </main>
    </div>
  );
}

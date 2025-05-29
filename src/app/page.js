"use client";
import * as React from 'react';
import Sidebar from "@/components/Sidebar"
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
     <Map open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} selectedCodes={selectedCodes}/>
      <main className="flex">
        <Sidebar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} handleSelectionChange={handleSelectionChange} />
      </main>
    </div>
  );
}

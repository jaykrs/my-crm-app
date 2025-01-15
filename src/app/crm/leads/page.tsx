"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableData from "@/components/Tables/TableData";
import { useState , useEffect} from 'react';
import axios from "axios";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const TablesPage = () => {
  const [leads, setLeads] = useState({});
  useEffect(() => {
    fetchleadsData();
    console.log("Page Rendered !!");
    console.log(leads);
}, [])

  const fetchleadsData = async() => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.get(  "/api/lead", { 'headers': { 'Authorization': 'Bearer '+ token} })
        .then(result => {
          if (result && result.request.status === 200) {
            setLeads(result.data.data);
          }
        })
    } catch (e) {
     console.log(e);
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableData />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

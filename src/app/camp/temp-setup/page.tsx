import { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import toastComponent from '@/components/ToastComponent';
interface Lead {
    Source: string;
    Status: string;
    AssignedTo: string;
    Description: string;
    CompanyInformation: {
        CompanyName: string,
        Industry: string,
        Revenue: string,
    };
    ContactInformation: {
        Name: string,
        Phone: string,
        Email: string,
        Address: string
    };
    LeadID: string;
    action: string;

}
const LeadModelView: React.FC = ({ }) => {


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg overflow-auto" style={{ margin: '8% 0 0 15%' }}>
                    <div className="mt-4 max-h-[80vh] overflow-auto">
                        <div className="grid grid-cols-5 gap-8">
                            <div className="col-span-12">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="p-7">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeadModelView;

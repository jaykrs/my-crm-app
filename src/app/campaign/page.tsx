'use client'; // Ensure client-side rendering

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TemplateView from "@/components/Model/templateView";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CampaignProp { };
interface temProps {
    temName: string;
    temCode: string;
    userName: string;
    temID: string;
}

const Campaign: React.FC<CampaignProp> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<temProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        getTemplateList();
    }, []);


    const getTemplateList = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get('/api/template', {
                headers: { Authorization: "Bearer " + token },
            });
            setState(response.data.data);
        } catch (err) {
            console.log("Something went wrong fetching templates!");
        }
    };
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const RedirectToTempEditor = (temp: string) => {
        // Update the redirection logic, including the temp parameter
        router.push(`/template?temp=${temp}`);
    };

    return (
        <DefaultLayout>
            <div>Campaign</div>
            <div className="flex w-full justify-end">
                <button
                    className="w-[130px] h-[50px] bg-blue-500 text-white border border-black rounded-[4%] hover:bg-blue-900"
                    onClick={openModal}
                >
                    New Template
                </button>
            </div>

            {/* Uncomment and use TemplateView if needed */}
            {/* {isOpen && <TemplateView />} */}

            <div className="w-full flex justify-center gap-[100px]">
                <p className="text-blue-500 text-[25px] w-[100px] bg-[#f8f6f6] cursor-pointer text-center">
                    Email
                </p>
                <p className="text-blue-500 text-[25px] w-[100px] bg-[#f8f6f6] cursor-pointer text-center">
                    WhatsApp
                </p>
            </div>

            <div>
                {/* <Link href={"/template?name=blank"}> */}
                <div onClick={() => RedirectToTempEditor('blank')}
                    className="w-[200px] h-[200px] bg-[#fff] hover:bg-[#fcf8fc] cursor-pointer"
                >
                </div>
                {
                    state.length > 0 ? state.map((data,index)=>{
                       return(
                        <>
                        
                        </>
                       )
                    }) : ""
                }
            </div>
        </DefaultLayout>
    );
};

export default Campaign;

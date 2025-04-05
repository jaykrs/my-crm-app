'use client'; // Ensure client-side rendering

// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import TemplateView from "@/components/Model/templateView";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// // import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// interface CampaignProp { };
// interface temProps {
//     temName: string;
//     temCode: string;
//     userName: string;
//     temID: string;
// }

// const Campaign: React.FC<CampaignProp> = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [state, setState] = useState<temProps[]>([]);
//     const router = useRouter();

//     useEffect(() => {
//         getTemplateList();
//     }, []);


//     const getTemplateList = async () => {
//         const token = localStorage.getItem("accessToken");
//         try {
//             const response = await axios.get('/api/template', {
//                 headers: { Authorization: "Bearer " + token },
//             });
//             setState(response.data.data);
//         } catch (err) {
//             console.log("Something went wrong fetching templates!");
//         }
//     };
//     const openModal = () => {
//         setIsOpen(true);
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const RedirectToTempEditor = (temp: string) => {
//         // Update the redirection logic, including the temp parameter
//         router.push(`/template?temp=${temp}`);
//     };

//     console.log("state", state)

//     return (
//         <DefaultLayout>
//             <div>Campaign</div>
//             <div className="flex w-full justify-end">
//                 <button
//                     className="w-[130px] h-[50px] bg-blue-500 text-white border border-black rounded-[4%] hover:bg-blue-900"
//                     onClick={openModal}
//                 >
//                     New Template
//                 </button>
//             </div>

//             {/* Uncomment and use TemplateView if needed */}
//             {/* {isOpen && <TemplateView />} */}

//             <div className="w-full flex justify-center gap-[100px]">
//                 <p className="text-blue-500 text-[25px] w-[100px] bg-[#f8f6f6] cursor-pointer text-center">
//                     Email
//                 </p>
//                 <p className="text-blue-500 text-[25px] w-[100px] bg-[#f8f6f6] cursor-pointer text-center">
//                     WhatsApp
//                 </p>
//             </div>

//             <div className="w-full flex justify-start items-start gap-4 flex-wrap">
//                 {/* <Link href={"/template?name=blank"}> */}
//                 <div onClick={() => RedirectToTempEditor('blank')}
//                     className="w-[200px] h-[200px] flex justify-center items-center bg-[#fff] hover:bg-[#fcf8fc] cursor-pointer text-align-center"
//                 >
//                      Start from scratch
//                 </div>
//                 {
//                     state.length > 0 ? state.map((data,index)=>{

//                        return(
//                         <div className="">

//                           <div id="temp" className="w-[200px] h-[400px] bg-[#fff]">
//                               <p dangerouslySetInnerHTML={{__html:data.temCode}} ></p>
//                           </div>
//                           <label htmlFor="#temp" className="text-center">{data.temName}</label>
//                         </div>
//                        )
//                     }) : ""
//                 }
//             </div>
//         </DefaultLayout>
//     );
// };

// export default Campaign;


'use client'; // Ensure client-side rendering

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TemplatePreView from "@/components/Model/templatePreView";
import { IoEyeOutline } from "react-icons/io5";
interface CampaignProp {
    closeModal: () => Promise<void>;
};
interface temProps {
    temName: string;
    temCode: string;
    userName: string;
    temID: string;
}

const Campaign: React.FC<CampaignProp> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<temProps[]>([]);
    const [tempPreview, setTempPreview] = useState<string>("");
    const router = useRouter();
    const [zoom, setZoom] = useState(1); // Default zoom set to 1 (100%)
    const contentRef = useRef<HTMLDivElement | null>(null); // Ref for the content container

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

    const closeModal = (): Promise<void> => {
        setIsOpen(false);
        setTempPreview("");  // Clears the preview
        return Promise.resolve();  // Returning a resolved promise
    };

    const RedirectToTempEditor = (temp: string) => {
        router.push(`/template?temp=${temp}`);
    };

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, 2)); // Increase zoom, max 2x
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5)); // Decrease zoom, min 0.5x
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

            <div className="w-full flex justify-center gap-[100px]">
                <p className="text-blue-500 text-[25px] w-[100px] bg-[#f8f6f6] cursor-pointer text-center">
                    Email
                </p>
                <p className="text-blue-500 text-[25px] w-[100px] bg-[#f8f6f6] cursor-pointer text-center">
                    WhatsApp
                </p>
            </div>

            {/* Zoom Controls */}
            {/* <div className="flex justify-center gap-4 mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleZoomIn}
                >
                    Zoom In
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleZoomOut}
                >
                    Zoom Out
                </button>
            </div> */}
            <div className="w-full flex justify-center items-center">
                <div className="w-full flex justify-start items-start gap-4 flex-wrap mt-4">
                    <div onClick={() => RedirectToTempEditor('<body></body>')}
                        className="w-[350px] h-[500px] flex justify-center items-center bg-[#fff] hover:bg-[#fcf8fc] cursor-pointer text-align-center"
                    >
                        Start from scratch
                    </div>
                    {
                        state.length > 0 ? state.map((data, index) => {
                            return (
                                <div key={index}>
                                    {/* Template content */}
                                    <div className="w-[350px] flex justify-end gap-[5px] px-5 bg-[#7c86c0] text-[#fff]">
                                        <p >{data.temName}</p>
                                        <p onClick={() => {
                                            setIsOpen(true);
                                            setTempPreview(data.temCode)
                                        }}><IoEyeOutline size={20} /></p>
                                    </div>
                                    <div
                                        onClick={() => RedirectToTempEditor(data.temCode)}
                                        ref={contentRef}
                                        className="w-[350px] h-[475px] bg-[#fff] overflow-auto"
                                    >
                                        <div
                                            className="template-content"
                                            style={{
                                                transform: `scale(${zoom})`, // Apply the zoom effect
                                                transformOrigin: 'top left', // Keep zoom at the top-left corner
                                                transition: 'transform 0.3s ease', // Smooth transition for zoom effect
                                            }}
                                            dangerouslySetInnerHTML={{ __html: data.temCode }}
                                        ></div>
                                    </div>

                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>
            {isOpen &&
                <TemplatePreView tempPreview={tempPreview} closeModal={closeModal} />
            }
        </DefaultLayout>
    );
};

export default Campaign;




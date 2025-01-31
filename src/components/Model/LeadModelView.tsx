import { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
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
interface LeadModelView {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: () => void;
    closeModal: () => void;
    viewLead: Lead;
    setViewLead: React.Dispatch<React.SetStateAction<Lead>>;
    fetchleadsData: () => Promise<void>;
    handleAssign : (id?: any, action?: any)=> Promise<void>;
}
const LeadModelView: React.FC<LeadModelView> = ({ isOpen, setIsOpen, openModal, closeModal, viewLead, setViewLead, fetchleadsData,handleAssign }) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setViewLead((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const handleUpdateLead = (e: React.FormEvent) => {
        e.preventDefault();
        if (viewLead !== null && viewLead.LeadID !== "") {
            axios.put("/api/lead?LeadID=" + viewLead.LeadID, {
                Source: viewLead.Source,
                Status: viewLead.Status,
                AssignedTo: viewLead.AssignedTo,
                Description: viewLead.Description,
                CompanyInformation: {
                    CompanyName: viewLead.CompanyInformation.CompanyName,
                    Industry: viewLead.CompanyInformation.Industry,
                    Revenue: viewLead.CompanyInformation.Revenue,
                },
                ContactInformation: {
                    Name: viewLead.ContactInformation.Name,
                    Phone: viewLead.ContactInformation.Phone,
                    Email: viewLead.ContactInformation.Email,
                    Address: viewLead.ContactInformation.Address
                }
            }, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
                .then(res => {
                    if (res.status === 200) {
                        alert(res.data.message);
                        closeModal();
                        fetchleadsData();
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    console.log(err.message);
                })
        }else{
            axios.post("/api/lead", {
                Source: viewLead.Source,
                Status: viewLead.Status,
                AssignedTo: viewLead.AssignedTo,
                Description: viewLead.Description,
                CompanyInformation: {
                    CompanyName: viewLead.CompanyInformation.CompanyName,
                    Industry: viewLead.CompanyInformation.Industry,
                    Revenue: viewLead.CompanyInformation.Revenue,
                },
                ContactInformation: {
                    Name: viewLead.ContactInformation.Name,
                    Phone: viewLead.ContactInformation.Phone,
                    Email: viewLead.ContactInformation.Email,
                    Address: viewLead.ContactInformation.Address
                }
            }, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
                .then(res => {
                    if (res.status === 201) {
                        alert(res.data.message);
                        closeModal();
                        fetchleadsData();
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    console.log(err.message);
                })
        }
    }
    return (
        <>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg overflow-auto" style={{ margin: '8% 0 0 15%' }}>
                        <div className="mt-4 max-h-[80vh] overflow-auto">
                            <div className="grid grid-cols-5 gap-8">
                                <div className="col-span-12">
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="p-7">
                                            {
                                                viewLead !== null ?
                                                    <form onSubmit={handleUpdateLead} >
                                                        <div id="contactInfo" className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                            <div className="w-full sm:w-1/3">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Source"
                                                                >
                                                                    Source
                                                                </label>
                                                                <select id="dropdown" value={viewLead.Source} onChange={
                                                                    (e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            Source: e.target.value
                                                                        })
                                                                    }
                                                                }>
                                                                    <option value="">Select a source</option>
                                                                    <option value="Website">Website</option>
                                                                    <option value="Referral">Referral</option>
                                                                    <option value="Event">Event</option>
                                                                    <option value="Other">Other</option>
                                                                </select>
                                                            </div>
                                                            <div className="w-full sm:w-1/3">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Status"
                                                                >
                                                                    Status
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="Status"
                                                                    id="Status"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.Status}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/3">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="AssignTo"
                                                                >
                                                                    AssignTo
                                                                </label>
                                                                <button onClick={()=>{
                                                                    viewLead.AssignedTo === localStorage.getItem("username")? handleAssign(viewLead.LeadID,"remove") : handleAssign(viewLead.LeadID,"assign")
                                                                }}>{viewLead.AssignedTo === localStorage.getItem("username")? "Remove": "Assign"}</button>
                                                                {/* <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="AssignTo"
                                                                    id="AssignTo"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.AssignedTo}
                                                                /> */}
                                                                {/* <select id="dropdown" value={viewLead.AssignedTo} onChange={
                                                                    (e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            AssignedTo: e.target.value
                                                                        })
                                                                    }
                                                                }>
                                                                    <option value="">Select a source</option>
                                                                    <option value="Website">Website</option>
                                                                    <option value="admin">Admin</option>
                                                                </select> */}
                                                            </div>
                                                        </div>
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="contactInfo"
                                                        >
                                                            Contact Information
                                                        </label>
                                                        <div id="contactInfo" className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Name"
                                                                >
                                                                    Name
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="Name"
                                                                    onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            ContactInformation: {
                                                                                ...viewLead.ContactInformation,
                                                                                Name: e.target.value
                                                                            }
                                                                        })
                                                                    })}
                                                                    id="Name"
                                                                    placeholder=''
                                                                    defaultValue={viewLead.ContactInformation?.Name}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Phone"
                                                                >
                                                                    Phone
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="number"
                                                                    name="Phone"
                                                                    id="Phone"
                                                                    onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            ContactInformation: {
                                                                                ...viewLead.ContactInformation,
                                                                                Phone: e.target.value
                                                                            }
                                                                        })
                                                                    })}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.ContactInformation?.Phone}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Email"
                                                                >
                                                                    Email
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="Email"
                                                                    id="Email"
                                                                    onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            ContactInformation: {
                                                                                ...viewLead.ContactInformation,
                                                                                Email: e.target.value
                                                                            }
                                                                        })
                                                                    })}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.ContactInformation?.Email}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Address"
                                                                >
                                                                    Address
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="Address"
                                                                    id="Address"
                                                                    onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            ContactInformation: {
                                                                                ...viewLead.ContactInformation,
                                                                                Address: e.target.value
                                                                            }
                                                                        })
                                                                    })}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.ContactInformation?.Address}
                                                                />
                                                            </div>
                                                        </div>
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="comInfo"
                                                        >
                                                            Company Information
                                                        </label>
                                                        <div id="comInfo" className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                            <div className="w-full sm:w-1/3">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="companyName"
                                                                >
                                                                    Name
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="companyName"
                                                                    id="companyName"
                                                                    onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            CompanyInformation: {
                                                                                ...viewLead.CompanyInformation,
                                                                                CompanyName: e.target.value
                                                                            }
                                                                        })
                                                                    })}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.CompanyInformation?.CompanyName}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/3">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Industry"
                                                                >
                                                                    Industry
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="Industry"
                                                                    id="Industry"
                                                                    onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            CompanyInformation: {
                                                                                ...viewLead.CompanyInformation,
                                                                                Industry: e.target.value
                                                                            }
                                                                        })
                                                                    })}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.CompanyInformation?.Industry}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/3">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Revenue"
                                                                >
                                                                    Revenue
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="number"
                                                                    name="Revenue"
                                                                    id="Revenue"
                                                                    onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setViewLead({
                                                                            ...viewLead,
                                                                            CompanyInformation: {
                                                                                ...viewLead.CompanyInformation,
                                                                                Revenue: e.target.value
                                                                            }
                                                                        })
                                                                    })}
                                                                    placeholder=""
                                                                    defaultValue={viewLead.CompanyInformation?.Revenue}
                                                                />
                                                            </div>

                                                        </div>


                                                        <div className="mb-5.5">
                                                            <label
                                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                htmlFor="Description"
                                                            >
                                                                Description
                                                            </label>
                                                            <div className="relative">
                                                                <span className="absolute left-4.5 top-4">
                                                                    <svg
                                                                        className="fill-current"
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                    >
                                                                        <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                                                fill=""
                                                                            />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                                                fill=""
                                                                            />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_88_10224">
                                                                                <rect width="20" height="20" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>

                                                                <textarea
                                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    name="Description"
                                                                    id="Description"
                                                                    rows={6}
                                                                    onChange={handleChange}
                                                                    placeholder="Write your Description here"
                                                                    defaultValue={viewLead.Description}
                                                                ></textarea>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-end gap-4.5">
                                                            <button
                                                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                                onClick={closeModal}
                                                            >
                                                                Cancel
                                                            </button>
                                                            {
                                                                viewLead.LeadID !== "" ?
                                                                    <button
                                                                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                                                        type="submit"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    : <button
                                                                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                                                        type="submit"
                                                                    >
                                                                        Create
                                                                    </button>
                                                            }
                                                        </div>
                                                    </form>
                                                    :
                                                    ""
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default LeadModelView;

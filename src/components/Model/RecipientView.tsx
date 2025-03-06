import { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import toastComponent from '../ToastComponent';
interface RecipientViewProps {
    recipientID: string,
    name: string,
    email: string,
    phone: string,
    category: string,
    city: string,
    tag: string,
    additionalData: string
}
interface RecipientView {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: () => void;
    closeModal: () => void;
    RecipientViewState: RecipientViewProps;
    setRecipientViewState: React.Dispatch<React.SetStateAction<RecipientViewProps>>;
    fetchleadsData: () => Promise<void>;
}
const RecipientView: React.FC<RecipientView> = ({ isOpen, setIsOpen, openModal, closeModal, RecipientViewState, setRecipientViewState, fetchleadsData }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setRecipientViewState((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleUpdateLead = (e: React.FormEvent) => {
        e.preventDefault();
        // let url = RecipientViewState.recipientID !== "" ? "/api/recipient?id=" + RecipientViewState.recipientID : "/api/recipient";
        if (RecipientViewState !== null && RecipientViewState.recipientID !== "") {
            axios.put("/api/recipient?id=" + RecipientViewState.recipientID, {
                name: RecipientViewState.name,
                email: RecipientViewState.email,
                phone: RecipientViewState.phone,
                category: RecipientViewState.category,
                city: RecipientViewState.city,
                tag: RecipientViewState.tag,
                additionalData: RecipientViewState.additionalData
            }, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
                .then(res => {
                    if (res.status === 200) {
                        toastComponent({ Type: "success", Message: res.data.message, Func: () => { } })
                        closeModal();
                        fetchleadsData();
                    } else {
                        toastComponent({ Type: "success", Message: res.data.message, Func: () => { } })
                    }
                }).catch(err => {
                    toastComponent({ Type: "error", Message: err.message, Func: () => { } });
                })
        } else {
            axios.post("/api/recipient", {
                name: RecipientViewState.name,
                email: RecipientViewState.email,
                phone: RecipientViewState.phone,
                category: RecipientViewState.category,
                city: RecipientViewState.city,
                tag: RecipientViewState.tag,
                additionalData: RecipientViewState.additionalData
            }, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
                .then(res => {
                    if (res.status === 201) {
                        toastComponent({ Type: "success", Message: res.data.message, Func: () => { } })
                        closeModal();
                        fetchleadsData();
                    } else {
                        toastComponent({ Type: "success", Message: res.data.message, Func: () => { } })
                    }
                }).catch(err => {
                    toastComponent({ Type: "success", Message: err.message, Func: () => { } });
                })
        }
    }
    const handleState = (name?: any, value?: any) => {
        setRecipientViewState(prev => {
            return {
                ...prev, [name]: value
            }
        })
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
                                                RecipientViewState !== null ?
                                                    <form onSubmit={handleUpdateLead} >
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="recipientInfo"
                                                        >
                                                            Recipient
                                                        </label>
                                                        <div id="recipientInfo" className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Source"
                                                                >
                                                                    Name
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="name"
                                                                    id="name"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={RecipientViewState.name}
                                                                />
                                                                {/* <select id="dropdown" value={RecipientViewState.name} onChange={
                                                                    (e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        setRecipientViewState({
                                                                            ...RecipientOb,
                                                                            name: e.target.value
                                                                        })
                                                                    }
                                                                }>
                                                                    <option value="">Select a source</option>
                                                                    <option value="Website">Website</option>
                                                                    <option value="Referral">Referral</option>
                                                                    <option value="Event">Event</option>
                                                                    <option value="Other">Other</option>
                                                                </select> */}
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Status"
                                                                >
                                                                    Email
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="email"
                                                                    id="email"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={RecipientViewState.email}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Status"
                                                                >
                                                                    Phone Number
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="phone"
                                                                    id="phone"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={RecipientViewState.phone}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div id="recipientInfo" className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="Source"
                                                                >
                                                                    City
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="city"
                                                                    id="city"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={RecipientViewState.city}
                                                                />
                                                                {/* <select id="dropdown" value={RecipientViewState.name} onChange={
                                                                    (e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        setRecipientViewState({
                                                                            ...RecipientOb,
                                                                            name: e.target.value
                                                                        })
                                                                    }
                                                                }>
                                                                    <option value="">Select a source</option>
                                                                    <option value="Website">Website</option>
                                                                    <option value="Referral">Referral</option>
                                                                    <option value="Event">Event</option>
                                                                    <option value="Other">Other</option>
                                                                </select> */}
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="category"
                                                                >
                                                                    Category
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="category"
                                                                    id="category"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={RecipientViewState.category}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="tag"
                                                                >
                                                                    Tag
                                                                </label>
                                                                <select id="tag" value={RecipientViewState.tag} onChange={
                                                                    (e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        setRecipientViewState({
                                                                            ...RecipientViewState,
                                                                            tag: e.target.value
                                                                        })
                                                                    }
                                                                }>
                                                                    <option value="">Select a Tag</option>
                                                                    <option value="Travel">Travel</option>
                                                                    <option value="Watching">Watching</option>
                                                                    <option value="Reading">Reading</option>
                                                                    <option value="Other">Other</option>
                                                                </select>
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
                                                                RecipientViewState.recipientID !== "" ?
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

export default RecipientView;

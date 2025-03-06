import { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import toastComponent from '../ToastComponent';
interface stateProps {
    recipientGroupID: string,
    name: string,
    recipientList: string,
    tag: string
}
interface stateViewProp {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: () => void;
    closeModal: () => void;
    stateView: stateProps;
    setStateView: React.Dispatch<React.SetStateAction<stateProps>>;
    fetchleadsData: () => Promise<void>;
}
const RecipientGroupView: React.FC<stateViewProp> = ({ isOpen, setIsOpen, openModal, closeModal, stateView, setStateView, fetchleadsData }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setStateView((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleUpdateLead = (e: React.FormEvent) => {
        e.preventDefault();
        // let url = RecipientViewState.recipientID !== "" ? "/api/recipient?id=" + RecipientViewState.recipientID : "/api/recipient";
        if (stateView !== null && stateView.recipientGroupID !== "") {
            axios.put("/api/recipientGroup?id=" + stateView.recipientGroupID, {
                name: stateView.name,
                recipientList: stateView.recipientList,
                tag: stateView.tag,
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
            axios.post("/api/recipientGroup", {
                name: stateView.name,
                recipientList: stateView.recipientList,
                tag: stateView.tag
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
    console.log("id", stateView);
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
                                                stateView !== null ?
                                                    <form onSubmit={handleUpdateLead} >
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="recipientInfo"
                                                        >
                                                            RecipientGroup
                                                        </label>
                                                        <div id="recipientInfo" className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="name"
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
                                                                    defaultValue={stateView.name}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="recipientList"
                                                                >
                                                                    Recipient List
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="recipientList"
                                                                    id="recipientList"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={stateView.recipientList}
                                                                />
                                                            </div>
                                                            <div className="w-full sm:w-1/4">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                    htmlFor="tag"
                                                                >
                                                                    Tag
                                                                </label>
                                                                <input
                                                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                                    type="text"
                                                                    name="tag"
                                                                    id="tag"
                                                                    onChange={handleChange}
                                                                    placeholder=""
                                                                    defaultValue={stateView.tag}
                                                                />
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
                                                                stateView.recipientGroupID !== "" ?
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

export default RecipientGroupView;

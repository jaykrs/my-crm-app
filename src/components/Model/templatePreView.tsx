import { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import toastComponent from '@/components/ToastComponent';
interface tempProp {
    tempPreview: string;
    closeModal: () => Promise<void>;
}
const TemplatePreView: React.FC<tempProp> = ({ tempPreview, closeModal }) => {


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-full max-w-4xl p-2 shadow-lg overflow-auto" style={{ margin: '2% 0 0 15%' }}>
                    <div className="mt-12 max-h-[80vh] overflow-auto">
                        <div className="grid grid-cols-5 gap-8">
                            <div className="col-span-12">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="p-7">
                                        <p dangerouslySetInnerHTML={{ __html: tempPreview }}></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4.5">
                        <button
                            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TemplatePreView;

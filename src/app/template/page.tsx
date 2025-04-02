'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import grapesjs, { Editor } from 'grapesjs';
// import DefaultLayout from '@/components/Layouts/DefaultLayout';
// import axios from 'axios';
// import { Interface } from 'readline';
// //import img1 from '../assets/temp1.png';
// interface  temProps{
//     temName: string;
//     temCode: string;
//     userName: string;
//     temID: string;
// }

// const GrapesEditor: React.FC<temProps> = () => {
//     const [templateHtml, setTemplateHtml] = useState("");
//     const [templateCss, setTemplateCss] = useState("");
//     const editorRef = useRef<Editor | null>(null);
//     const [temCode,setTemCode] = useState<temProps[]>([]);

//     useEffect(() => {
//         getTemplateList();
//         editorRef.current = grapesjs.init({
//             container: '#gjs',
//             height: '100vh',
//             fromElement: true,
//             storageManager: false,
//             selectorManager: { escapeName: (name: string) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-') },
//             plugins: ['grapesjs-tailwind'], // Make sure Tailwind CSS is available
//             pluginsOpts: {
//                 'grapesjs-tailwind': {} // Ensure the Tailwind plugin is active
//             },

//             // Text editing configuration
//             // richTextEditor: {
//             //     enable: true, // Enable the rich text editor to support text commands
//             //     toolbar: [
//             //         { command: 'bold', label: 'Bold', className: 'fa fa-bold' },
//             //         { command: 'italic', label: 'Italic', className: 'fa fa-italic' },
//             //         { command: 'underline', label: 'Underline', className: 'fa fa-underline' },
//             //         { command: 'strike-through', label: 'Strike-through', className: 'fa fa-strikethrough' },
//             //         { command: 'link', label: 'Link', className: 'fa fa-link' },
//             //         // You can add other commands to the toolbar here
//             //     ]
//             // },
//             styleManager: {
//                 sectors: [{
//                     name: 'General',
//                     properties: [
//                         { name: 'background-color', type: 'color' },
//                         /// { name: 'font-family', type: 'select', options: [{ value: 'Arial', name: 'Arial' }, { value: 'Courier', name: 'Courier' }] }
//                     ]
//                 }]
//             },

//         });

//         // Adding custom block with an image and link
//         editorRef.current.BlockManager.add('1', {
//             label: `tem1`,
//             category: 'Email Templates',
//             content: `
//                 <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
//                     <!-- Header Section -->
//                     <div class="bg-blue-500 text-white p-6 text-center rounded-t-lg">
//                         <h1 class="text-3xl font-bold">Welcome to Our Newsletter!</h1>
//                         <p class="mt-2 text-lg">Stay up to date with our latest updates and promotions.</p>
//                     </div>

//                     <!-- Body Section -->
//                     <div class="p-6">
//                         <p class="text-lg text-gray-700">
//                             Hello there, we are excited to have you with us! Here at XYZ Company, we value our community, and we are
//                             committed to providing you with the best content. Stay tuned for exciting offers and updates directly in your
//                             inbox.
//                         </p>
//                         <div class="mt-6">
//                             <p class="text-lg text-gray-700 mb-4">As a token of appreciation, we’d like to offer you an exclusive discount
//                                 on your first order!</p>
//                             <a href="#" class="block w-full text-center bg-blue-500 text-white py-3 px-6 rounded-md text-xl">
//                                 Get My Discount
//                             </a>
//                         </div>
//                     </div>

//                     <!-- Footer Section -->
//                     <div class="bg-gray-100 text-center py-6 text-sm text-gray-500 rounded-b-lg">
//                         <p>
//                             You are receiving this email because you subscribed to our newsletter. If you no longer wish to receive emails,
//                             click here to unsubscribe.
//                         </p>
//                         <p class="mt-2">XYZ Company &copy; 2025</p>
//                     </div>
//                 </div>
//             `,
//         });

//         console.log("before add block manager");
//         if(temCode.length > 0){
//             console.log("after add block manager1");
//             temCode.forEach(el=>{
//                 if(editorRef.current && (localStorage.getItem("username") ===el.userName || localStorage.getItem("username") === "admin")){
//                     editorRef.current.BlockManager.add(el.temName, {
//                         label: el.temName,
//                         category: 'Email Templates',
//                         content: el.temCode
//                     });
//                 }
//                 console.log("after add block manager2");
//             })
//         }

//         editorRef.current.Components.addType('cmp-Y', {
//             // Detect '.el-Y' elements
//             isComponent: (el) => el.classList?.contains('el-Y'),
//             model: {
//                 defaults: {
//                     name: 'Component Y', // Simple custom name
//                     draggable: '.el-X', // Add `draggable` logic
//                 },
//             },
//         });

//         // Make sure to clean up when unmounting the component
//         return () => {
//             if (editorRef.current) {
//                 editorRef.current.destroy();
//             }
//         };
//     }, []);

//     // Extract HTML and CSS when button is clicked
//     const getTemplateHtml = () => {
//         if (editorRef.current) {
//             const htmlContent = editorRef.current.getHtml();
//             const cssContent = editorRef.current.getCss();
//             let template = `
//         <!doctype html>
//           <html>
//           <head>
//               <meta charset="UTF-8" />
//               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//               <script src="https://cdn.tailwindcss.com"></script>
//               <style>
//               ${cssContent}
//               </style>
//           </head>
//           ` + htmlContent +
//                 `
//           </html>
//         `
//             setTemplateHtml(template);
//             //setTemplateCss(cssContent);
//         }
//     };

//     const getTemplateList = async()=>{
//         const token = localStorage.getItem("accessToken");
//         try{
//           await  axios.get('/api/template',{
//                 headers:{Authorization : "Bearer " + token}
//             })
//             .then(res=>{
//                 setTemCode(res.data.data);
//             })
//         }catch(err){
//            console.log("something went wrong!");
//         }
//     }

//     return (
//         <DefaultLayout>
//             <div className="flex justify-between">
//                 <button className="bg-blue-500 text-white py-1 px-4 my-1 rounded ml-auto">
//                     Save
//                 </button>
//             </div>
//             <div>
//                 <div
//                     id="gjs"
//                     style={{ height: '100vh', width: '100%' }}
//                 >
//                 </div>
//                 <button
//                     onClick={getTemplateHtml}
//                     className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
//                 >
//                     Get Template HTML
//                 </button>

//                 {/* Display the extracted template HTML */}
//                 <div className="mt-6">
//                     <h3 className="font-bold">Extracted HTML:</h3>
//                     <div dangerouslySetInnerHTML={{ __html: templateHtml }}></div>
//                 </div>
//             </div>
//         </DefaultLayout>
//     );
// };

// export default GrapesEditor;


'use client';

import React, { useEffect, useState, useRef } from 'react';
import grapesjs, { Editor } from 'grapesjs';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { headers } from 'next/headers';
import toastComponent from '@/components/ToastComponent';
import { useSearchParams } from 'next/navigation';

interface temProps {
    temName: string;
    temCode: string;
    userName: string;
    temID: string;
}

const GrapesEditor: React.FC = () => {
    const [templateHtml, setTemplateHtml] = useState("");
    const [temCode, setTemCode] = useState<temProps[]>([]);
    const editorRef = useRef<Editor | null>(null);
    const params = useSearchParams();

    const getTemplateList = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get('/api/template', {
                headers: { Authorization: "Bearer " + token },
            });
            setTemCode(response.data.data);
        } catch (err) {
            console.log("Something went wrong fetching templates!");
        }
    };

    useEffect(() => {
        editorRef.current = grapesjs.init({
            container: '#gjs',
            height: '100vh',
            fromElement: true,
            storageManager: false,
            selectorManager: {
                escapeName: (name: string) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-')
            },
            plugins: ['grapesjs-tailwind'],
            pluginsOpts: {
                'grapesjs-tailwind': {}
            },
            styleManager: {
                sectors: [{
                    name: 'General',
                    properties: [
                        { name: 'background-color', type: 'color' },
                    ]
                }]
            },
        });
        const openModal = () => {
            if (editorRef.current)
                editorRef.current.Modal.open({
                    title: 'My title', // string | HTMLElement
                    content: 'My content', // string | HTMLElement
                });
        };
        // Create a simple custom button that will open the modal
        // document.body.insertAdjacentHTML('afterbegin', `
        //     <button onclick="openModal()">Open Modal</button>
        // `);
        const button = document.createElement('button');
        button.innerText = 'Open Modal';
        button.onclick = openModal;
        document.body.prepend(button);

        // Clean up the editor instance when the component unmounts
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (temCode.length > 0 && editorRef.current) {
            temCode.forEach((el) => {
                // Only add blocks for the current user or admin
                if (editorRef.current && (localStorage.getItem("username") === el.userName || localStorage.getItem("username") === "admin")) {
                    let content = el.temCode;
                    content = content.replace(/<!DOCTYPE[^>]*>/i, '');
                    content = content.replace(/<html[^>]*>([\s\S]*?)<\/html>/, '$1');
                    content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/, '')
                    content = content.replace(/<body[^>]*>([\s\S]*?)<\/body>/, '$1');
                    content = content.replace(/\s+/g, ' ').trim();
                    editorRef.current.BlockManager.add(el.temName, {
                        label: el.temName,
                        category: 'Email Templates',
                        content: content,
                    });
                }
            });
        }
    }, [temCode]);

    const getTemplateHtml = async () => {
        if (editorRef.current) {
            const htmlContent = editorRef.current.getHtml();
            const cssContent = editorRef.current.getCss();
            let content = editorRef.current.getHtml();
            content = content.replace(/<!DOCTYPE[^>]*>/i, '');
            content = content.replace(/<html[^>]*>([\s\S]*?)<\/html>/, '$1');
            content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/, '')
            content = content.replace(/<body[^>]*>([\s\S]*?)<\/body>/, '$1');
            content = content.replace(/\s+/g, ' ').trim();
            let template = `
            <!doctype html>
            <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                ${cssContent}
                </style>
            </head>
            ` + htmlContent +
                `
            </html>
            `;
            setTemplateHtml(template);
            if (content !== "") {
                let templateName = prompt("Please enter mail template Name");
                await axios.post('/api/template', {
                    temName: templateName,
                    temCode: template,
                    userName: localStorage.getItem("username") ? localStorage.getItem("username") : ""
                }, {
                    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
                }).then(res => {
                    toastComponent({ Type: 'success', Message: res.data.message, Func: () => { } })
                })
            } else {
                toastComponent({ Type: 'success', Message: "Please add a template from block to save.", Func: () => { } })
            }
        }
    };

    // const clearEditor = () => {
    //     if (editorRef.current) {
    //         editorRef.current.setHtml()
    //     }
    // };

    const setHtmlContentInEditor = (html: string) => {
        if (editorRef.current) {
            editorRef.current.setComponents(html);
        }
    };

    useEffect(() => {
        getTemplateList();
    }, []);

    return (
        <DefaultLayout>
            <ToastContainer />
            <div className="w-full flex justify-end  gap-2.5" >
                <button onClick={getTemplateHtml} className="bg-blue-500 text-white py-1 px-4 my-1 rounded " >
                    Save
                </button>
                <button onClick={() => setHtmlContentInEditor('<body></body>')} className="bg-blue-500 text-white py-1 px-4 my-1 rounded " >
                    Clear
                </button>
            </div>
            <div>
                <div
                    id="gjs"
                    style={{ height: '100vh', width: '100%' }}
                >
                </div>
            </div>
        </DefaultLayout>
    );
};

export default GrapesEditor;

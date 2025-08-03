import React, { useState } from 'react';
import { Download } from "lucide-react"
import { jsPDF } from "jspdf"

interface Task {
    id: number;
    title: string;
    is_completed: boolean;
}

const fetchPage = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)

    function handleClick() {
        setLoading(true)
        setTasks([])
        setTimeout(() => {
            fetch("http://localhost:3000/v2/tasks")
                .then((res) => res.json())
                .then((data) => {
                    setTasks(data)
                    setLoading(false)
                })
                .then(() => console.log(tasks))
                .catch((err) => {
                    alert("Fetch Failed!")
                    setLoading(false)
                })
        }, 500)
    }

    const stringTasks: string = JSON.stringify(tasks, null, 2);

    function copyToClipboard(text:string) {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied to clipboard!"))
            .catch(() => alert("Failed to copy!"))
    }

    function downloadPdf() {
        const doc = new jsPDF();

        // Set font untuk judul
        doc.setFont("times", "bold");
        doc.setFontSize(16);
        doc.text("Tugas", 10, 10);

        // Set font untuk isi
        doc.setFont("times", "normal");
        doc.setFontSize(12);

        // Asumsikan kamu punya data stringTasks
        const bodyText = doc.splitTextToSize(stringTasks, 180); // Bungkus teks panjang
        doc.text(bodyText, 10, 20);

        doc.save("tugas.pdf");
    }


    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col bg-white py-8 px-10 rounded border border-gray-300 max-w-xl w-full gap-4">
                <h1 className="text-gray-800 text-2xl font-semibold">Fetch Tugas!</h1>
                <button
                    className=" w-fit bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
                    onClick={() => handleClick()}
                >Test
                </button>

                {loading && (
                    <div className="fixed    inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}

                {tasks.length > 0 &&
                    <div className="bg-green-100 p-4 rounded">
                        <div className="flex flex-row justify-between items-center mb-2">
                            <p className='font-semibold text-lg text-gray-800'>Versi string:</p>
                            <button className='text-gray-600 !text-sm rounded hover:text-gray-800 cursor-pointer' onClick={() => copyToClipboard(JSON.stringify(tasks))}>Copy</button>
                        </div>

                        <p>{stringTasks}</p>
                    </div>
                }
                {tasks.length > 0 &&
                    <div className="bg-blue-100 p-4 rounded">
                        <div className="flex flex-row justify-between items-center mb-2">
                            <p className='font-semibold text-lg text-gray-800'>Versi raw list:</p>
                            <Download size={20} className='cursor-pointer text-gray-600 hover:text-gray-800' onClick={() => downloadPdf()} />
                        </div>

                        <ul className="list-disc list-inside text-sm">
                            {tasks.map((task, index) => (
                                <li key={index}>
                                    {JSON.stringify(task)}
                                </li>
                            ))}
                        </ul>
                    </div>}

                {tasks.length > 0 &&
                    <ol className="list-inside text-left bg-orange-100 p-4 rounded text-sm">Versi list:
                        {tasks.map((task, index) => (
                            <li className={`${!task.is_completed ? 'bg-red-300' : 'bg-green-300'}`} key={index}>
                                {index + 1}. {task.title}
                            </li>
                        ))}
                    </ol>}
            </div>
        </div>
    )
}

export default fetchPage;
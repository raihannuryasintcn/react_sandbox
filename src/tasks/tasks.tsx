import React, { useState } from 'react';
import { Download } from "lucide-react"
import { jsPDF } from "jspdf"
import { toast } from 'react-toastify';

interface Task {
    id: number;
    title: string;
    is_completed: boolean;
}

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)
    const [addingTask, setAddingTask] = useState(false)


    function fetchTask() {
        setLoading(true)
        setTasks([])
        setTimeout(() => {
            fetch("http://localhost:3000/v2/tasks")
                .then((res) => res.json())
                .then((data) => {
                    setTasks(data)
                    setLoading(false)
                })
                .catch((err) => {
                    toast.error("Fetch Failed!");
                    setLoading(false)
                })
        }, 500)
    }

    function addTask() {
        setLoading(true)
        setAddingTask(true)
        setTimeout(() => setLoading(false), 500)

    }

    function onClose() {
        setAddingTask(false)
    }


    const stringTasks: string = JSON.stringify(tasks, null, 2);

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text)
            .then(() => toast.success("Copied to clipboard!"))
            .catch(() => toast.error("Failed to copy!"))
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

    function completeTask() {

    }

    function renameTask() {

    }

    function deleteTask() {

    }

    const ranks = ["Officer", "Sergeant", "Lieutenant", "General"]

    const menRanks = ranks.map(r => "Mr." + r)

    console.log(menRanks)

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="flex flex-col bg-white py-8 px-10 rounded border border-gray-300 max-w-xl w-full gap-4">
                <h1 className="text-gray-800 text-2xl font-semibold">Tugas</h1>
                <div className="flex gap-2">
                    <button
                        className=" w-fit bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
                        onClick={() => fetchTask()}
                    >Ambil data
                    </button>
                    {tasks.length > 0 &&
                        <button
                            className=" w-fit bg-orange-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-orange-600"
                            onClick={() => addTask()}
                        >Tambah tugas
                        </button>
                    }
                </div>

                {addingTask && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative p-6 border border-gray-300">
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
                            >
                                &times;
                            </button>
                            <h2 className="text-lg mb-3 font-semibold text-gray-800">
                                Tambah Tugas
                            </h2>
                        </div>
                    </div>)}

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
                                <div className="flex justify-between">
                                    {index + 1}. {task.title}
                                    <div className="flex text-xs gap-1">
                                        <button
                                            onClick={() => completeTask()}
                                            className='cursor-pointer text-gray-800 hover:text-blue-600'>DONE</button>
                                        <button
                                            onClick={() => renameTask()}
                                            className='cursor-pointer text-gray-800 hover:text-yellow-600'>RNM  </button>
                                        <button
                                            onClick={() => deleteTask()}
                                            className='cursor-pointer text-gray-800 hover:text-red-700'>DLT</button>
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ol>}
            </div>
        </div>
    )
}

export default Tasks;
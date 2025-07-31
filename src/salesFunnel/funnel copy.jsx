import React, { useState } from 'react';
import funnelData from './funnel.json';
import { Button } from '@mantine/core';
import FunnelChart from './funnelChart';
import StatusModal from './StatusModal';



const FunnelStatus = () => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFunnel, setShowFunnel] = useState(false);
    const [showUpload, setShowUpload] = useState(false);

    const statusCount = funnelData.reduce((acc, item) => {
        const status = item.STATUS || 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const allStatusCount = Object.values(statusCount).reduce((total, count) => total + count, 0);

    const getStatusCount = (status) => statusCount[status] || 0;

    const getGroupTotalCount = (group) => {
        return group.status.reduce((sum, status) => {
            return sum + (statusCount[status] || 0);
        }, 0);
    };


    const filteredItems = selectedStatus
        ? funnelData.filter(item => item.STATUS === selectedStatus)
        : [];

    const searchedItems = filteredItems.filter(item =>
        item['Merek Usaha'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCardClick = (status) => {
        if (status === selectedStatus) {
            setSelectedStatus(null);
            setShowModal(false);
        } else {
            setSelectedStatus(status);
            setSearchTerm('');
            setShowModal(true);
        }
    };

    const handleUploadClick = () => {
        setShowUpload(true);
    };

    const handleFunnelClick = (status) => {
        setShowFunnel(true);
    };

    const MappingData = [
        {
            "name": "Pre-Sales",
            "color": "bg-green-500/20",
            "status": [
                "F0 - Leads",
                "F1 - Opportunity",
                "F2 - Feasibility Study",
                "F3 - Project Assesment"
            ]
        },
        {
            "name": "Sales",
            "color": "bg-green-500/30",
            "status": [
                "F4 - Agreement",
                "F5 - Order"
            ]

        },
        {
            "name": "Delivery",
            "color": "bg-green-500/50",
            "status": [
                "Delivery"
            ]
        },
        {
            "name": "After-Sales",
            "color": "bg-green-500/60",
            "status": [
                "BillCo",
                "Assurance"
            ]
        },
        {
            "name": "Drop",
            "color": "bg-red-300",
            "status": [
                "DROP"
            ]
        }
    ]

    const getStatusBgClass = (status) => {
        const foundGroup = MappingData.find(group => group.status.includes(status));
        return foundGroup ? foundGroup.color : 'bg-gray-100';
    };
    return (
        <div className="p-4 h-[95vh] mx-auto flex gap-4 ">
            <div className="w-4/10 bg-white p-10 rounded-lg border border-gray-300 shadow-md ">
                <FunnelChart />
            </div>
            <div className="w-6/10 bg-white p-6 rounded-lg border border-gray-300 shadow-md max-h-[98vh] overflow-y-auto">
                <div className="flex justify-between mb-4">
                    <div className="flex flex-col">
                        <h1 className="text-lg">
                            Funnel Status Overview: <span className="text-2xl italic font-bold">{allStatusCount} ISP</span>
                        </h1>
                        <h1 className="text-md">
                            Data Last Updated: <span className="text-md italic font-bold">6 Juni</span>
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        {/* <Button
                            onClick={() => handleFunnelClick()}
                            className="my-auto"
                            color='green'
                        >
                            Open Funnel
                        </Button> */}
                        <Button
                            onClick={() => handleUploadClick()}
                            className="my-auto"
                        >
                            Upload New Data
                        </Button>
                    </div>
                </div>

                {/* Cards by Group */}
                {MappingData.map(group => (
                    <div key={group.name} className="mb-6">
                        <div className='flex items-center justify-between'>
                            <h2 className="text-md font-bold mb-2">{group.name}</h2>
                            <h2 className="text-md text-center mb-2 bg-gray-100 border border-gray-300 px-2 rounded-sm">{getGroupTotalCount(group)}</h2>
                        </div>
                        <hr className="mb-4 border-gray-300" />


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {group.status.map(status => (
                                <div
                                    key={status}
                                    className={`border border-gray-300 p-4 rounded transition cursor-pointer hover:shadow-lg hover:opacity-80 ${getStatusBgClass(status)}`}

                                    onClick={() => handleCardClick(status)}
                                >
                                    <h2 className="text-sm font-medium text-gray-700 mb-1">{status}</h2>
                                    <p className="text-2xl font-bold text-gray-900">{getStatusCount(status)}</p>
                                    <p className="text-xs text-gray-500">entries</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Modal */}
                {showModal && (
                    <StatusModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        selectedStatus={selectedStatus}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchedItems={searchedItems}
                    />
                )}

                {/* Funnel */}
                {showFunnel && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative p-6 border border-gray-300">
                            <button
                                onClick={() => setShowFunnel(false)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
                            >
                                &times;
                            </button>
                            <FunnelChart />

                        </div>
                    </div>
                )}
                {/* Upload */}
                {showUpload && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative p-6 border border-gray-300">
                            <button
                                onClick={() => setShowUpload(false)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
                            >
                                &times;
                            </button>

                            <h2 className="text-lg mb-3">
                                Upload New Data
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FunnelStatus;

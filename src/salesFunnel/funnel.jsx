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
            <div className="w-10/10 bg-white p-10 rounded-lg border border-gray-300 shadow-md ">
                <FunnelChart />
            </div>
            
        </div>
    );
};

export default FunnelStatus;

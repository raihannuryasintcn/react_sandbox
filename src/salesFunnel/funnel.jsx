import React, { useState } from 'react';
import funnelData from './funnel.json';

const defaultFunnelStructure = {
  'Pre-Sales': ['F0', 'F1', 'F2', 'F3'],
  'Sales': ['F4', 'F5'],
  'Delivery': ['Delivery'],
  'After-Sales': ['BillCo', 'Assurance'],
};

const FunnelStatus = () => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    const statusCount = funnelData.reduce((acc, item) => {
        const status = item.STATUS || 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const allStatusCount = Object.values(statusCount).reduce((total, count) => total + count, 0);

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

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-lg font-semibold mb-4">
                Funnel Status Overview: <span className="font-bold">{allStatusCount}</span>
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {Object.entries(statusCount)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([status, count]) => (
                        <div
                            key={status}
                            className={`border p-4 rounded bg-white transition cursor-pointer ${
                                selectedStatus === status ? 'ring-2 ring-blue-500' : 'hover:shadow'
                            }`}
                            onClick={() => handleCardClick(status)}
                        >
                            <h2 className="text-sm font-medium text-gray-700 mb-1">{status}</h2>
                            <p className="text-2xl font-bold text-gray-900">{count}</p>
                            <p className="text-xs text-gray-500">entries</p>
                        </div>
                    ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative p-6">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-semibold mb-3">
                            Detail for status: <span className="text-blue-600">{selectedStatus}</span>
                        </h2>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Cari berdasarkan Merek Usaha..."
                                className="w-full border rounded px-3 py-2 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm border">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-2 py-1 text-left">No</th>
                                        <th className="border px-2 py-1 text-left">Merek Usaha</th>
                                        <th className="border px-2 py-1 text-left">Nama Perusahaan</th>
                                        <th className="border px-2 py-1 text-left">Scope of Work</th>
                                        <th className="border px-2 py-1 text-left">Layanan</th>
                                        <th className="border px-2 py-1 text-left">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchedItems.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="border px-2 py-1">{idx + 1}</td>
                                            <td className="border px-2 py-1">{item['Merek Usaha']}</td>
                                            <td className="border px-2 py-1">{item['Nama Perusahaan']}</td>
                                            <td className="border px-2 py-1">{item['Scope Of Work']}</td>
                                            <td className="border px-2 py-1">{item.Layanan}</td>
                                            <td className="border px-2 py-1">{item.Jumlah}</td>
                                        </tr>
                                    ))}
                                    {searchedItems.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                                Tidak ada data ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FunnelStatus;

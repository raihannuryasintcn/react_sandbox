import React from "react";

const StatusModal = ({
  show,
  onClose,
  selectedStatus,
  searchTerm,
  setSearchTerm,
  searchedItems
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative p-6 border border-gray-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-lg mb-3">
          Detail for status:{" "}
          <span className="font-bold italic">{selectedStatus}</span>
        </h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Cari berdasarkan Merek Usaha..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-gray-300 px-2 py-1 text-left">No</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Merek Usaha</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Nama Perusahaan</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Scope of Work</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Layanan</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Jumlah</th>
                <th className="border border-gray-300 px-2 py-1 text-left">Ubah Stage</th>
              </tr>
            </thead>
            <tbody>
              {searchedItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-2 py-1">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">{item['Merek Usaha']}</td>
                  <td className="border border-gray-300 px-2 py-1">{item['Nama Perusahaan']}</td>
                  <td className="border border-gray-300 px-2 py-1">{item['Scope Of Work']}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.Layanan}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.Jumlah}</td>
                  <td className="border border-gray-300 px-2 py-1"></td>
                </tr>
              ))}
              {searchedItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center border border-gray-300 py-4 text-gray-500">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;

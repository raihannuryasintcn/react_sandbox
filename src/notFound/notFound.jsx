import React from 'react';
import { Link } from 'react-router-dom';
// atau import Link from 'next/link'; untuk Next.js

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <div className="text-4xl font-bold text-gray-700 mt-4">
            Halaman Tidak Ditemukan
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg mb-2">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <p className="text-gray-500">
            Mungkin halaman telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-x-4">
          <Link 
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Kembali ke Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Halaman Sebelumnya
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Jika masalah berlanjut, silakan hubungi administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Untuk React Router
// atau import { useRouter } from 'next/router'; // Untuk Next.js
import pagesData from './routes.json';

const Breadcrumb = () => {
  // Ambil path saat ini dari router
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Fungsi untuk mendapatkan breadcrumb berdasarkan path saat ini
  const getBreadcrumb = (path) => {
    const breadcrumb = [{ title: 'Home', path: '/' }];
    
    // Cari di semua kategori
    for (const [category, pages] of Object.entries(pagesData)) {
      const page = pages.find(p => p.path === path);
      if (page) {
        // Jika bukan Home, tambahkan ke breadcrumb
        if (page.path !== '/') {
          breadcrumb.push(page);
        }
        break;
      }
    }
    
    return breadcrumb;
  };

  const breadcrumbItems = getBreadcrumb(currentPath);

  // Jika hanya ada Home, jangan tampilkan breadcrumb
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center text-sm pt-4 px-4 bg-gray-100" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-gray-900 font-medium">
                {item.title}
              </span>
            ) : (
              <Link 
                to={item.path}
                className="text-gray-600 hover:text-gray-900 transition-colors hover:underline"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
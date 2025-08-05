import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react'; // Assuming 'lucide-react' is your icon library

import {
    ChevronLeft,
    ChevronRight,
    Menu
} from 'lucide-react';
import { Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';

import sidebarData from './routes.json'; // Assuming sidebarData is in JSON format

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [expandedSections, setExpandedSections] = useState({
        'Dashboard': true,
        'Funnel': false,
        'Other Tools': false,
        'Admin Panel': false
    });

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSection = (sectionName) => {
        if (!isCollapsed) {
            setExpandedSections(prev => ({
                ...prev,
                [sectionName]: !prev[sectionName]
            }));
        }
    };

    const getIcon = (iconName) => {
        // Dynamically get the component from the LucideIcons object using the string name
        const IconComponent = LucideIcons[iconName] || Menu;
        return <IconComponent size={20} />;
    };

    return (
        <div className={`bg-white text-gray-800 border-r border-gray-200 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'
            } min-h-screen flex flex-col shadow-lg`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <h2 className="text-xl font-bold text-gray-700">Insider</h2>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {Object.entries(sidebarData).map(([sectionName, items]) => (
                    <div key={sectionName} className="mb-4">
                        {/* Section Header */}
                        <button
                            onClick={() => toggleSection(sectionName)}
                            className={`w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors ${isCollapsed ? 'justify-center' : 'justify-between'
                                } flex items-center text-gray-600`}
                            title={isCollapsed ? sectionName : ''}
                        >
                            {!isCollapsed && (
                                <>
                                    <span className="text-sm font-medium text-gray-600">{sectionName}</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transition-transform ${expandedSections[sectionName] ? 'rotate-90' : ''
                                            }`}
                                    />
                                </>
                            )}
                            {isCollapsed && (
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            )}
                        </button>

                        {/* Section Items */}
                        {(expandedSections[sectionName] || isCollapsed) && (
                            <div className={`${!isCollapsed ? 'ml-2 mt-2' : 'mt-2'} space-y-1`}>
                                {items.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                            } ${isCollapsed ? 'justify-center' : ''}`
                                        }
                                        title={isCollapsed ? item.title : ''}
                                    >
                                        <span className="flex-shrink-0">
                                            {getIcon(item.icon)}
                                        </span>
                                        {!isCollapsed && (
                                            <span className="ml-3 text-sm">{item.title}</span>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                        <Button fullWidth variant="outline" color="red"
                            onClick={() => alert('Logging out...')}
                        >Log Out
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
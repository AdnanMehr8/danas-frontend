// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div style={{ width: '250px', height: '100vh', backgroundColor: '#f4f4f4', padding: '20px' }}>
//       <h2>Dashboard</h2>
//       <ul>
//         <li><Link to="/dashboard">Dashboard</Link></li>
//         <li><Link to="/machines">Machines</Link></li>
//         <li><Link to="/products">Products</Link></li>
//         <li><Link to="/batch-plan">Batch Plan</Link></li>
//         {/* Add more links as needed */}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { LayoutDashboard, Cpu, Package, Calendar, Building, Shield, User, Users, PowerIcon } from 'lucide-react';
// import './sidebar.css';

// const Sidebar = () => {
//     const location = useLocation();
    
//     const menuItems = [
//         { path: '/machines', icon: <Cpu size={20} />, label: 'Machines' },
//         { path: '/products', icon: <Package size={20} />, label: 'Products' },
//         { path: '/dragProcesses', icon: <PowerIcon size={20} />, label: 'Processes' },
//         { path: '/batch-plan', icon: <Calendar size={20} />, label: 'Batch Plan' },
//         { path: '/departments', icon: <Building size={20} />, label: 'Departments' },
//         { path: '/permissions', icon: <Shield size={20} />, label: 'Permissions' },
//         { path: '/roles', icon: <User size={20} />, label: 'Roles' },
//         { path: '/dashboard', icon: <Users size={20} />, label: 'Users' },
   

//     ];

//     return (
//         <div style={{
//             width: '250px',
//             height: '100%',
//             backgroundColor: '#2C3E50',
//             color: 'white',
//             padding: '2rem 1rem',
//             borderRight: '1px solid #34495E'
//         }}>
//             <div style={{ marginBottom: '2rem' }}>
//                 <h2 style={{
//                     fontSize: '1.25rem',
//                     fontWeight: '600',
//                     color: 'rgba(255,255,255,0.9)',
//                     padding: '0 1rem'
//                 }}>
//                     Navigation
//                 </h2>
//             </div>
            
//             <nav>
//                 {menuItems.map((item) => (
//                     <Link
//                         key={item.path}
//                         to={item.path}
//                         style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '0.75rem',
//                             padding: '0.75rem 1rem',
//                             color: location.pathname === item.path ? 'white' : 'rgba(255,255,255,0.7)',
//                             backgroundColor: location.pathname === item.path ? '#34495E' : 'transparent',
//                             borderRadius: '8px',
//                             marginBottom: '0.5rem',
//                             textDecoration: 'none',
//                             transition: 'all 0.2s',
//                             fontSize: '0.95rem'
//                         }}
//                         className="sidebar-link"
//                     >
//                         {item.icon}
//                         {item.label}
//                     </Link>
//                 ))}
//             </nav>
//         </div>
//     );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Package, Calendar, Building, Shield, User, Users, PowerIcon, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import './sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const menuItems = [
        { path: '/machines', icon: <Cpu size={20} />, label: 'Machines' },
        { path: '/products', icon: <Package size={20} />, label: 'Products' },
        { path: '/processes', icon: <Settings  size={20} />, label: 'Processes' },
        { path: '/batch-plan', icon: <Calendar size={20} />, label: 'Batch Plan' },
        { path: '/departments', icon: <Building size={20} />, label: 'Departments' },
        { path: '/permissions', icon: <Shield size={20} />, label: 'Permissions' },
        { path: '/roles', icon: <User size={20} />, label: 'Roles' },
        { path: '/dashboard', icon: <Users size={20} />, label: 'Users' },
    ];

    return (
        <div style={{ 
            width: isCollapsed ? '60px' : '250px', 
            height: '100vh',  // Full viewport height for scrollable area
            backgroundColor: '#2C3E50',
            color: 'white',
            padding: '1rem',
            borderRight: '1px solid #34495E',
            transition: 'width 0.3s ease',
            overflowY: 'auto'  // Enables vertical scrolling
        }}>
            <button 
                onClick={toggleSidebar}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            {/* <div style={{ marginBottom: '2rem' }}>
                {!isCollapsed && (
                    <h2 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '600',
                        color: 'rgba(255,255,255,0.9)',
                        padding: '0 1rem'
                    }}>
                        Navigation
                    </h2>
                )}
            </div> */}
            
            <nav>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            color: location.pathname === item.path ? 'white' : 'rgba(255,255,255,0.7)',
                            backgroundColor: location.pathname === item.path ? '#34495E' : 'transparent',
                            borderRadius: '8px',
                            marginBottom: '0.5rem',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            fontSize: '0.95rem',
                            justifyContent: isCollapsed ? 'center' : 'flex-start'
                        }}
                        className="sidebar-link"
                    >
                        {item.icon}
                        {!isCollapsed && item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;

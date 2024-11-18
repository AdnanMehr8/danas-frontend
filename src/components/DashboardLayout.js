// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './sideBar';
// import Header from '../pages/header/Header';
// import Footer from '../pages/footer/Footer';


// const DashboardLayout = () => {
//     const [showSidebar, setShowSidebar] = useState(true); // State to control sidebar visibility

//     const handlePrint = () => {
//         setShowSidebar(false); // Hide the sidebar
//         setTimeout(() => {
//           window.print(); // Trigger print dialog after a short delay
//           setShowSidebar(true); // Re-show the sidebar
//         }, 100); // Adjust the delay if necessary
//       };
      
//   return (
//     <div style={{ display: 'flex' }}>
//           {/* <Sidebar /> */}
//           {showSidebar && <Sidebar />}
//       <div style={{ flexGrow: 1 }}>
//         <Header />
//         <main style={{ padding: '20px' }}>
//           {/* <Outlet /> */}
//           <Outlet context={{ handlePrint }} />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './sideBar';
// import Header from '../pages/header/Header';
// import Footer from '../pages/footer/Footer';

// const DashboardLayout = () => {
 

//     return (
//         <div style={{ display: 'flex', height: '100vh' }}>

//             {/* Conditionally render Sidebar */}
//             {/* {showSidebar && <Sidebar />} */}
//             <Sidebar />
//             {/* Main content area */}
//             <div style={{
//                 flexGrow: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 overflow: 'hidden', // Prevent overflow of content
//             }}>
//                 <Header />
                
                // <main style={{
                //     padding: '20px',
                //     flexGrow: 1,
                //     maxWidth: '100%', // Restrict width of content to prevent overflow
                //     overflowX: 'auto', // Enable horizontal scrolling if content overflows
                //     overflowY: 'auto', // Enable vertical scrolling if content overflows
//                 }}>
//                     <Outlet  />
//                 </main>

//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;
// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './sideBar';
// import Header from '../pages/header/Header';
// import Footer from '../pages/footer/Footer';

// const DashboardLayout = () => {
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//             <Header />
            
//             <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
//                 <Sidebar />
                
//                 <div style={{
//                     flexGrow: 1,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     overflow: 'hidden',
//                 }}>
//                     <main style={{
//                         padding: '20px',
//                         flexGrow: 1,
//                         maxWidth: '100%',
//                         overflowX: 'auto',
//                         overflowY: 'auto',
//                     }}>
//                         <Outlet />
//                     </main>
                    
//                     <Footer />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;

// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './sideBar';
// import Header from '../pages/header/Header';
// import Footer from '../pages/footer/Footer';

// const DashboardLayout = () => {
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//             <Header />
            
//             <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
//                 {/* Sidebar with fixed width */}
//                 <div style={{ width: '250px' }}>
//                     <Sidebar />
//                 </div>
                
//                 {/* Content area with remaining space */}
//                 <div style={{
//                     flexGrow: 1,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     overflow: 'hidden',
//                 }}>
//                     <main style={{
//                         padding: '20px',
//                         flexGrow: 1,
//                         overflowX: 'auto',
//                         overflowY: 'auto',
//                     }}>
//                         <Outlet />
//                     </main>
                    
//                     <Footer />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;


// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './sideBar';
// import Header from '../pages/header/Header';
// import Footer from '../pages/footer/Footer';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// const DashboardLayout = () => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const getPageTitle = () => {
//         const path = location.pathname.split('/')[1];
//         return path.charAt(0).toUpperCase() + path.slice(1);
//     };

//     const toggleSidebar = () => {
//         setIsCollapsed(!isCollapsed);
//     };

//     return (
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             height: '100vh',
//             backgroundColor: '#f5f6fa',
//             overflow: 'hidden', // Prevent any potential overflow
//         }}>
//             {/* Header */}
//             <div style={{ flexShrink: 0 }}>
//                 <Header />
//             </div>
            
//             {/* Main content wrapper */}
//             <div style={{
//                 display: 'flex',
//                 flexGrow: 1,
//                 overflow: 'hidden'
//             }}>
//                 {/* Sidebar */}
//                 <div style={{
//                     width: isCollapsed ? '60px' : '250px',
//                     flexShrink: 0,
//                     transition: 'width 0.3s ease',
//                     backgroundColor: '#2C3E50',
//                     boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)'
//                 }}>
//                     <Sidebar
//                      isCollapsed={isCollapsed}
//                      toggleSidebar={toggleSidebar}
//                     />
//                 </div>
                
//                 {/* Main content area */}
//                 <div style={{
//                     flexGrow: 1,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     padding: '20px',
//                     overflowY: 'auto',
//                     overflowX: 'hidden'
//                 }}>
//                     {/* Page header with back button */}
//                     <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '16px',
//                         marginBottom: '20px',
//                         flexShrink: 0 // Prevent header from shrinking
//                     }}>
//                         <button
//                             onClick={() => navigate(-1)}
//                             style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '8px',
//                                 padding: '8px 16px',
//                                 borderRadius: '8px',
//                                 border: 'none',
//                                 backgroundColor: '#2C3E50',
//                                 color: 'white',
//                                 cursor: 'pointer',
//                                 transition: 'background-color 0.2s'
//                             }}
//                             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#34495E'}
//                             onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2C3E50'}
//                         >
//                             <ArrowLeft size={20} />
                            
//                         </button>
//                         <h1 style={{
//                             margin: 0,
//                             fontSize: '24px',
//                             fontWeight: '600',
//                             color: '#2C3E50'
//                         }}>
//                             {getPageTitle()}
//                         </h1>
//                     </div>

//                     {/* Main content box */}
//                     <main style={{
//                         backgroundColor: 'white',
//                         borderRadius: '12px',
//                         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                         padding: '24px',
//                         flexGrow: 1,
//                         overflow: 'auto',
//                         minHeight: 0 // Important for proper flexbox behavior
//                     }}>
//                         <Outlet />
//                     </main>
                    
//             <div style={{ flexShrink: 0 }}>
//                     <Footer />
//             </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default DashboardLayout;

// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './sideBar';
// import Header from '../pages/header/Header';
// import Footer from '../pages/footer/Footer';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// const DashboardLayout = () => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const getPageTitle = () => {
//         const path = location.pathname.split('/')[1];
//         return path.charAt(0).toUpperCase() + path.slice(1);
//     };

//     const toggleSidebar = () => {
//         setIsCollapsed(!isCollapsed);
//     };

//     return (
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             height: '100vh',
//             backgroundColor: '#f5f6fa',
//             overflow: 'auto',
//         }}>
//             {/* Header */}
//             <div style={{ flexShrink: 0 }}>
//                 <Header />
//             </div>
            
//             {/* Main content wrapper */}
//             <div style={{
//                 display: 'flex',
//                 flex: 1,
//                 overflow: 'hidden',
//                 minHeight: 0 // Important for Firefox
//             }}>
//                 {/* Sidebar */}
//                 <div style={{
//                     width: isCollapsed ? '60px' : '250px',
//                     flexShrink: 0,
//                     transition: 'width 0.3s ease',
//                     backgroundColor: '#2C3E50',
//                     boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)',
//                     overflow: 'hidden'
//                 }}>
//                     <Sidebar
//                      isCollapsed={isCollapsed}
//                      toggleSidebar={toggleSidebar}
//                     />
//                 </div>
                
//                 {/* Main content area */}
//                 <div style={{
//                     flex: 1,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     minWidth: 0, // Important for content responsiveness
//                     position: 'relative' // For footer positioning
//                 }}>
//                     {/* Scrollable container */}
//                     <div style={{
//                         flex: 1,
//                         padding: '20px',
//                         paddingBottom: '80px', // Space for footer
//                         // overflowY: 'auto',
//                         // overflowX: 'hidden',

//                         display: 'flex',
//                         flexDirection: 'column',
//                         // minHeight: 0 // Important for Firefox
//                     }}>
//                         {/* Page header with back button */}
//                         <div style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '16px',
//                             marginBottom: '20px',
//                             flexShrink: 0
//                         }}>
//                             <button
//                                 onClick={() => navigate(-1)}
//                                 style={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: '8px',
//                                     padding: '8px 16px',
//                                     borderRadius: '8px',
//                                     border: 'none',
//                                     backgroundColor: '#2C3E50',
//                                     color: 'white',
//                                     cursor: 'pointer',
//                                     transition: 'background-color 0.2s'
//                                 }}
//                                 onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#34495E'}
//                                 onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2C3E50'}
//                             >
//                                 <ArrowLeft size={20} />
//                             </button>
//                             <h1 style={{
//                                 margin: 0,
//                                 fontSize: '24px',
//                                 fontWeight: '600',
//                                 color: '#2C3E50'
//                             }}>
//                                 {getPageTitle()}
//                             </h1>
//                         </div>

//                         {/* Main content box */}
//                         <main style={{
//                             backgroundColor: 'white',
//                             borderRadius: '12px',
//                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                             padding: '24px',
//                             flex: 1,
//                             // minHeight: 0,
//                             width: '100%',
//                             boxSizing: 'border-box',
//                             position: 'relative'
//                         }}>
//                             <div style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 overflow: 'auto'
//                             }}>
//                                 <Outlet />
//                             </div>
//                         </main>
//                     </div>
                    
//                     {/* Footer - Fixed at bottom */}
//                     <div style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         backgroundColor: '#f5f6fa'
//                     }}>
//                         <Footer />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sideBar';
import Header from '../pages/header/Header';
import Footer from '../pages/footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DashboardLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname.split('/')[1];
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh',
            backgroundColor: '#f5f6fa',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{ flexShrink: 0 }}>
                <Header />
            </div>
            
            {/* Main content wrapper */}
            <div style={{ 
                display: 'flex', 
                flex: 1,
                overflow: 'hidden',
                minHeight: 0 // Important for Firefox
            }}>
                {/* Sidebar */}
                <div style={{ 
                    width: isCollapsed ? '60px' : '250px',
                    flexShrink: 0,
                    transition: 'width 0.3s ease',
                    backgroundColor: '#2C3E50',
                    boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden'
                }}>
                    <Sidebar
                     isCollapsed={isCollapsed} 
                     toggleSidebar={toggleSidebar}
                    />
                </div>
                
                {/* Main content area */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0, // Important for content responsiveness
                    position: 'relative' // For footer positioning
                }}>
                    {/* Scrollable container */}
                    <div style={{
                        flex: 1,
                        padding: '20px',
                        paddingBottom: '80px', // Space for footer
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto', // Enable vertical scrolling here
                    }}>
                        {/* Page header with back button */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '20px',
                            flexShrink: 0
                        }}>
                            <button 
                                onClick={() => navigate(-1)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#2C3E50',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#34495E'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2C3E50'}
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <h1 style={{
                                margin: 0,
                                fontSize: '24px',
                                fontWeight: '600',
                                color: '#2C3E50'
                            }}>
                                {getPageTitle()}
                            </h1>
                        </div>

                        {/* Main content box */}
                        <main style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            padding: '24px',
                            flex: 1,
                            width: '100%',
                            boxSizing: 'border-box',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'auto'
                            }}>
                                <Outlet />
                            </div>
                        </main>
                    </div>
                    
                    {/* Footer - Removed absolute positioning to allow natural flow */}
                    <div style={{ 
                        flexShrink: 0, 
                        backgroundColor: '#f5f6fa' 
                    }}>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

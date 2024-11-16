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

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sideBar';
import Header from '../pages/header/Header';
import Footer from '../pages/footer/Footer';

const DashboardLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                {/* Sidebar with fixed width */}
                <div style={{ width: '250px' }}>
                    <Sidebar />
                </div>
                
                {/* Content area with remaining space */}
                <div style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}>
                    <main style={{
                        padding: '20px',
                        flexGrow: 1,
                        overflowX: 'auto',
                        overflowY: 'auto',
                    }}>
                        <Outlet />
                    </main>
                    
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

// import React from 'react';

// const Footer = () => {
//   return (
//     <footer style={{ padding: '10px', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
//       <p>&copy; 2024 My Application. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';

const Footer = () => {
    return (
        <footer style={{ 
            padding: '0.5rem',  // Reduced padding for smaller height
            backgroundColor: '#FFFFFF',  // Set background color to white
            color: '#333',  // Dark text for contrast against white background
            textAlign: 'center',
            fontSize: '0.8rem',  // Slightly smaller font size
            borderTop: '1px solid #E0E0E0'  // Light border for separation
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p style={{ margin: 0}} >&copy; 2024 Danas Pharmaceuticals Pvt. Ltd.. All rights reserved.</p>
       
            </div>
        </footer>
    );
};

export default Footer;

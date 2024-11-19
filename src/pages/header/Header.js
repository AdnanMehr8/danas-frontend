// import React from 'react';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { resetUser } from '../../store/authSlice'; // Import resetUser or equivalent
// import './Header.css';
// import logo from '../../assets/g.jpg';

// const Header = () => {
//     const isAuth = useSelector(state => state.user.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogOut = async () => {
//         try {
//             await fetch('${url}/auth/logout', {
//                 method: 'POST',
//                 credentials: 'include',
//             });

//             dispatch(resetUser()); // Reset user state in Redux
//             navigate('/login');
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <Navbar bg={isAuth ? 'grey' : 'white'} data-bs-theme="white">
//             <Container className="d-flex align-items-center">
//                 <Navbar.Brand as={Link} to='/'>
//                     <strong>{isAuth ? 'HOH-Dashboard' : 
//                         <img src={logo} alt="Logo" style={{ width: '50px', height: '50px' }} /> // Adjust size here
//                     }</strong>
//                 </Navbar.Brand>
//                 <Nav className="ml-auto d-flex align-items-center">
//                     {isAuth ? (
//                         <>
//                             <Nav.Link as={Link} to='/dashboard' className='nav-link'>Dashboard</Nav.Link>
//                             <Nav.Link className='nav-link' onClick={handleLogOut}>Log Out</Nav.Link>
//                         </>
//                     ) : (
//                         <>
//                             <Nav.Link as={Link} to='/' className='nav-link'>Home</Nav.Link>
//                             {/* <Nav.Link as={Link} to='/features' className='nav-link'>Features</Nav.Link>
//                             <Nav.Link as={Link} to='/pricing' className='nav-link'>Pricing</Nav.Link> */}
//                             <Nav.Link as={Link} to='/login' className='nav-link'>Login</Nav.Link>
//                             <Nav.Link as={Link} to='/signup' className='nav-link'>Signup</Nav.Link>
//                         </>
//                     )}
//                 </Nav>
//             </Container>
//         </Navbar>
//     );
// }

// export default Header;
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../../store/authSlice';
import { UserCircle, LogOut, Home, Settings } from 'lucide-react';
import './Header.css';
import logo from '../../assets/g.jpg';

const Header = () => {
    const isAuth = useSelector(state => state.user.auth);
    const name = useSelector(state => state.user.name);
    const role = useSelector(state => state.user.role);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const url = process.env.REACT_APP_INTERNAL_API_PATH;

    const handleLogOut = async () => {
        try {
            await fetch(`${url}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            dispatch(resetUser());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Navbar 
            style={{
                backgroundColor: isAuth ? '#1F2A38   ' : 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                padding: '0.75rem 1.5rem',
                // borderBottom: '1px solid #eaeaea'
            }}
        >
            <Container className="d-flex align-items-center justify-content-between" fluid>
                <Navbar.Brand 
                    as={Link} 
                    to='/'
                    style={{
                        color: isAuth ? 'white' : '#2C3E50',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {isAuth ? (
                        <>
                             <img 
                            src={logo} 
                            alt="Logo" 
                            style={{ 
                                width: '40px', 
                                height: '40px',
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }} 
                        />
                            Danas-Dashboard
                        </>
                    ) : (
                        <img 
                            src={logo} 
                            alt="Logo" 
                            style={{ 
                                width: '40px', 
                                height: '40px',
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }} 
                        />
                    )}
                </Navbar.Brand>
                
                <Nav className="d-flex align-items-center gap-3">
                    {isAuth ? (
                        <>
                            <Nav.Link 
                                style={{
                                    color: 'rgba(255,255,255,0.8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.95rem'
                                }}
                                className="hover-effect"
                            >
                                <UserCircle size={20} />
                                {name} ({role})
                            </Nav.Link>
                            <Nav.Link 
                                onClick={handleLogOut}
                                style={{
                                    color: 'rgba(255,255,255,0.8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'color 0.2s',
                                    fontSize: '0.95rem'
                                }}
                                className="hover-effect"
                            >
                                <LogOut size={20} />
                                Log Out
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link 
                                as={Link} 
                                to='/'
                                style={{
                                    color: '#2C3E50',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.95rem'
                                }}
                            >
                                <Home size={20} />
                                Home
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to='/login'
                                style={{
                                    backgroundColor: '#3498DB',
                                    color: 'white',
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '6px',
                                    transition: 'background-color 0.2s',
                                    fontSize: '0.95rem'
                                }}
                                className="login-btn"
                            >
                                Login
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to='/signup'
                                style={{
                                    backgroundColor: '#2C3E50',
                                    color: 'white',
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '6px',
                                    transition: 'background-color 0.2s',
                                    fontSize: '0.95rem'
                                }}
                                className="signup-btn"
                            >
                                Signup
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
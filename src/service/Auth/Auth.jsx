// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import axios from 'axios';

// function Auth() {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/users');
//             setUser(response.data); 
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }
//     };

//     if (!user) {
//         return <Navigate to={'/register'} />;
//     }else{

//         return <Outlet />;
//     }

// }

// export default Auth;
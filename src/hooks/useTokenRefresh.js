import { useEffect } from "react";
import { api, refreshAccessToken } from "../api/api";
import { useNavigate } from "react-router-dom";

const useTokenRefresh = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await api.post("/auth/refresh-token");
        console.log("Token Refreshed");
      } catch (error) {
        console.error("Token refresh failed: ", error);
        // Redirect to login if refresh fails
        navigate('/login');
      }
    }, 5 * 60 * 60 * 1000); // Refresh every 25 minutes

    return () => clearInterval(interval);
  }, [navigate]);
};
// const useTokenRefresh = () => {
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         await refreshAccessToken();
//         console.log("Token Refreshed");
//       } catch (error) {
//         console.error("Token refresh failed: ", error);
//       }
//     }, 25 * 60 * 1000); // Refresh every 25 minutes

//     return () => clearInterval(interval);
//   }, []);
// };

export default useTokenRefresh;

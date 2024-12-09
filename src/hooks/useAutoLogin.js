// import { useState, useEffect } from "react";
// import { setUser } from "../store/authSlice";
// import { useDispatch } from "react-redux";
// import { api } from "../api/api";
// function useAutoLogin() {
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     (async function autoLoginApiCall() {
//       try {
//         const response = await api.post("/auth/refresh-token");

//         if (response.status === 200) {
//           const user = {
//             _id: response.data.user._id,
//             email: response.data.user.email,
//             name: response.data.user.name,
//             role: response.data.user.role,
//             auth: response.data.auth,
//           };

//           dispatch(setUser(user));
//         }
//       } catch (error) {
//         console.error("AutoLogin error: ", error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [dispatch]);

//   return loading;
// }

// export default useAutoLogin;
import { useState, useEffect } from "react";
import { setUser, resetUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { api } from "../api/api";

function useAutoLogin() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function autoLoginApiCall() {
      try {
        const response = await api.post("/auth/refresh-token");

        if (response.status === 200) {
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            name: response.data.user.name,
            role: response.data.user.role,
            auth: response.data.auth,
          };

          dispatch(setUser(user));
        } else {
          // If response is not successful, reset user
          dispatch(resetUser());
        }
      } catch (error) {
        console.error("AutoLogin error: ", error);
        // On error, explicitly reset user and set auth to false
        dispatch(resetUser());
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return loading;
}

export default useAutoLogin;
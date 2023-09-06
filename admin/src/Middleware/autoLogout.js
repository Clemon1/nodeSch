// import { logOut } from "../features/authSlice";

// export const expireDetails = (dispatch) => {
//   const loginTime = localStorage.getItem("timeInfo");
//   const currentTime = new Date();
//   const expirationTime = 60 * 1000; // 1 hour in milliseconds

//   if (loginTime && currentTime - loginTime > expirationTime) {
//     const check = setInterval(() => {
//       dispatch(logOut());
//       console.log("Logged Out ");
//       return clearInterval(check);
//     }, 60 * 1000);

//     // localStorage.removeItem("userInfo");
//     // localStorage.removeItem("timeInfo");
//   }
// };

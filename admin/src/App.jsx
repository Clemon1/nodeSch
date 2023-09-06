import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import { expireDetails } from "./Middleware/autoLogout";
const Register = lazy(() => import("./pages/Register"));
import Login from "./pages/Login";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customers = lazy(() => import("./pages/Customers"));
const Product = lazy(() => import("./pages/Product"));
const Orders = lazy(() => import("./pages/Order"));
const Departments = lazy(() => import("./pages/Departments"));
const Subscriptions = lazy(() => import("./pages/Subscription"));
const Support = lazy(() => import("./pages/Support"));
const SingleSupport = lazy(() => import("./pages/singleSupport"));
const Profile = lazy(() => import("./pages/Profile"));
import Loader from "./components/Loader";
import ErrorPage from "./pages/Error404";
const CreateCustomer = lazy(() => import("./pages/CreateCustomer"));
import { useSelector } from "react-redux";
import { currentUser } from "./features/authSlice";
const SingleOrder = lazy(() => import("./pages/singleOrder"));
const SingleProduct = lazy(() => import("./pages/singleProduct"));
const SingleUser = lazy(() => import("./pages/singleUser"));
const Notification = lazy(() => import("./pages/NotificationPage"));
const SingleNotification = lazy(() => import("./pages/SingleNotification"));
const SearchPage = lazy(() => import("./pages/searchPage"));
import Test from "./pages/Test";
import useTitle from "./hooks/useTitle";

// import { useEffect } from "react";
// import { expireDetails } from "./Middleware/autoLogout";

function App() {
  useTitle("Nanohostng");
  const user = useSelector(currentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to={"/home"} /> : <Register />,
    },
    {
      path: "login",
      element: user ? <Navigate to={"/home"} /> : <Login />,
    },
    {
      path: "home",
      element: !user ? <Navigate to={"/login"} /> : <Dashboard />,
    },
    {
      path: "customers",
      element: !user ? <Navigate to={"/login"} /> : <Customers />,
    },
    {
      path: "customers/:id",
      element: !user ? <Navigate to={"/login"} /> : <SingleUser />,
    },
    {
      path: "customers/create",
      element: !user ? <Navigate to={"/login"} /> : <CreateCustomer />,
    },

    {
      path: "products",
      element: !user ? <Navigate to={"/login"} /> : <Product />,
    },
    {
      path: "products/:id",
      element: !user ? <Navigate to={"/login"} /> : <SingleProduct />,
    },
    {
      path: "orders",
      element: !user ? <Navigate to={"/login"} /> : <Orders />,
    },
    {
      path: "orders/:id",
      element: !user ? <Navigate to={"/login"} /> : <SingleOrder />,
    },
    {
      path: "subscriptions",
      element: !user ? <Navigate to={"/login"} /> : <Subscriptions />,
    },
    {
      path: "subscriptions",
      element: !user ? <Navigate to={"/login"} /> : <Subscriptions />,
    },
    {
      path: "departments",
      element: !user ? <Navigate to={"/login"} /> : <Departments />,
    },
    {
      path: "support",
      element: !user ? <Navigate to={"/login"} /> : <Support />,
    },
    {
      path: "support/:id",
      element: !user ? <Navigate to={"/login"} /> : <SingleSupport />,
    },
    {
      path: "profile",
      element: !user ? <Navigate to={"/login"} /> : <Profile />,
    },
    {
      path: "notification",
      element: !user ? <Navigate to={"/login"} /> : <Notification />,
    },
    {
      path: "notification/:id",
      element: !user ? <Navigate to={"/login"} /> : <SingleNotification />,
    },
    {
      path: "search/:searchUser",
      element: !user ? <Navigate to={"/login"} /> : <SearchPage />,
    },
    {
      path: "test",
      element: !user ? <Navigate to={"/login"} /> : <Test />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   expireDetails(dispatch);
  // }, [dispatch]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;

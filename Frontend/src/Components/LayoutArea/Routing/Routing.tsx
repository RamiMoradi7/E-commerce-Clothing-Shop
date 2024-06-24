import { Navigate, Route, Routes } from "react-router-dom";
import { useCurrentUser } from "../../../Utils/CurrentUser";
import AdminDashboard from "../../pages/AdminDashboard";
import AddAudience from "../../pages/AddAudience";
import AddBrand from "../../pages/AddBrand";
import AddCategory from "../../pages/AddCategory";
import AddColor from "../../pages/AddColor";
import AddProduct from "../../pages/AddProduct";
import Checkout from "../../pages/Checkout";
import EditAudience from "../../pages/EditAudience";
import EditBrand from "../../pages/EditBrand";
import EditCategory from "../../pages/EditCategory";
import EditColor from "../../pages/EditColor";
import EditProduct from "../../pages/EditProduct";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Page404 from "../../pages/Page404";
import PaymentSuccessPage from "../../pages/PaymentSuccessPage";
import Details from "../../pages/ProductDetails";
import ProductList from "../../pages/ProductList";
import Register from "../../pages/Register";
import AddSize from "../../pages/AddSize";
import EditSize from "../../pages/EditSize";

function Routing(): JSX.Element {
  const { isAdmin } = useCurrentUser();
  const userRoutes = [
    { path: "/home", element: <Home /> },
    { path: "*", element: <Page404 /> },
    { path: "/", element: <Navigate to="/home" /> },
    { path: "/products", element: <ProductList /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/products/details/:_id", element: <Details /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/payment-success/:_id", element: <PaymentSuccessPage /> },
  ];
  const adminRoutes = [
    { path: "/products/new", element: <AddProduct /> },
    { path: "/products/edit/:_id", element: <EditProduct /> },
    { path: "/categories/new", element: <AddCategory /> },
    { path: "/categories/edit/:_id", element: <EditCategory /> },
    { path: "/audiences/new", element: <AddAudience /> },
    { path: "/audiences/edit/:_id", element: <EditAudience /> },
    { path: "/brands/new", element: <AddBrand /> },
    { path: "/brands/edit/:_id", element: <EditBrand /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
    { path: "/colors/new", element: <AddColor /> },
    { path: "/colors/edit/:_id", element: <EditColor /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
    { path: "/:sizeType/new", element: <AddSize /> },
    { path: "/:sizeType/edit/:_id", element: <EditSize /> },
  ];
  return (
    <div className="Routing">
      <Routes>
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {isAdmin &&
          adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
      </Routes>
    </div>
  );
}

export default Routing;

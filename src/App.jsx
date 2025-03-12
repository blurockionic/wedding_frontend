import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import OutletPage from "./pages/OutletPage.jsx";

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const Signup = lazy(() => import("./pages/auth/Signup.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicePage.jsx"));
const ServiceDetail = lazy(() => import("./pages/serviceDeatails.jsx"));

const VendorRegistration = lazy(() =>
  import("./pages/auth/vendor _auth/VendorSignup.jsx")
);
import VendorDashboard from "./pages/vendorDashboard/Dashboard.jsx";
const Subscription = lazy(() => import("./pages/Subscription.jsx"));
import { HelmetProvider } from "react-helmet-async";

const Billing = lazy(() => import("./pages/vendorDashboard/Billing.jsx"));

const Checklist = lazy(() => import("./pages/userDashboard/checklist/Checklist.jsx"));
const Admin = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminGeneralAnalytics = lazy(() => import("./pages/admin/generalAnalytics.jsx"));

const Setting = lazy(() => import("./pages/vendorDashboard/Setting.jsx"));
const ContactUs = lazy(() => import("./pages/contactus/ContactUs.jsx"));
const Analytics = lazy(() => import("./pages/vendorDashboard/Analytics.jsx"));
const WeddingBudgetCalculator  = lazy(()=> import("./pages/userDashboard/budget-calculator/WeddingBudgetCalculator.jsx"))
const VendorServicesPage = lazy(() =>
  import("./pages/vendorDashboard/VendorServicePage.jsx")
);
const VendorLogin = lazy(() =>
  import("./pages/auth/vendor _auth/VendorLogin.jsx")
);
const DashBoardDetailPage = lazy(() =>
  import("./pages/vendorDashboard/component/DashBoardDetailPage.jsx")
);
const FullErrorPage = lazy(() => import("./pages/FullErrorPage.jsx"));
const UserProfile = lazy(() => import("./pages/userDashboard/UserProfile.jsx"));
const UserDashboard = lazy(() =>
  import("./pages/userDashboard/UserDashBoard.jsx")
);
const Success = lazy(() => import("./pages/success/Success.jsx"));
const VendorForgotPassword = lazy(() =>
  import("./pages/auth/vendor _auth/VendorForgotPassword.jsx")
);
const UserForgotPassword = lazy(() =>
  import("./pages/auth/UserForgotPassword.jsx")
);
const VendorChangePassword = lazy(() =>
  import("./pages/change-password/VendorChangePassword.jsx")
);
const ChangePassword = lazy(() => import("./pages/auth/ChangePassword.jsx"));
const FavoriteListPage = lazy(() =>
  import("./pages/userDashboard/FavoriteList.jsx")
);
const VendorProfile = lazy(() =>
  import("./pages/vendorDashboard/VendorProfile.jsx")
);
const AllCategories = lazy(() =>
  import("./pages/service-category/ServiceCategoriesPage.jsx")
);
const Category = lazy(() =>
  import("./pages/service-category/category/Category.jsx")
);
const SubCategories = lazy(() =>
  import("./pages/service-category/sub-category/SubCategories.jsx")
);
const CategoryByState = lazy(() =>
  import("./pages/service-category/category-by-state/CategoryByState.jsx")
);
const CategoryByCity = lazy(() =>
  import("./pages/service-category/category-by-city/CategoryByCity.jsx")
);
const VenderBiodata = lazy(() =>
  import("./pages/service-category/vendor-details/VendorDetails.jsx")
);
const ServiceDetails = lazy(() =>
  import("./pages/service-category/service-details/ServiceDetails.jsx")
);

const Payments = lazy(() =>
  import("./pages/vendorDashboard/component/Payments.jsx")
);
const AboutPage = lazy(() => import("./pages/section/About.jsx"));
const VendorSetting = lazy(() =>
  import("./pages/vendorDashboard/VendorsSetting.jsx")
);
const Template = lazy(() => import("./pages/InvitationTemplates/Template.jsx"));
const View = lazy(() => import("./pages/ViewTemplate/View.jsx"));
const View_1 = lazy(() => import("./pages/ViewTemplate/View_1.jsx"));
const Payment = lazy(() => import("./pages/InvitationPayment/Payment.jsx"));
const Preview = lazy(() => import("./pages/EditTemplate/Preview.jsx"));
const Preview_1 = lazy(() => import("./pages/EditTemplate/Preview_1.jsx"));
const Card = lazy(() => import("./pages/InvitationCard/Card.jsx"));
const Guest = lazy(() => import("./pages/AddGuests/Guest.jsx"));
const Modify = lazy(() => import("./pages/UpdatedTemplate/Modify.jsx"));
const Modify_1 = lazy(() => import("./pages/UpdatedTemplate/Modify_1.jsx"));

function wrapWithSuspense(Component) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletPage />,
    children: [
      { path: "/", element: wrapWithSuspense(LandingPage) },
      {
        path: "/admin",
        element: (
          <ProtectedRoute
            component={() => wrapWithSuspense(Admin)}
            allowedRoles={["admin", "super_admin"]}
          />
        ), 
        // Protected route
        children: [
          { path: "", index: true, element: wrapWithSuspense(AdminGeneralAnalytics) },
          // { path: "favoriteList", element: wrapWithSuspense(FavoriteListPage) },
          // { path: "checklist", element: wrapWithSuspense(Checklist) },
          // { path: "weddingbudget", element: wrapWithSuspense(WeddingBudgetCalculator)}
        ],
      },
      { path: "/signup", element: wrapWithSuspense(Signup) },
      { path: "/templates", element: wrapWithSuspense(Template) },
      { path: "/card", element: wrapWithSuspense(Card) },
      { path: "/guests", element: wrapWithSuspense(Guest) },
      {
        path: "/guests/see-template/template",
        element: wrapWithSuspense(Modify),
      },
      {
        path: "/guests/see-template/template1",
        element: wrapWithSuspense(Modify_1),
      },
      { path: "/payment", element: wrapWithSuspense(Payment) },
      { path: "/preview", element: wrapWithSuspense(Preview) },
      { path: "/preview_1", element: wrapWithSuspense(Preview_1) },
      { path: "/view", element: wrapWithSuspense(View) },
      { path: "/view_1", element: wrapWithSuspense(View_1) },
      { path: "/login", element: wrapWithSuspense(Login) },
      { path: "/contactus", element: wrapWithSuspense(ContactUs) },
      { path: "/checklist", element: wrapWithSuspense(Checklist) },
      // dynamic route for category
      { path: "/all", element: wrapWithSuspense(AllCategories) },
      { path: "/all/:category", element: wrapWithSuspense(Category) },
      {
        path: "/all/:category/:subCategory",
        element: wrapWithSuspense(SubCategories),
      },
      {
        path: "/all/:category/:subcategory/:state",
        element: wrapWithSuspense(CategoryByState),
      },
      {
        path: "/all/:category/:subcategory/:state/:city",
        element: wrapWithSuspense(CategoryByCity),
      },
      {
        path: "/all/:category/:subcategory/:state/:city/:id",
        element: wrapWithSuspense(ServiceDetails),
      },
      {
        path: "/:location/:vendorname",
        element: wrapWithSuspense(VenderBiodata),
      },

      { path: "/about", element: wrapWithSuspense(AboutPage) }, // Add the About page route
      {
        path: "/user-forgot-password",
        element: wrapWithSuspense(UserForgotPassword),
      },
      {
        path: "/user-change-password",
        element: wrapWithSuspense(ChangePassword),
      },
      { path: "/success", element: wrapWithSuspense(Success) },
      { path: "/vendorSignup", element: wrapWithSuspense(VendorRegistration) },
      { path: "/vendorLogin", element: wrapWithSuspense(VendorLogin) },
      {
        path: "vendor-forgot-password",
        element: wrapWithSuspense(VendorForgotPassword),
      },
      {
        path: "vendor-change-password",
        element: wrapWithSuspense(VendorChangePassword),
      },
      { path: "/services", element: wrapWithSuspense(ServicesPage) },
      { path: "/service/:id", element: wrapWithSuspense(ServiceDetail) },
      {
        path: "/profile",
        element: (
          <ProtectedRoute
            component={() => wrapWithSuspense(UserDashboard)}
            allowedRoles={["user", "admin"]}
          />
        ), 
        // Protected route
        children: [
          { path: "", index: true, element: wrapWithSuspense(UserProfile) },
          { path: "favoriteList", element: wrapWithSuspense(FavoriteListPage) },
          { path: "checklist", element: wrapWithSuspense(Checklist) },
          { path: "weddingbudget", element: wrapWithSuspense(WeddingBudgetCalculator)}
        ],
      },

      // Protect vendor dashboard routes
      {
        path: "/VendorDashboard",
        element: (
          <ProtectedRoute
            component={() => wrapWithSuspense(VendorDashboard)}
            allowedRoles={["vendor", "admin"]}
          />
        ), // Protected route
        children: [
          {
            index: true,
            element: wrapWithSuspense(VendorServicesPage),
          },
          { path: "analytics", element: wrapWithSuspense(Analytics) },
          { path: "settings", element: wrapWithSuspense(Setting) },
          { path: "bookings", element: <Billing /> },
          { path: "vendor-profile", element: wrapWithSuspense(VendorProfile) },
          { path: "payments", element: wrapWithSuspense(Payments) },
          { path: "Plan", element: wrapWithSuspense(Subscription) },
          { path: "vendor-setting", element: wrapWithSuspense(VendorSetting) },
          {
            path: "service-details/:serviceId",
            element: wrapWithSuspense(DashBoardDetailPage),
          },
        ],
      },

      { path: "*", element: wrapWithSuspense(FullErrorPage) },
    ],
  },
]);

function App() {
  return (
    <>
      <HelmetProvider>
        <ErrorBoundary>
          <ToastContainer position="bottom-right" />
          <RouterProvider router={router} />
        </ErrorBoundary>
      </HelmetProvider>
    </>
  );
}

export default App;

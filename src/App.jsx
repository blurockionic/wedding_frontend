import { Suspense, lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import OutletPage from "./pages/OutletPage.jsx";

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const Signup = lazy(() => import("./pages/auth/Signup.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ServiceDetail = lazy(() => import("./pages/serviceDeatails.jsx"));

const VendorRegistration = lazy(() =>
  import("./pages/auth/vendor_auth/VendorSignup.jsx")
);
import VendorDashboard from "./pages/vendorDashboard/Dashboard.jsx";
const Subscription = lazy(() => import("./pages/Subscription.jsx"));
import { HelmetProvider } from "react-helmet-async";
import { motionlogo } from "./static/static.js";
import SplashScreen from "./pages/SplashScreen/SplashScreen.jsx";
import VendorBussinessProfile from "./pages/vendorDashboard/VendorBussinessProfile.jsx";
import PartnershipProgram from "./pages/PartnerShip.jsx";

import VendorApplicationForm from "./pages/PartnerForm.jsx";
import PartnerAdminDashboard from "./pages/admin/Partner.jsx";
import Partnerdetail from "./pages/admin/Partnerdetail.jsx";
import LeadListInPartnerDashBoard from "./pages/partner/LeadListInPartnerDashBoard.jsx";
import AIAssistant from "./components/Ai-assistant/AiAssistant.jsx";

const Billing = lazy(() => import("./pages/vendorDashboard/Billing.jsx"));

const Checklist = lazy(() =>
  import("./pages/userDashboard/checklist/Checklist.jsx")
);
const Admin = lazy(() => import("./pages/admin/Dashboard.jsx"));

const Blog = lazy(() => import("./pages/blog-section/blog-section/Blog.jsx"));
const BlogDashboard = lazy(() =>
  import("./pages/blog-section/admin-section/BlogDashboard.jsx")
);
const NewBlogPost = lazy(() =>
  import("./pages/blog-section/admin-section/NewBlogPost.jsx")
);
const BlogList = lazy(() =>
  import("./pages/blog-section/blog-section/BlogList.jsx")
);
const UpdateBlogPost = lazy(() =>
  import("./pages/blog-section/admin-section/UpdateBlogPost.jsx")
);

const Setting = lazy(() => import("./pages/vendorDashboard/Setting.jsx"));
const ContactUs = lazy(() => import("./pages/contactus/ContactUs.jsx"));
const Analytics = lazy(() => import("./pages/vendorDashboard/Analytics.jsx"));
const WeddingBudgetCalculator = lazy(() =>
  import("./pages/userDashboard/budget-calculator/WeddingBudgetCalculator.jsx")
);
const VendorServicesPage = lazy(() =>
  import("./pages/vendorDashboard/VendorServicePage.jsx")
);
const VendorLogin = lazy(() =>
  import("./pages/auth/vendor_auth/VendorLogin.jsx")
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
  import("./pages/auth/vendor_auth/VendorForgotPassword.jsx")
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
const InvitationTemplateInUserDashBord = lazy(() =>
  import("./pages/userDashboard/InvitationTemplateInUserDashBord.jsx")
);
const CityManagerPage = lazy(() =>
  import("./pages/userDashboard/CityManagerPage.jsx")
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
const QueryForm = lazy(() => import("./pages/Query/QueryForm.jsx"));
const QueryList = lazy(() => import("./pages/Query/QueryList.jsx"));
const Review = lazy(() => import("./pages/BrowseTemplate/Review.jsx"));
const View = lazy(() => import("./pages/ViewTemplate/View.jsx"));
const View_1 = lazy(() => import("./pages/ViewTemplate/View_1.jsx"));
const Payment = lazy(() => import("./pages/InvitationPayment/Payment.jsx"));
const Preview = lazy(() => import("./pages/EditTemplate/Preview.jsx"));
const Preview_1 = lazy(() => import("./pages/EditTemplate/Preview_1.jsx"));
const canva = lazy(() => import("./pages/EditTemplate/canva.jsx"));
const Card = lazy(() => import("./pages/InvitationCard/Card.jsx"));
const Guest = lazy(() => import("./pages/AddGuests/Guest.jsx"));
const Modify = lazy(() => import("./pages/UpdatedTemplate/Modify.jsx"));
const Editor = lazy(() => import("./pages/editor/Editor.jsx"));
const WeddingDairy = lazy(() => import("./pages/wedding-plan/WeddingPlan.jsx"));
const AdminGeneralAnalytics = lazy(() =>
  import("./pages/admin/GeneralAnalytics.jsx")
);
const AdminVendorSearch = lazy(() => import("./pages/admin/VendorSearch.jsx"));
const AdminServiceSearch = lazy(() =>
  import("./pages/admin/ServiceSearch.jsx")
);
const AdminUserSearch = lazy(() => import("./pages/admin/UserSearch.jsx"));
const AdminTransactions = lazy(() => import("./pages/admin/Transactions.jsx"));
const AdminBlogDashboard =  lazy(() => import("./pages/blog-section/admin-section/BlogDashboard.jsx"));
const AdminGive = lazy(() => import("./pages/admin/GiveAdmin.jsx"));
const AdminRevoke = lazy(() => import("./pages/admin/RevokeAdmin.jsx"));
const AdminGiveSuper = lazy(() => import("./pages/admin/GiveSuperAdmin.jsx"));

function wrapWithSuspense(Component) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center flex-col gap-2 items-center h-screen">
          <img src={motionlogo} alt="loader" className="w-12 h-12" />
          <p>Loading...</p>
        </div>
      }
    >
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
      { path: "/blog_dashboard", element: wrapWithSuspense(BlogDashboard) },
      { path: "/new-blog-post", element: wrapWithSuspense(NewBlogPost) },
      { path: "/blogs", element: wrapWithSuspense(BlogList) },
      { path: "/blogs/:urlTitle", element: wrapWithSuspense(Blog) },

      {
        path: "/update-blog-post/:urlTitle",
        element: wrapWithSuspense(UpdateBlogPost),
      },
      // { path: "/", element: wrapWithSuspense(Blog)},

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
          {
            path: "",
            index: true,
            element: wrapWithSuspense(AdminGeneralAnalytics),
          },
          {
            path: "vendorSearch",
            element: wrapWithSuspense(AdminVendorSearch),
          },
          {
            path: "serviceSearch",
            element: wrapWithSuspense(AdminServiceSearch),
          },
          { path: "userSearch", element: wrapWithSuspense(AdminUserSearch) },
          {
            path: "transactions",
            element: wrapWithSuspense(AdminTransactions),
          },
          {
            path: "blog_dashboard",
            element: wrapWithSuspense(AdminBlogDashboard),
          },
          { path: "giveAdmin", element: wrapWithSuspense(AdminGive) },
          { path: "revokeAdmin", element: wrapWithSuspense(AdminRevoke) },
          { path: "giveSuperAdmin", element: wrapWithSuspense(AdminGiveSuper) },
          // { path: "favoriteList", element: wrapWithSuspense(FavoriteListPage) },
          // { path: "checklist", element: wrapWithSuspense(Checklist) },
          // { path: "weddingbudget", element: wrapWithSuspense(WeddingBudgetCalculator)}
          {
            path: "partnerAdminDashboard",
            element: wrapWithSuspense(PartnerAdminDashboard),
          },
          { path: "partnerDetail", element: wrapWithSuspense(Partnerdetail) },
        ],
      },
      { path: "/signup", element: wrapWithSuspense(Signup) },
      { path: "/templates", element: wrapWithSuspense(Template) },
      { path: "/browse", element: wrapWithSuspense(Review) },
      { path: "/query-form", element: wrapWithSuspense(QueryForm) },
      { path: "/query-list", element: wrapWithSuspense(QueryList) },
      { path: "/card", element: wrapWithSuspense(Card) },
      { path: "/guests", element: wrapWithSuspense(Guest) },

      //editor
      { path: "/editor", element: wrapWithSuspense(Editor) },

      {
        path: "/guests/see-template/template",
        element: wrapWithSuspense(Modify),
      },

      // { path: "/guests/see-template/template1", element: wrapWithSuspense(Modify_1) },

      {
        path: "/guests/see-template/:template",
        element: wrapWithSuspense(Modify),
      },

      { path: "/payment", element: wrapWithSuspense(Payment) },
      { path: "/preview", element: wrapWithSuspense(Preview) },
      { path: "/preview_1", element: wrapWithSuspense(Preview_1) },
      { path: "/update_editor", element: wrapWithSuspense(canva) },
      { path: "/view", element: wrapWithSuspense(View) },
      { path: "/view_1", element: wrapWithSuspense(View_1) },
      { path: "/login", element: wrapWithSuspense(Login) },
      { path: "/contactus", element: wrapWithSuspense(ContactUs) },

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

      { path: "/about", element: wrapWithSuspense(AboutPage) },
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
      { path: "/service/:id", element: wrapWithSuspense(ServiceDetail) },

      // Protect user admin routes
      {
        path: "/profile",
        element: (
          <ProtectedRoute
            component={() => wrapWithSuspense(UserDashboard)}
            allowedRoles={["user", "admin", "super_admin"]}
          />
        ),
        children: [
          { path: "", index: true, element: wrapWithSuspense(UserProfile) },
          { path: "favoriteList", element: wrapWithSuspense(FavoriteListPage) },
          { path: "checklist", element: wrapWithSuspense(Checklist) },
          {
            path: "weddingbudget",
            element: wrapWithSuspense(WeddingBudgetCalculator),
          },
          { path: "weddingplan", element: wrapWithSuspense(WeddingDairy) },
          {
            path: "invitationCards",
            element: wrapWithSuspense(InvitationTemplateInUserDashBord),
          },
          {
            path: "cityManager",
            element: wrapWithSuspense(CityManagerPage),
          },
        ],
      },

      // Protect vendor dashboard routes
      {
        path: "/VendorDashboard",
        element: (
          <ProtectedRoute
            component={() => wrapWithSuspense(VendorDashboard)}
            allowedRoles={["vendor", "admin", "super_admin"]}
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
      {
        path: "vendorBussinessProfile",
        element: wrapWithSuspense(VendorBussinessProfile),
      },

      { path: "*", element: wrapWithSuspense(FullErrorPage) },

      {
        path: "partnership",
        children: [
          {
            path: "",
            element: wrapWithSuspense(PartnershipProgram),
          },
          {path: "dashboard", index: true, element: wrapWithSuspense(LeadListInPartnerDashBoard)},
          
          { path: "form", element: wrapWithSuspense(VendorApplicationForm) },
        ],
      },
    ],
  },
]);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowSplash(false);
    } else {
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <>
      <HelmetProvider>
        <ErrorBoundary>
          {showSplash ? (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          ) : (
            <>
              <RouterProvider router={router} />
              <ToastContainer />
              <AIAssistant />
            </>
          )}
        </ErrorBoundary>
      </HelmetProvider>
    </>
  );
}

export default App;

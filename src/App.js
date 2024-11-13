import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import OpeningBalance from "./components/OpeningBalance";
import JournalEntry from "./components/JournalEntry";
import VoucherNumberForm from "./components/VoucherNumberForm";
import AccountView from "./components/AccountView";
import Reports from "./components/Reports";
import AccountMaster from "./components/AccountMaster";
import UserAccess from "./components/UserAccess";
import StudentDetails from "./Pages/StudentDetails";
import UserAccessnew from "./Pages/UserAccessnew";
import UserAccessnewUpdate from "./Pages/UserAccessnewUpdate";
import UserAccessnewDetailes from "./Pages/UserAccessnewDetailes";
import StudentRegister from "./Pages/StudentRegister";
import StudentRegisterupdate from "./Pages/StudentRegisterupdate";
import withSideBarLayout from "./components/Sidebar";
import { useLogin } from "./hooks/useLogin";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Import } from "./Pages/Import";
import { useEffect } from "react";

function App() {
  // Custom hook to get user login information
  const { user } = useLogin();
  const navigate = useNavigate();

  // Effect to check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  if (!user) {
    console.log("no user found")
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        {/* Public route for login */}
        <Route path="/" element={<Login />} />

        {/* Protected route for Dashboard */}
        <Route path="/Dashboard" element={withSideBarLayout(<Dashboard />, true)} />

        {/* Conditional routes based on user access rights */}
        {user?.accessTo?.isStudent && (
          <>
            {/* Student-related routes */}
            <Route path="/Students" element={withSideBarLayout(<Students />, true)} />
            <Route path="/Students/Import" element={withSideBarLayout(<Import />, true)} />
            <Route path="/StudentDetails/:_id" element={withSideBarLayout(<StudentDetails />, true)} />
            <Route path="/StudentRegister" element={withSideBarLayout(<StudentRegister />, true)} />
            <Route path="/StudentRegisterupdate/:_id" element={withSideBarLayout(<StudentRegisterupdate />, true)} />
            {/* <Route path="/StudentRegisterclone" element={withSideBarLayout(<StudentRegisterclone />, true)} /> */}
          </>
        )}
        {user?.accessTo?.isTransaction && (
          <>
            {/* Transaction-related routes */}
            <Route path="/OpeningBalance" element={withSideBarLayout(<OpeningBalance />, true)} />
            <Route path="/JournalEntry" element={withSideBarLayout(<JournalEntry />, true)} />
            <Route path="/VoucherNumberForm" element={withSideBarLayout(<VoucherNumberForm />, true)} />
          </>
        )}
        {user?.accessTo?.isAccountView && (
          <Route path="/AccountView" element={withSideBarLayout(<AccountView />, true)} />
        )}
        {user?.accessTo?.isReports && (
          <Route path="/Reports" element={withSideBarLayout(<Reports />, true)} />
        )}
        {user?.accessTo?.isAccountMaster && (
          <Route path="/AccountMaster" element={withSideBarLayout(<AccountMaster />, true)} />
        )}
        
        {/* User access management routes */}
        <Route path="/UserAccess" element={withSideBarLayout(<UserAccess />, true)} />
        <Route path="/UserAccessnew" element={withSideBarLayout(<UserAccessnew />, true)} />
        <Route path="/UserAccessnewUpdate/:userId" element={withSideBarLayout(<UserAccessnewUpdate />, true)} />
        <Route path="/UserAccessnewDetailes/:userId" element={withSideBarLayout(<UserAccessnewDetailes />, true)} />
      </Routes>

      {/* Notification container for toast messages */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </div>
  );
}

export default App;



// Explanation 
// Import Statements: Each import statement is commented to clarify what component or library is being imported.
// useEffect: Describes the purpose of the effect and the logic behind token checking for authentication.
// Routes: Each route is commented to indicate if it is public, protected, or conditional based on user access rights.
// Conditional Rendering: Explains the logic behind showing certain routes based on the user's permissions.
// Toast Notifications: Clarifies the purpose of the ToastContainer for user feedback.
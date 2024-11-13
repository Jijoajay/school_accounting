import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../Styles/Sidebar.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import Topbar from "../components/Topbar";
import { MdOutlineDashboard } from "react-icons/md";
import { useLogin } from "../hooks/useLogin";
import Students from "../img/Student.png";
import Studentsact from "../img/Studentsinactive.png";
import Transaction from "../img/Transactioninactive.png";
import Transactionact from "../img/Transactionactive.png";
import AccountView from "../img/Accountinactie.png";
import AccountViewact from "../img/Accountactive.png";
import Reports from "../img/Reportsinactive.png";
import Reportsact from "../img/Reports.png";
import AccountMaster from "../img/Masterinactive.png";
import AccountMasteract from "../img/Masteractive.png";
import UserAccess from "../img/UserAccess.png";
import UserAccessact from "../img/UserAccessactive.png";
import { AiOutlineTransaction } from "react-icons/ai";

const Sidebar = ({ children }) => {
  const { user } = useLogin();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const location = useLocation();

  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icons: <MdOutlineDashboard />,
    },
    user?.accessTo?.isStudent && {
      path: "/Students",
      name: "Students",
      img: [Studentsact, Students],
    },
    user?.accessTo?.isTransaction && {
      path: "/OpeningBalance",
      name: "Transaction",
      // icons: <AiOutlineTransaction />,
            img: [Transaction, Transactionact],
 
      subMenu: [
        { path: "/OpeningBalance", name: "Opening Balance" },
        { path: "/JournalEntry", name: "Journal Entry" },
        { path: "/VoucherNumberForm", name: "Voucher Number Form" },
      ],
    },
    user?.accessTo?.isAccountView && {
      path: "/AccountView",
      name: "Account View",
      img: [AccountView, AccountViewact],
    },
    user?.accessTo?.isReports && {
      path: "/Reports",
      name: "Reports",
      img: [Reports, Reportsact],
    },
    user?.accessTo?.isAccountMaster && {
      path: "/AccountMaster",
      name: "Account Master",
      img: [AccountMaster, AccountMasteract],
    },
    {
      path: "/UserAccess",
      name: "User Access",
      img: [UserAccess, UserAccessact],
    },
  ].filter(Boolean);

  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   const index = menuItem.findIndex((item) => item.path === currentPath);
  //   setActiveItemIndex(index !== -1 ? index : 0);
  // }, [location.pathname, menuItem]);

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const getNavLinkClass = (path) => {
    const isActive =
      location.pathname === path ||
      (path === "/Students" &&
        (location.pathname.startsWith("/StudentRegister") ||
         location.pathname.startsWith("/StudentRegisterupdate") ||
         location.pathname.startsWith("/StudentDetails"))) ||
      (path === "/OpeningBalance" &&
        (location.pathname.startsWith("/OpeningBalance") ||
         location.pathname.startsWith("/JournalEntry") ||
         location.pathname.startsWith("/VoucherNumberForm"))) ||
      (path === "/UserAccess" &&
        (location.pathname.startsWith("/UserAccessnew") ||
         location.pathname.startsWith("/UserAccessnewDetailes") ||
         location.pathname.startsWith("/UserAccessnewUpdate")));
  
    return isActive ? "active" : "";
  };
  
  useEffect(() => {
    const currentPath = location.pathname;
    // const toggle = () => setIsOpen(isOpen);
    const index = menuItem.findIndex((item) => 
      item.path === currentPath ||
      (item.path === "/Students" && (
        currentPath.startsWith("/StudentRegister") ||
        currentPath.startsWith("/StudentRegisterupdate") ||
        currentPath.startsWith("/StudentDetails")
      )) ||
      (item.path === "/OpeningBalance" && (
        currentPath.startsWith("/OpeningBalance") ||
        currentPath.startsWith("/JournalEntry") ||
        currentPath.startsWith("/VoucherNumberForm")
      )) ||
      (item.path === "/UserAccess" && (
        currentPath.startsWith("/UserAccessnew") ||
        currentPath.startsWith("/UserAccessnewDetailes") ||
        currentPath.startsWith("/UserAccessnewUpdate")
      ))
    );
  
    setActiveItemIndex(index !== -1 ? index : 0);
  }, [location.pathname, menuItem]);
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Topbar toggle={toggle} isOpen={isOpen} />
      <div className="section d-flex" style={{ fontFamily: "Roboto, sans-serif" }}>
        <div style={{ width: isOpen ? "300px" : "70px" }} className="sidebar mt-3">
          {menuItem.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.path}
                className={`linkss ${getNavLinkClass(item.path)}`}
                onClick={() => {
                  if (item.subMenu) toggleDropdown(index);
                  setActiveItemIndex(index);
                }}
                onMouseEnter={() => setHoveredItemIndex(index)}
                onMouseLeave={() => setHoveredItemIndex(null)}
              >
                <div className="icon mt-1 mb-1">
                  {activeItemIndex === index || hoveredItemIndex === index ? (
                    item.img ? (
                      <img src={item.img[1]} alt={item.name} className="imgs" /> // Active image
                    ) : (
                      item.icons
                    )
                  ) : item.img ? (
                    <img src={item.img[0]} alt={item.name} className="imgs" /> // Inactive image
                  ) : (
                    item.icons
                  )}
                </div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text mt-1 mb-1">
                  {item.name}
                </div>
                {item.subMenu && (
                  <div className="dropdown-icon" style={{ marginLeft: "auto" }}>
                    {dropdownOpen === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                )}
              </NavLink>
              {item.subMenu && dropdownOpen === index && (
                <div className="subMenu" style={{ display: isOpen ? "block" : "none", marginLeft: "20px" }}>
                  {item.subMenu.map((subItem, subIndex) => (
                    <NavLink to={subItem.path} key={subIndex} className="linkss2 sub-link">
                      <div className="link_text mt-1 mb-1">
                        <GoDotFill className="imgs" /> {subItem.name}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="link d-flex" style={{ marginTop: "10%" }} onClick={handleLogOut}>
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
              Logout
            </div>
          </div>
        </div>
        <main className="content">{children}</main>
      </div>
    </>
  );
};

const withSideBarLayout = (component) => {
  return <Sidebar>{component}</Sidebar>;
};

export default withSideBarLayout;

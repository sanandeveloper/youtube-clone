import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Video, User } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log("authstatus",authStatus)
  
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const navItem = [
    { path: "/", name: "Home", active: authStatus },
    { path: "/signup", name: "SignUp", active: !authStatus },
    { path: "/login", name: "Login", active: !authStatus },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16">
        {/* LEFT: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="src/assets/download.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg hidden sm:block">MyTube</span>
        </div>

        {/* CENTER: Search bar */}
        <div className="flex-1 px-4 max-w-2xl">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <button className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 flex items-center justify-center hover:bg-gray-200">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* RIGHT: Icons + Profile/Login */}
        <div className="flex items-center gap-4">
          {authStatus && (
            <>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <img
                src={
                  user?.avatar ||
                  "https://via.placeholder.com/40x40.png?text=U"
                }
                alt="avatar"
                onClick={() => navigate("/user")}
                className="w-9 h-9 rounded-full cursor-pointer border"
              />
            </>
          )}

          {!authStatus &&
            navItem.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="px-4 py-1.5 rounded-full border text-sm font-medium hover:bg-gray-50"
                  >
                    {item.name}
                  </button>
                )
            )}
        </div>
      </div>
    </header>
  );
}

export default Header;

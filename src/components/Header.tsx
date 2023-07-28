"use client";

import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";

import Button from "@/common/components/Button";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const router = useRouter();
  const user = localStorage.getItem("sb-localhost-auth-token");

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };
  return (
    <div>
      <div className="flex flex-row-reverse bg-slate-300 items-center gap-x-4 p-5">
        {user ? (
          <div className="flex gap-x-4 items-center">
            <Button
              onClick={handleLogout}
              className="bg-white px-6 py-2 rounded-lg"
            >
              Logout
            </Button>
            <Button
              onClick={() => router.push("/account")}
              className="bg-white"
            >
              <FaUserAlt />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;

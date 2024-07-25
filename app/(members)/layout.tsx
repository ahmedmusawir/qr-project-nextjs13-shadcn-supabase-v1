"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Spinner from "@/components/common/Spinner";
import { useRouter } from "next/navigation";
import Navbar from "@/components/global/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const MemberLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const roles = useAuthStore((state) => state.roles);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else if (roles.is_qr_member !== 1) {
      router.push("/auth");
    }
  }, [isAuthenticated, roles, router]);

  if (!isAuthenticated || roles.is_qr_member !== 1) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* <div className="hidden md:block h-auto flex-shrink-0 border-4 w-[25rem]">
          <Sidebar />
        </div> */}
        <div className="flex-1 p-5 md:max-w-[1140px]">{children}</div>
      </div>
    </div>
  );
};

export default MemberLayout;

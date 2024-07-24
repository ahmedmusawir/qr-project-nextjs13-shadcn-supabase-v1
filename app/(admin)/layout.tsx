import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/global/Navbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  // Protecting from non-logged in public user
  // if (error || !data.user) {
  //   redirect("/auth");
  //   return null;
  // }

  // Protecting from logged in other types of users
  // const roles = data.user.user_metadata;
  // console.log("USER METADATA IN MEMBER LAYOUT", roles);

  // if (roles.is_qr_member !== 1) {
  //   redirect("/auth");
  //   return null;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-1 p-5 md:max-w-[1140px]">{children}</div>
      </div>
    </div>
  );
}

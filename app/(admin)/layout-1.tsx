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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-1 p-5 md:max-w-[1140px]">{children}</div>
      </div>
    </div>
  );
}

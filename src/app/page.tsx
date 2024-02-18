import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Portfolio Admin - Alex",
  description: "This is the admin panel of Alex's portfolio",
};

export default function Home() {
  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableSkills from "@/components/Tables/TableSkills";

export const metadata: Metadata = {
  title: "Portfolio Admin - Skills",
  description:
    "This is Skills page for FolioAdmin",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Skills" />
        <TableSkills />
      </div>
    </DefaultLayout>
  );
};

export default Settings;

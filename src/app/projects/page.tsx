import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableProjects from "@/components/Tables/TableProjects";

export const metadata: Metadata = {
  title: "Portfolio Admin - Skills",
  description: "This is Skills page for FolioAdmin",
};

const Projects = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Projects" />
        <TableProjects />
      </div>
    </DefaultLayout>
  );
};

export default TableProjects;


import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableProjects from "@/components/Tables/TableProjects";
import isAuth from "../../../utils/isAuth";

export const metadata: Metadata = {
  title: "Portfolio Admin - Projects",
  description: "This is Projects page for FolioAdmin",
};

const Projects = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Skills" />
        <TableProjects />
      </div>
    </DefaultLayout>
  );
};

export default Projects;
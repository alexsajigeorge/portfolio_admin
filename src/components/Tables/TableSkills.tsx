"use client";

import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoIosArrowDown } from "react-icons/io";
import axiosInstance from "../../../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { Skills } from "@/types";
import { DownloadIcon, EyeIcon, Loader2Icon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const TableSkills = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [skillName, setSkillName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [proficencyLvl, setProficencyLvl] = useState<string>("");
  const [icon, setIcon] = useState<File | undefined>();
  const [skillNameError, setSkillNameError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [proficencyLvlError, setProficencyLvlError] = useState<boolean>(false);
  const [iconError, setIconError] = useState<boolean>(false);
  const baseUrl = "http://127.0.0.1:8000";

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/getSkills");
      setLoading(false);
      setSkills(response.data.skills);
      console.log(response.data.skills);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const handleskillName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillName(e.target.value);
    setSkillNameError(false);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionError(false);
  };

  const handleProficencyLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProficencyLvl(e.target.value);
    setProficencyLvlError(false);
  };

  const handleIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      const selectedFile = fileInput.files[0];
      setIcon(selectedFile);
      setIconError(false);
    }
  };

  const addSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("skill_name", skillName);
      formData.append("description", description);
      formData.append("proficency_lvl", proficencyLvl);
      formData.append("icon", icon!);

      const response = await axiosInstance.post("/addSkill", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        fetchSkills();
        setLoading(false);
        window.location.reload();
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong");

      if (error.response && error.response.data) {
        const errors = error.response.data.message;
        setSkillNameError(errors.skill_name);
        setDescriptionError(errors.description);
        setProficencyLvlError(errors.proficency_lvl);
        setIconError(errors.icon);
      }

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex items-center justify-between">
        <h4 className=" text-xl font-semibold text-black dark:text-white">
          Top Skills
        </h4>
        <Drawer>
          <DrawerTrigger className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5">
            <span>
              <Image
                src="/images/icons/Plus.svg"
                width={20}
                height={20}
                alt="Plus"
              />
            </span>
            Add Skill
          </DrawerTrigger>

          <DrawerContent>
            <div className=" mx-auto flex w-full flex-col overflow-y-auto rounded-t-[10px] p-4">
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <DrawerTitle className="text-black dark:text-white">
                    Add Skill
                  </DrawerTitle>
                  <DrawerClose>
                    <IoIosArrowDown />
                  </DrawerClose>
                </div>
                <DrawerDescription className="pt-5 text-black dark:text-white">
                  <form onSubmit={addSkill}>
                    <div className="mt-2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        placeholder="Skill Name"
                        onChange={handleskillName}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <p className="font-xs mt-1 text-red">{skillNameError}</p>
                    </div>
                    <div className="mt-2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Description
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Description"
                        onChange={handleDescription}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      ></textarea>
                      <p className="font-xs mt-1 text-red">
                        {descriptionError}
                      </p>
                    </div>
                    <div className="mt-2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Proficency Level
                      </label>
                      <input
                        type="text"
                        placeholder="Proficency Level"
                        onChange={handleProficencyLvl}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <p className="font-xs mt-1 text-red">
                        {proficencyLvlError}
                      </p>
                    </div>
                    <div className="mt-2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Upload Icon
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleIcon}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      />
                      <p className="font-xs mt-1 text-red">{iconError}</p>
                    </div>
                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={
                          !skillName || !description || !proficencyLvl || !icon
                        }
                        className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-primary px-4 py-3 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-60 lg:px-5 xl:px-8"
                      >
                        {loading ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </DrawerDescription>
              </DrawerHeader>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Skill
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Proficency
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Icon
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td
                  colSpan={12}
                  className="flex w-full items-center justify-center py-5 "
                >
                  <p className="w-full  text-center text-black dark:text-white">
                    <Loader2Icon className="h-5 w-5 animate-spin" />
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {skills &&
                skills.map((skill) => (
                  <tr key={skill.id}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">
                        {skill.skill_name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {skill.description}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {skill.proficency_lvl}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <Image
                        src={baseUrl + skill.icon}
                        width={50}
                        height={50}
                        alt={""}
                      />
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          <EyeIcon size={18} />
                        </button>
                        <button className="hover:text-primary">
                          <Trash2 size={18} />
                        </button>
                        <button className="hover:text-primary">
                          <DownloadIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TableSkills;

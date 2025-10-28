"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconHome,
  IconMovie,
  IconStar,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/ui/text-animate";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Image from "next/image";



export function SidebarCustom({ children }: React.PropsWithChildren) {
    const links = [
      {
        label: "Home",
        href: "/Home",
        icon: (
          <IconHome className="h-5 w-5 shrink-0 text-blue-500 dark:text-neutral-600" />
        ),
      },
      {
        label: "Dashboard",
        href: "/Dashboard",
        icon: (
          <IconBrandTabler className="h-5 w-5 shrink-0 text-blue-500 dark:text-neutral-600" />
        ),
      },
      {
        label: "Favoritos",
        href: "/Favorites",
        icon: (
          <IconStar className="h-5 w-5 shrink-0 text-blue-500 dark:text-neutral-600" />
        ),
      },
      {
        label: "Ver Mais",
        href: "/Vermais",
        icon: (
          <IconMovie className="h-5 w-5 shrink-0 text-blue-500 dark:text-neutral-600" />
        ),
      },
      {
        label: "Logout",
        href: "/",
        icon: (
          <IconArrowLeft className="h-5 w-5 shrink-0 text-red-300 dark:text-neutral-600" />
        ),
      },
    ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col rounded-md border dark:border-neutral-200 dark:bg-gray-100 md:flex-row border-neutral-700 bg-neutral-800",
      )}
    >
      <div className="md:sticky md:top-0 md:h-screen">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 h-full">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <SidebarLink
                link={{
                  label: "Bem-vindo, Usuario!",
                  href: "#",
                  icon: (
                    <Image
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full text-"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
              {open && (
                <AnimatedThemeToggler className="text-blue-500 dark:text-neutral-600 mr-4" />
              )}
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      <Dashboard children={children} />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-write"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm dark:bg-black bg-blue-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        <TextAnimate className="dark:text-black text-white text-[1.0rem] font-bold">
          dtiFlix
        </TextAnimate>
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm dark:bg-black bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
};

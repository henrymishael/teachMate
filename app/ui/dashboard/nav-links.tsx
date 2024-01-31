"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HomeIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: DocumentDuplicateIcon,
  },
  { name: "Search", href: "/dashboard/search", icon: MagnifyingGlassIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "relative group flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-primary p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ",
              {
                "bg-primary text-blue-600": pathname === link.href,
              }
            )}
          >
            {/* <div className='w-[80%] bg-black h-0.5 absolute top-4 opacity-0 group-hover:opacity-100 group-hover:top-0 duration-500 transition-all ease-in-out '></div> */}
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

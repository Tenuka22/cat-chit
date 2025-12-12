"use client";

import { Menu } from "lucide-react";
import LogoImg from "@/public/logo.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { AnimatedThemeToggler, ModeToggle } from "../ui/mode-toggle";
import { P, Span } from "../ui/typography";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface UserNavbarProps {
  preloadedUser: Preloaded<typeof api.auth.user.getCurrentUser>;
  logo: {
    url: string;
    title: string;
  };
  menu: MenuItem[];
  auth: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    primary: {
      title: string;
      url: string;
    };
  };
}

const UserNavbar = ({ preloadedUser, auth, logo, menu }: UserNavbarProps) => {
  const userData = usePreloadedQuery(preloadedUser);
  return (
    <section className="py-4 px-4 border-b">
      {/* Desktop Menu */}
      <nav className="hidden items-center justify-between lg:flex">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              src={LogoImg}
              className="max-h-8 rounded-full"
              height={32}
              width={32}
              alt="logo-img"
            />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Link>
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex gap-2">
          {userData?._id ? (
            <Button asChild>
              <Link href={auth.primary.url}>{auth.primary.title}</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
              <Button asChild>
                <Link href={auth.signup.url}>{auth.signup.title}</Link>
              </Button>
            </>
          )}
          <AnimatedThemeToggler />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              src={LogoImg}
              height={32}
              width={32}
              className="max-h-8 rounded-full"
              alt="logo-img"
            />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href={logo.url} className="flex items-center gap-2">
                    <Image
                      src={LogoImg}
                      height={48}
                      width={48}
                      className="max-h-12 rounded-full"
                      alt="logo-img"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4 size-full">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4 h-full"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <div className="flex flex-col gap-3">
                  {userData?._id ? (
                    <Button asChild>
                      <Link href={auth.primary.url}>{auth.primary.title}</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild>
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
                  )}
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div>
        <P className="flex items-center justify-start gap-2">
          {item.icon}
          {item.title}
        </P>
        {item.description && (
          <Span className="leading-snug">{item.description}</Span>
        )}
      </div>
    </Link>
  );
};

export { UserNavbar };

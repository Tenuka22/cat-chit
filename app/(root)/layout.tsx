import { UserNavbar } from "@/components/navigation/UserNavbar";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { ReactNode } from "react";
import { Book, Sunset, Trees, Zap } from "lucide-react";
import { getToken } from "@/lib/auth/server";

const ROOT_APP_LAYOUT = async ({ children }: { children: ReactNode }) => {
  const token = await getToken();
  const preloadedUser = await preloadQuery(
    api.auth.user.getCurrentUser,
    {},
    { token },
  );

  const data = {
    logo: {
      url: "/",
      title: "Cat Chit",
    },
    menu: [
      { title: "Home", url: "#" },
      {
        title: "Products",
        url: "#",
        items: [
          {
            title: "Blog",
            description: "The latest industry news, updates, and info",
            icon: <Book className="size-5 shrink-0" />,
            url: "#",
          },
          {
            title: "Company",
            description: "Our mission is to innovate and empower the world",
            icon: <Trees className="size-5 shrink-0" />,
            url: "#",
          },
          {
            title: "Careers",
            description: "Browse job listing and discover our workspace",
            icon: <Sunset className="size-5 shrink-0" />,
            url: "#",
          },
          {
            title: "Support",
            description:
              "Get in touch with our support team or visit our community forums",
            icon: <Zap className="size-5 shrink-0" />,
            url: "#",
          },
        ],
      },
      {
        title: "Resources",
        url: "#",
        items: [
          {
            title: "Help Center",
            description: "Get all the answers you need right here",
            icon: <Zap className="size-5 shrink-0" />,
            url: "#",
          },
          {
            title: "Contact Us",
            description: "We are here to help you with any questions you have",
            icon: <Sunset className="size-5 shrink-0" />,
            url: "#",
          },
          {
            title: "Status",
            description: "Check the current status of our services and APIs",
            icon: <Trees className="size-5 shrink-0" />,
            url: "#",
          },
          {
            title: "Terms of Service",
            description: "Our terms and conditions for using our services",
            icon: <Book className="size-5 shrink-0" />,
            url: "#",
          },
        ],
      },
      {
        title: "Pricing",
        url: "#",
      },
      {
        title: "Blog",
        url: "#",
      },
    ],
    auth: {
      login: { title: "Login", url: "#" },
      signup: { title: "Sign up", url: "#" },
      primary: {
        title: "Application",
        url: "/app",
      },
    },
  };
  return (
    <>
      <UserNavbar {...data} preloadedUser={preloadedUser} />

      {children}
    </>
  );
};

export default ROOT_APP_LAYOUT;

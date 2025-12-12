import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth/server";
import { fetchQuery } from "convex/nextjs";

const getUserData = async () => {
  try {
    const token = await getToken();
    const userData = await fetchQuery(api.auth.user.getUserData, {}, { token });
    return userData;
  } catch {
    return null;
  }
};

const proxy = async (request: NextRequest) => {
  const data = await getUserData();
  const user = data?.user;
  const userData = data?.userData;

  const dev = process.env.NODE_ENV === "development";
  const { pathname } = new URL(request.url);

  if (user && !dev && !userData && !pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (!user && !dev && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/auth/sign-up", request.url));
  }

  if (
    user &&
    !dev &&
    (pathname === "/auth/sign-up" || pathname === "/auth/sign-in")
  ) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  if (!user && !dev && pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/auth/sign-up", request.url));
  }

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

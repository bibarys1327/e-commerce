import logo from "@/images/logo.png";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ShoppingBasket, User } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Container from "./Container";

const Header = async () => {
  const user = await currentUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-gray-400 bg-white py-4">
      <Container className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <Link href={"/"}>
          <Image src={logo} alt="logo" priority width={80} height={60} />
        </Link>
        <Form action="/search" className="flex-1 border border-black">
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="w-full rounded-md border-2 border-gray-200 px-4 py-2.5 outline-none focus-visible:border-darkBlue"
          />
        </Form>
        <div className="flex items-center gap-5">
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={"/orders"}
                className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none"
              >
                <ShoppingBasket className="size-6 text-darkBlue" />
                <div className="flex flex-col">
                  <p className="text-xs">
                    <span className="font-semibold">0</span> items
                  </p>
                  <p className="font-semibold">Orders</p>
                </div>
              </Link>
            </SignedIn>

            {user ? (
              <div className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none">
                <UserButton />
                <div className="hidden  flex-col md:inline-flex">
                  <p className="text-xs">Welcome Back</p>
                  <p className="font-semibold">{user?.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <div className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none">
                  <User className="size-6 text-darkBlue" />
                  <div className="flex flex-col">
                    <p className="text-xs">Account</p>
                    <p className="font-semibold">Login</p>
                  </div>
                </div>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};
export default Header;

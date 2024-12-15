"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async() => {
        const response = await getProviders();
        setProviders(response)
    }
    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.png"}
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">Tron's AI</p>
      </Link>

      {/* mob */}
      <div className="sm:flex hidden flex relative">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-promt"} className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <div>
            {providers && Object.values(providers).map((provider) => (<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn"> 
            Sign In
            </button>))}
          </div>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
            <div className="flex">
                <Image src={session?.user.image} width={37} height={37} className="rounded-full cursor-pointer" alt="profile" onClick={() => setToggleDropdown((prev) => !prev)}/>
                {toggleDropdown && (<div className="dropdown">
                  <Link href={"/profile"} className="dropdown_link" onClick={() => setToggleDropdown((prev) => !prev)}>
                  My Profile
                  </Link>

                  <Link href={"/create-promt"} className="dropdown_link" onClick={() => setToggleDropdown((prev) => !prev)}>
                  Create Promt
                  </Link>
                  <button type="button" className="mt-5 w-full black_btn" onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}>
                    Sign out
                  </button>
                </div>)}
              </div>
        ) : ( <div>
            {providers && Object.values(providers).map((provider) => (<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn"> 
            Sign In
            </button>))}
          </div>)}
      </div>
    </nav>
  );
};

export default Nav;

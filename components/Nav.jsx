"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);

//   useEffect(() => {
//     const setProviders = async() => {
//         const response = await getProviders();

//         setProviders(response)
//     }
//     setProviders();
//   }, [])

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

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-promt"} className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"profile"}>
              <Image
                src={"/assets/images/logo.png"}
                width={37}
                height={37}
                className="rounded-full"
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
        {isUserLoggedIn ? (
            <div className="flex">
                <Image src={"/assets/images/logo.png"} width={37} height={37} className="rounded-full" alt="profile" onClick={() => {}}/>
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
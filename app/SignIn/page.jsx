"use client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";


const page = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const getProvidersList = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    getProvidersList();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center p-5 shadow-md border-slate-300 border-2">
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id, {callbackUrl: '/Form'})}
            className="signIn_btn"
          >
            {provider.id === 'google' && <FcGoogle className='logoIcon' />}
              {/* {provider.id === 'github' && <FaGithub className='logoIcon' />}
              {provider.id === 'facebook' && <FaFacebook className='logoIcon' />} */}
            Sign in with {provider.name}
          </button>
        ))}
    </section>
  );
};

export default page;

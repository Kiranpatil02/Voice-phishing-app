import React from "react";
import { Link,useLocation } from "react-router";
import status from "./Status";

export function Navbar(){
  const location = useLocation();
  const currentPath = location.pathname;

    const navItems=[
      {
        name:"Get Started",
        slug:"/test",
        active:!status.linkstatus && currentPath!=='/test'
      }
    ]


    return(
        <>
        <div>
        <header className=" bg-white/80 backdrop-blur-sm   sticky top-0 z-10">
        <div className="container flex h-16 items-center  justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link to="/home">
            <span className="text-xl font-semibold">DeepTruth</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 text-lg ">
            {
              navItems.map((item)=>item.active?(
                <Link to={item.slug} className="font-medium">
               {item.name}
              </Link>

              ):null)
            }
            <a href="#" className="font-medium hover:text-primary">
              How It Works
            </a>
            <a href="#" className="font-medium hover:text-primary">
              FAQ
            </a>
            <a href="#" className="font-medium hover:text-primary">
              About
            </a>
          </nav>
        </div>
      </header>
            
        </div>   
        </>
    )
}
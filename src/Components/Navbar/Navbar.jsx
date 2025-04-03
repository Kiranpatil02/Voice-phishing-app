import React from "react";

export function Navbar(){

    return(
        <>
        <div>
        <header className=" bg-white/80 backdrop-blur-sm  sticky top-0 z-10">
        <div className="container flex h-16 items-center  justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">VoiceO..</span>
          </div>
          <nav className="hidden md:flex gap-6 text-lg ">
            <a href="#" className="font-medium hover:text-primary">
              Home
            </a>
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
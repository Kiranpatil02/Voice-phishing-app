import { Heading } from "@radix-ui/themes";
import React from "react";
import SoundWaveAnimation from "../Wave_Animation/Wave";

export  function Body(){
    return(
        <>
        <div className="w-full mt-10  flex items-center  gap-4">
        <div className="w-1/2 ml-4">
        <Heading size="9" weight="medium">
        Detect Voice Deepfakes & Phishing Attempts
        </Heading>
        <div className="mt-5">
            
            <Heading size="6" weight="regular" color="gray">
            Upload or record audio to analyze for AI-generated voices and potential phishing attempts.
            </Heading>
        </div>
        </div>
        <div>
            <SoundWaveAnimation/>
        </div>
        
        </div>
        </>
    )
}
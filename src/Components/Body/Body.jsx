import { Heading } from "@radix-ui/themes";
import React from "react";
import SoundWaveAnimation from "../Wave_Animation/Wave";
import { Deepfakeinfo } from "../Deepfake/Deepfake";
import img from "../../assets/Group 1.svg";
import img2 from "../../assets/Group 3.svg";
import img4 from "../../assets/Group 5.svg";

export function Body() {
  return (
    <>
      <div className="w-full mt-20  flex p-4 items-center   ">
        <div className=" ml-4 ">
          <Heading size="9" weight="medium">
            Detect Voice Deepfakes & Phishing Attempts
          </Heading>
          <div className="mt-5">
            <Heading size="6" weight="regular" color="gray">
              Upload or record audio to analyze for AI-generated voices and
              potential phishing attempts.
            </Heading>
          </div>
        </div>
        <div className="">
          <SoundWaveAnimation />
        </div>
      </div>
      <div className="">
          <Deepfakeinfo
            title="Authenticity Check for Voice calls"
            description="Detect synthetic or morphed voices with advanced spectrogram-based deep learning analysis."
            category="Deep Learning"
            imagesrc={img}
          />
          <Deepfakeinfo
            title="Analyze Conversations for Phishing Risks"
            description="We process recorded audio with LLMs to extract insights, detect suspicious intent, and flag potential phishing conversations."
            category="Large Language Models"
            imagesrc={img2}
            size={300}
            
          />
          <Deepfakeinfo
            title="Analyze Conversations for Phishing Risks"
            description="We process recorded audio with LLMs to extract insights, detect suspicious intent, and flag potential phishing conversations."
            category="Large Language Models"
            imagesrc={img4}
          />
          {/* <Facts/> */}
          {/* <AudioProcessingFlow/> */}
        </div>
    </>
  );
}

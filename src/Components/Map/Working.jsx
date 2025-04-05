import React from 'react';

// Optional: Define a reusable Node component for clarity
const FlowNode = ({ children, bgColor = 'bg-white', textColor = 'text-black', className = '' }) => (
  <div
    className={`flex items-center justify-center px-4 py-2 rounded-full shadow-md w-fit min-w-[120px] ${bgColor} ${textColor} ${className}`}
  >
    {children}
  </div>
);

export function AudioProcessingFlow() {
  return (
    // Main container - centers the flowchart and provides padding
    <div className="flex justify-center items-center p-8 min-h-screen bg-gradient-to-br from-sky-200 to-cyan-400">
      {/* Using flex-col for the main vertical flow */}
      <div className="relative flex flex-col items-center space-y-4 text-sm font-semibold">

        {/* 1. USER Node */}
        <FlowNode bgColor="bg-black" textColor="text-white">
          USER
        </FlowNode>

        {/* Vertical Connector */}
        <div className="h-8 w-px bg-gray-600"></div>

        {/* 2. RECORDED AUDIO Node */}
        <FlowNode>
          {/* IconPlaceholder: Folder Icon */}
          <span className="mr-2">📁</span> {/* Replace with your icon */}
          RECORDED AUDIO
        </FlowNode>

        {/* Connectors around RECORDED AUDIO (Simplified Representation) */}
        {/* These curved lines are hard without SVG. We'll use vertical connectors */}
        <div className="flex w-full justify-center items-center h-16"> {/* Container for parallel section */}
            {/* Left vertical connector down */}
            <div className="h-full w-px bg-gray-600 -translate-x-20"></div>
            {/* Right vertical connector down */}
            <div className="h-full w-px bg-gray-600 translate-x-20"></div>

            {/* Central Connector Down */}
            <div className="absolute top-[calc(50%+3rem)] h-8 w-px bg-gray-600"></div> {/* Adjust positioning as needed */}
        </div>


        {/* 3. DL Models & LLM Nodes (Parallel) */}
        <div className="flex justify-center space-x-8 relative -mt-8 z-10"> {/* Adjust spacing & margin */}
          <FlowNode>
            {/* IconPlaceholder: DL Model Icon */}
            <span className="mr-2">🕸️</span> {/* Replace with your icon */}
            DL Models
          </FlowNode>
          <FlowNode>
            {/* IconPlaceholder: LLM Icon */}
            <span className="mr-2">⚛️</span> {/* Replace with your icon */}
            LLM
          </FlowNode>
          {/* Implicit upward curves are visually implied by layout */}
          {/* Lower connecting curve approximation */}
           <div className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 h-4 w-16 border-b border-l border-r border-gray-600 rounded-b-lg"></div> {/* Simple arc shape */}
        </div>


        {/* Vertical Connector Down */}
        <div className="h-12 w-px bg-gray-600 mt-4"></div> {/* Increased margin-top */}


        {/* 4. Output Nodes (Branched) */}
        <div className="flex justify-center space-x-16"> {/* Container for the two columns */}

          {/* Left Column */}
          <div className="flex flex-col items-center space-y-4 relative">
             {/* Connector Branch Left */}
             <div className="absolute -top-4 left-1/2 transform -translate-x-full h-px w-8 bg-gray-600"></div>

            <FlowNode bgColor="bg-black" textColor="text-white">
              Probability Score
            </FlowNode>
            <FlowNode bgColor="bg-black" textColor="text-white">
              Summary of Calls
            </FlowNode>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center space-y-4 relative">
            {/* Connector Branch Right */}
            <div className="absolute -top-4 right-1/2 transform translate-x-full h-px w-8 bg-gray-600"></div>

            <FlowNode bgColor="bg-black" textColor="text-white">
              Way of Attack
            </FlowNode>
            <FlowNode bgColor="bg-black" textColor="text-white">
              Social Engineering
            </FlowNode>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AudioProcessingFlow;
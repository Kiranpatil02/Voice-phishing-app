import React, { useState } from "react";


export function LLM(){

    const [isPlaying, setIsPlaying] = useState(true);
    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
      };

      const conversation = [
        {
          id: 1,
          speaker: "SPEAKER 1",
          message: "This is a serious call, so please do take me seriously then, all right?",
          color: "blue"
        },
        {
          id: 2,
          speaker: "SPEAKER 2",
          message: "Right.",
          color: "orange"
        },
        {
          id: 1,
          speaker: "SPEAKER 1",
          message: "This is a serious call, so please do take me seriously then, all right?",
          color: "blue"
        },
        {
          id: 2,
          speaker: "SPEAKER 2",
          message: "Right.",
          color: "orange"
        },
    ]  
    return(
        <>
<div className="max-w-2xl mx-auto  rounded-xl h-46 border overflow-auto">
      <div className="p-4 flex flex-col space-y-6">
        {conversation.map((item) => (
          <div key={item.id} className="flex items-start">
            {/* Speaker avatar */}
            <div className="mr-4">
              <div className={`w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-300 to-blue-500' : 'from-yellow-200 to-orange-400'}`}>
                <div className="h-full w-full flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full ${item.color === 'blue' ? 'bg-blue-200' : 'bg-orange-200'}`}></div>
                </div>
              </div>
            </div>
            
            {/* Speaker message */}
            <div className="flex-1">
              <div className="font-bold text-sm text-gray-800">{item.speaker}</div>
              <div className="text-gray-600">{item.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
    )
}
import { useState, useEffect } from 'react';

export function Results({ result = "Pending", confidence = 0 }){
    
const [animatedConfidence, setAnimatedConfidence] = useState(0);
  
  useEffect(() => {
    // Reset animation when props change
    setAnimatedConfidence(0);
    
    const duration = 1500; // Animation duration in ms
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedConfidence(progress * confidence);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [confidence]);
  
  const percentValue = (animatedConfidence * 100).toFixed(2);
  
  // Determine color based on result and confidence
  const getResultColor = () => {
    if (result === "Real" && confidence > 0.8) return "text-green-600";
    if (result === "Fake" && confidence > 0.8) return "text-red-600";
    return "text-yellow-600"; // For uncertain results
  };
  
  const getBarColor = () => {
    if (result === "Real" && confidence > 0.8) return "bg-green-600";
    if (result === "Fake" && confidence > 0.8) return "bg-red-600";
    return "bg-yellow-500"; // For uncertain results
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">AI Classification</div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Result:</span>
            <span className={`text-2xl font-bold ${getResultColor()}`}>{result}</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Confidence:</span>
              <span className="text-lg font-semibold">{percentValue}%</span>
            </div>
            
            <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`${getBarColor()} h-4 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${percentValue}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
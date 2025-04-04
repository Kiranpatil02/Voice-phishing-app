import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'C:/Users/Kiran Patil/Desktop/Computer Security/endsem/src/animation.css'; // We'll create this CSS file next

function SoundWaveAnimation() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const timeRef = useRef(0);
  const colorOffsetRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [amplitude, setAmplitude] = useState(100);
  const [frequency, setFrequency] = useState(7); // Corresponds to original 0.2
  const [particleCount, setParticleCount] = useState(70);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  }, []);

  // Function to create particles
  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const count = particleCount;
    const newParticles = [];
    const canvasHeight = canvas.height; // Use cached height

    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: canvasHeight / 2,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: 0, // Kept for potential future use, but not used in wave calc
        hue: Math.floor(Math.random() * 60) + 170, // Blue-ish colors
        originalY: canvasHeight / 2
      });
    }
    particlesRef.current = newParticles;
     // Force a redraw if needed after particle creation when paused
     if (!isPlaying) {
        drawFrame();
     }
  }, [particleCount, isPlaying]); // Add isPlaying dependency

  // Function to update particle positions
  const updateParticles = useCallback(() => {
    const particles = particlesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentAmplitude = amplitude;
    const currentFrequency = frequency / 10; // Adjust slider value
    const currentTime = timeRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position based on its own speed
      p.x += p.speedX;

      // Calculate wave effect based on sine wave
      // Use p.x for position along the wave, currentTime for animation progress
      const waveHeight = Math.sin(currentTime * currentFrequency + p.x * 0.01) * currentAmplitude;
      p.y = p.originalY + waveHeight;

      // Wrap around screen edges horizontally
      if (p.x < 0) p.x = canvasWidth;
      if (p.x > canvasWidth) p.x = 0;

      // Ensure originalY is correct if canvas resizes (handled in resize effect)
      p.originalY = canvasHeight / 2;
    }

    timeRef.current += 0.05;
    colorOffsetRef.current = (colorOffsetRef.current + 0.5) % 360;
  }, [amplitude, frequency]);

  // Function to draw a single frame
  const drawFrame = useCallback(() => {
    const ctx = getCanvasContext();
    const particles = particlesRef.current; // Use the ref's current value
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- MODIFICATION START ---
    // Draw connecting lines first (using original array order)
    if (particles.length > 0) { // Check if particles exist
        ctx.beginPath();
        // Move to the first particle
        ctx.moveTo(particles[0].x, particles[0].y);

        // Loop through the rest of the particles and connect them
        for (let i = 1; i < particles.length; i++) {
            const p = particles[i];
            ctx.lineTo(p.x, p.y); // Connect directly, no sorting, no wrap check
        }

        // Optional: Connect the last particle back to the first for a closed loop?
        // If you want this (the original didn't seem to), uncomment the next line:
        // ctx.lineTo(particles[0].x, particles[0].y);

        ctx.strokeStyle = `hsla(${180 + colorOffsetRef.current}, 100%, 50%, 0.2)`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    // --- MODIFICATION END ---


    // Then draw particles (this part remains the same)
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const displacementRatio = Math.abs(p.y - p.originalY) / amplitude;
        const lightness = 50 + displacementRatio * 30;
        const alpha = 0.6 + displacementRatio * 0.4;
        ctx.fillStyle = `hsla(${p.hue}, 100%, ${lightness}%, ${alpha})`;
        ctx.fill();
    }

    // Draw main center line (this part remains the same)
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = 'rgba(237, 218, 5, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

}, [getCanvasContext, amplitude]); // Keep amplitude dependency


  // Animation loop
  const animate = useCallback(() => {
    if (isPlaying) {
      updateParticles();
      drawFrame();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, updateParticles, drawFrame]); // Dependencies for the loop function itself

  // Effect for starting/stopping animation loop
  useEffect(() => {
    if (isPlaying) {
      // Ensure previous frame is cancelled before starting a new one
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = requestAnimationFrame(animate);
    } else {
      // Cancel the loop if paused
      cancelAnimationFrame(animationFrameIdRef.current);
      // Optionally draw one static frame when paused
      drawFrame();
    }

    // Cleanup function to cancel animation frame when component unmounts or isPlaying changes
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [isPlaying, animate, drawFrame]); // Need drawFrame here for the static draw on pause

  // Effect for initializing and handling resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext(); // Get context here once

    const setupCanvas = () => {
        if (!canvas || !ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Reset originalY for all particles on resize
        particlesRef.current.forEach(p => p.originalY = canvas.height / 2);
        // Recreate particles if count changed, or just redraw otherwise
        if (particlesRef.current.length !== particleCount) {
             createParticles();
        } else {
            drawFrame(); // Draw immediately after resize
        }
    };

    setupCanvas(); // Initial setup

    window.addEventListener('resize', setupCanvas);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', setupCanvas);
      cancelAnimationFrame(animationFrameIdRef.current); // Ensure cleanup on unmount
    };
    // Run only on mount and when createParticles/drawFrame function references change (which they shouldn't if memoized correctly)
    // Add particleCount here to trigger setup if count changes while paused/resized.
  }, [getCanvasContext, createParticles, drawFrame, particleCount]);

  // Effect for recreating particles when count changes
  useEffect(() => {
    createParticles();
  }, [particleCount, createParticles]); // Dependency on createParticles ensures it uses the latest canvas size info



  return (
    <div className="animation-container"> {/* Added a container */}
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
}

export default SoundWaveAnimation;
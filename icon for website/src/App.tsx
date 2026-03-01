import React, { Component } from 'react';
import { TaskableIcon } from './components/TaskableIcon';
export function App() {
  return (
    <main className="min-h-screen w-full bg-[#F8F6F3] flex flex-col items-center justify-center p-6 overflow-hidden font-['Nunito',sans-serif]">
      <div className="flex flex-col items-center max-w-md w-full animate-spring-in">
        {/* Icon Container */}
        <div className="w-full max-w-[320px] md:max-w-[400px] aspect-square mb-10 relative">
          {/* Ambient glow behind the icon */}
          <div className="absolute inset-0 bg-[#2EC4B6]/20 blur-[60px] rounded-full transform scale-90 translate-y-8" />

          {/* The SVG Icon Component */}
          <TaskableIcon className="w-full h-full relative z-10 drop-shadow-2xl transition-transform duration-500 hover:scale-105 hover:-translate-y-2" />
        </div>

        {/* Typography */}
        <div className="text-center space-y-2 md:space-y-3">
          <h1
            className="text-5xl md:text-6xl text-[#1A9E8F] m-0 tracking-tight drop-shadow-sm"
            style={{
              fontFamily: "'Fredoka One', cursive"
            }}>

            Taskable
          </h1>
          <p className="text-lg md:text-xl text-[#178578]/70 font-semibold tracking-wide">
            Learn. Play. Grow.
          </p>
        </div>
      </div>
    </main>);

}
import { useEffect, useRef } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

export const AuthLayout = ({ children, title, subtitle }) => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    // Only initialize if it hasn't been initialized and the ref is available
    if (!vantaEffectRef.current && vantaRef.current) {
      try {
        vantaEffectRef.current = CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          skyColor: 0x68b8d7,
          cloudColor: 0xadc1de,
          cloudShadowColor: 0x183550,
          sunColor: 0xff9919,
          sunGlareColor: 0xff6633,
          sunlightColor: 0xff9933,
          speed: 1.0,
        });
      } catch (error) {
        console.error("Failed to initialize Vanta effect:", error);
      }
    }

    // Explicit cleanup to destroy the WebGL instance
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []); // Run once on mount

  return (
    <div
      ref={vantaRef}
      className="flex-1 w-full flex items-center justify-center p-4 hide-scrollbar relative"
    >
      {/* Content Container with Glassmorphism */}
      <div className="w-full max-w-md relative z-10 my-4">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-2xl overflow-hidden p-6 md:p-8 transition-all duration-300 hover:shadow-3xl hover:bg-white/75">
          {(title || subtitle) && (
            <div className="text-center mb-4 space-y-1">
              {title && (
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-slate-600 font-medium">{subtitle}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

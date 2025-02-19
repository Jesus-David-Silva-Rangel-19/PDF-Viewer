
import { Heart, Rocket } from "lucide-react";

export const Attribution = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-zinc-600 flex items-center gap-1.5 animate-fade-in">
      Desarrollado con{" "}
      <Heart className="h-4 w-4 text-red-500 animate-pulse" />{" "}
      por Jesús David Silva Rangel{" "}
      <Rocket className="h-4 w-4 text-zinc-600" />
    </div>
  );
};

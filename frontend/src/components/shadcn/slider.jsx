import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "lib/utils";

const Slider = React.forwardRef(({ range, className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-100">
      <SliderPrimitive.Range className="absolute h-full bg-teal-700" />
    </SliderPrimitive.Track>
    {range && (
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-teal-700 bg-white ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    )}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-teal-700 bg-white ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

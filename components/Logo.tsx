import clsx from "clsx";
import Image from "next/image";

import { site } from "@/lib/site";
import spriteNookInc from "@/public/images/sprites/Nook_Inc.svg";

export default function Logo({ size }: { size?: "md" }) {
  return (
    <div className="flex items-center justify-center gap-x-[5px]">
      <div
        className={clsx(
          "overflow-hidden rounded-full bg-alabaster",
          size === "md" ? "h-8.5 w-8.5" : "h-7.5 w-7.5",
        )}
      >
        <Image src={spriteNookInc} alt="" draggable={false} />
      </div>
      <h1
        className={clsx(
          "font-black leading-none tracking-tight text-old-burgundy",
          size === "md" ? "text-[29.8px]" : "text-[25px]",
        )}
      >
        {site.title}
      </h1>
    </div>
  );
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { DetailHeaderProps } from "@/types/pokemon";

export function DetailHeader({ name, number }: DetailHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 pt-12 pb-4 text-white z-10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-white hover:bg-white/20 rounded-full"
        >
          <Link href="/">
            <ArrowLeft size={30} />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold capitalize">{name}</h1>
      </div>
      <span className="font-bold text-lg">#{number}</span>
    </header>
  );
}

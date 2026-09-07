"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DirectionProvider } from "@/components/ui/direction";
export default function Preview() {
  const [rtl, setRtl] = useState(false);
  return (
    <DirectionProvider direction={rtl ? "rtl" : "ltr"}>
      <div dir={rtl ? "rtl" : "ltr"} className="grid w-full gap-4">
        <p>{rtl ? "مرحبا بك في كرافتر" : "Welcome to Crafter"}</p>
        <Button variant="outline" onClick={() => setRtl(!rtl)}>
          Switch to {rtl ? "LTR" : "RTL"}
        </Button>
      </div>
    </DirectionProvider>
  );
}

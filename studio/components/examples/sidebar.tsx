"use client";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
export default function Preview() {
  const [active, setActive] = useState("Projects");
  return (
    <SidebarProvider className="min-h-0 border">
      <Sidebar collapsible="none" className="w-40">
        <SidebarHeader>Crafter</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {["Projects", "Members", "Settings"].map((n) => (
                <SidebarMenuItem key={n}>
                  <SidebarMenuButton
                    isActive={active === n}
                    onClick={() => setActive(n)}
                  >
                    {n}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="p-5 text-sm">
        {active}
        <p className="mt-2 text-muted-foreground">Your workspace overview.</p>
      </div>
    </SidebarProvider>
  );
}

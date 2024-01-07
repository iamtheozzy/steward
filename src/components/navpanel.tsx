"use client";

import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { cn } from "~/lib/utils";

interface NavProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}

export const NavPanel = ({ children, defaultLayout = [20, 80], defaultCollapsed }: NavProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
      }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsible={true}
        minSize={10}
        maxSize={30}
        onCollapse={() => {
          setIsCollapsed(!isCollapsed);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(!isCollapsed)}`;
        }}
        className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
      >
        <nav className="flex h-screen flex-col bg-gray-800 p-4 text-white">
          <h1 className="text-3xl font-bold md:text-5xl">steward.</h1>
          <div className="flex flex-col p-4">
            <LayoutDashboard />
          </div>
          <UserButton />
        </nav>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

"use client";

import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { TooltipProvider } from "./ui/tooltip";
import { cn } from "~/lib/utils";
import { Nav } from "./nav";

interface NavProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

export const NavPanel = ({ children, defaultLayout = [20, 80], defaultCollapsed, navCollapsedSize }: NavProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsible={true}
          minSize={5}
          maxSize={30}
          collapsedSize={navCollapsedSize}
          onCollapse={() => {
            setIsCollapsed(() => !isCollapsed);
            console.log('isCollapsed', isCollapsed)
            console.log('on collapse fired')
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(!isCollapsed)}`;
          }}
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

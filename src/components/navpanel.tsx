"use client";

import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarClock,
  PiggyBank,
  DollarSign,
  MessageSquare,
} from "lucide-react";
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

export const NavPanel = ({
  children,
  defaultLayout = [17, 80],
  defaultCollapsed,
  navCollapsedSize,
}: NavProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsible={true}
          minSize={10}
          maxSize={20}
          collapsedSize={navCollapsedSize}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
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
              {
                title: "Weekly Plan",
                icon: CalendarDays,
                variant: "ghost",
              },
              {
                title: "Annual Budget",
                icon: CalendarClock,
                variant: "ghost",
              },
              {
                title: "Budgeted Savings",
                icon: PiggyBank,
                variant: "ghost",
              },
              {
                title: "Transactions",
                icon: DollarSign,
                variant: "ghost",
              },
              {
                title: "Message",
                icon: MessageSquare,
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

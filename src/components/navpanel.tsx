"use client";

import * as React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarClock,
  PiggyBank,
  DollarSign,
  MessageSquare,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { TooltipProvider } from "./ui/tooltip";
import { cn } from '~/utils/cn';
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
  defaultCollapsed = true,
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
                route: "/",
              },
              {
                title: "Weekly Plan",
                icon: CalendarDays,
                variant: "ghost",
                route: "/weekly-plan",
              },
              {
                title: "Annual Budget",
                icon: CalendarClock,
                variant: "ghost",
                route: "/annual-budget",
              },
              {
                title: "Budgeted Savings",
                icon: PiggyBank,
                variant: "ghost",
                route: "/budgeted-savings",
              },
              {
                title: "Transactions",
                icon: DollarSign,
                variant: "ghost",
                route: "/transactions",
              },
              {
                title: "Conversations",
                icon: MessageSquare,
                variant: "ghost",
                route: "/conversations",
              },
            ]}
            supportLinks={[
              {
                title: "Support",
                icon: LifeBuoy,
                variant: "ghost",
                route: "/help",
              },
              {
                title: "Settings",
                icon: Settings,
                variant: "ghost",
                route: "/settings",
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

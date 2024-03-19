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
  WalletCards,
  Users,
} from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { TooltipProvider } from "./ui/tooltip";
import { cn } from "~/utils/cn";
import { Nav } from "./nav";

interface NavProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

export const NavPanel = React.memo(function NavPanel({
  children,
  defaultLayout = [17, 80],
  defaultCollapsed = true,
  navCollapsedSize,
}: NavProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  // Memoizing links and supportedLinks
  const links = React.useMemo(
    () => [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        variant: "ghost" as const,
        route: "/dashboard",
      },
      {
        title: "Weekly Plan",
        icon: CalendarDays,
        variant: "ghost" as const,
        route: "/weekly-plan",
      },
      {
        title: "Annual Budget",
        icon: CalendarClock,
        variant: "ghost" as const,
        route: "/annual-budget",
      },
      {
        title: "Budgeted Savings",
        icon: PiggyBank,
        variant: "ghost" as const,
        route: "/budgeted-savings",
      },
      { title: "Accounts", icon: WalletCards, variant: "ghost" as const, route: "/accounts" },
      {
        title: "Transactions",
        icon: DollarSign,
        variant: "ghost" as const,
        route: "/transactions",
      },
      {
        title: "Conversations",
        icon: MessageSquare,
        variant: "ghost" as const,
        route: "/conversations",
      },
      { title: "Finance Team", icon: Users, variant: "ghost" as const, route: "/finance-team" },
    ],
    [],
  );

  const supportLinks = React.useMemo(
    () => [
      { title: "Support", icon: LifeBuoy, variant: "ghost" as const, route: "/help" },
      { title: "Settings", icon: Settings, variant: "ghost" as const, route: "/settings" },
    ],
    [],
  );

  return (
    <TooltipProvider delayDuration={0}>
      {/* Panel Group Left/Right */}
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={React.useCallback((sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        }, [])}
        className="h-full items-stretch"
      >
        {/* Left Panel  */}
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsible={true}
          minSize={10}
          maxSize={17}
          collapsedSize={navCollapsedSize}
          onCollapse={React.useCallback(() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }, [])}
          onExpand={React.useCallback(() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }, [])}
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >
          <Nav isCollapsed={isCollapsed} links={links} supportLinks={supportLinks} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Right Panel aka Main Content */}
        <ResizablePanel defaultSize={defaultLayout[1]} style={{ overflow: "auto" }}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
});

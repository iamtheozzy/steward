import { NavPanel } from "~/components/navpanel";

import { cookies } from "next/headers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  type LayoutParse = number[] | undefined;

  const defaultLayout = layout ? (JSON.parse(layout.value) as LayoutParse) : undefined;
  const defaultCollapsed: boolean = collapsed ? (JSON.parse(collapsed.value) as boolean) : false;

  return (
    <div className="flex h-screen bg-gray-800">
      <NavPanel
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={5}
      >
        {children}
      </NavPanel>
    </div>
  );
}

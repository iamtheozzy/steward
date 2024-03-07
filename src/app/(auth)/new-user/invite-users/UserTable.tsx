"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { MoveRight } from "lucide-react";

export function UserTable() {
  const { data } = api.invitation.listPendingInvitations.useQuery();
  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Invitee</TableHead>
            <TableHead className="text-right text-white">User permissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>{invitation.email}</TableCell>
              <TableCell className="text-right">{invitation.role.name.toLowerCase()}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-right">
        <Button variant="secondary">
          <Link href="dashboard">
            Dashboard
            <MoveRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}

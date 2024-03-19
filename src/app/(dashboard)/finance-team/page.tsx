"use client";

import { Loader2, User2, UserRoundPlus } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import dayjs from "dayjs";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { userRoles } from "~/userRoles";
import { useState } from "react";

const addMemberFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  userRoles: z.enum([userRoles.COLLABORATOR, userRoles.VIEWER], {
    errorMap: (_issue, _ctx) => ({ message: "Must select Collaborator or Viewer role" }),
  }),
});

export default function FinanceTeamPage() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [deletingInvitationId, setDeletingInvitationId] = useState<null | string>(null);
  const trpcUtils = api.useUtils();
  const { data: users } = api.financeTeam.getFinanceTeamMembers.useQuery();
  const { data: pendingInvitations } = api.invitation.listPendingInvitations.useQuery();
  const { mutate: deleteInvitation } = api.invitation.deleteInvitation.useMutation({
    onSuccess: () => {
      void trpcUtils.invitation.listPendingInvitations.invalidate();
      setDeletingInvitationId(null);
    },
    onError: (error) => {
      console.error(error);
      setDeletingInvitationId(null);
    },
  });
  const { mutate: addMember, isLoading: isSubmitting } =
    api.financeTeam.addFinanceTeamMember.useMutation({
      onSuccess: () => {
        addUserForm.reset();
        setDialogIsOpen(false);
        void trpcUtils.invitation.listPendingInvitations.invalidate();
      },
      onError: (error) => {
        console.error(error);
        if (error.message.includes("email")) {
          addUserForm.setError("email", { message: error.message });
        } else if (error.message.includes("role")) {
          addUserForm.setError("userRoles", { message: error.message });
        } else {
          // just throw a regular error
          console.error(error);
        }
      },
    });

  const addUserForm = useForm<z.infer<typeof addMemberFormSchema>>({
    resolver: zodResolver(addMemberFormSchema),
    defaultValues: {
      email: "",
      userRoles: undefined,
    },
  });

  const newUserEmail = addUserForm.watch("email");

  function onSubmit(values: z.infer<typeof addMemberFormSchema>) {
    addMember({
      email: values.email,
      userRole: values.userRoles,
    });
  }

  function handleDeleteInvitation({ invitationId }: { invitationId: string }) {
    setDeletingInvitationId(invitationId);
    deleteInvitation({ invitationId });
  }

  return (
    <main className="min-h-screen rounded-l-2xl bg-background-alt px-10 ">
      <div className="py-10">
        <h2 className="mb-4 text-3xl font-bold text-foreground">Finance Team</h2>
        <Separator />
      </div>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Cardenas Finance Team</CardTitle>
            <CardDescription>
              A team trying to get out of debt and save money and stuff.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-rows-1">
              {users?.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-2 border-b border-solid border-border py-4"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Avatar>
                      <AvatarImage src={user.imageUrl!} alt={user.firstName!} />
                    </Avatar>
                    <Badge variant="secondary">{user.roles[0]?.role.name.toLowerCase()}</Badge>
                  </div>
                  <div className="flex flex-col">
                    <p>{user.firstName}</p>
                    <p>{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ul role="list" className="divide-y divide-border">
              {pendingInvitations?.map((invitation) => {
                const isDeleting = deletingInvitationId === invitation.id;
                const inviteDate = dayjs(invitation.createdAt).format("MM/DD/YYYY");
                return (
                  <li key={invitation.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            <User2 className="text-slate-500" />
                          </AvatarFallback>
                        </Avatar>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <div>
                        <p>{invitation.email}</p>
                        <p>Invitation sent on {inviteDate}</p>
                        <p>Role: {invitation.role.name.toLowerCase()}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      disabled={isDeleting}
                      onClick={() => handleDeleteInvitation({ invitationId: invitation.id })}
                    >
                      {isDeleting ? <Loader2 className="animate-spin" /> : "Remove Invite"}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </CardContent>
          <CardFooter className="justify-end">
            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  Add Member <UserRoundPlus className="ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <Form {...addUserForm}>
                  <form onSubmit={addUserForm.handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Add Member</DialogTitle>
                      <DialogDescription>Add a new member to the finance team.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <FormField
                        control={addUserForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="email" className="text-right">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="example@example.com"
                                className="col-span-3"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addUserForm.control}
                        name="userRoles"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-right">Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a user role" />
                                </SelectTrigger>
                              </FormControl>
                              <FormMessage />
                              <SelectContent>
                                <SelectItem value={userRoles.COLLABORATOR}>
                                  {userRoles.COLLABORATOR.toLowerCase()}
                                </SelectItem>
                                <SelectItem value={userRoles.VIEWER}>
                                  {userRoles.VIEWER.toLowerCase()}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        disabled={
                          !newUserEmail || addUserForm.formState.isSubmitting || isSubmitting
                        }
                      >
                        {isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Send Invite"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { UserTable } from "./UserTable";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.string(),
});

export default function InviteUsers() {
  const [cooldown, setCooldown] = useState(false);
  const { data: user } = api.user.getCurrentUser.useQuery({ includeFinanceTeams: true });
  const { data: role } = api.role.getRoleByName.useQuery({ name: "COLLABORATOR" });
  const { mutate: createInvite } = api.invitation.createInvitation.useMutation({
    onSuccess: () => {
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      form.setError("email", { message: error.message });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const emailFormSpy = form.watch("email");

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.financeTeams[0]) return;

    if (user && role) {
      createInvite({
        email: values.email,
        senderId: user.id,
        roleId: role.id,
        financeTeamId: user.financeTeams[0].id,
      });
    }
  }

  useEffect(() => {
    if (form.formState.isSubmitting) {
      setCooldown(true);
    } else if (!form.formState.isSubmitting && cooldown) {
      // Set a timeout to disable cooldown after a delay
      const timer = setTimeout(() => setCooldown(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [form.formState.isSubmitting, cooldown]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-12">
      <div className="flex w-[40rem] flex-col items-center space-y-2 text-white">
        <div className="text-4xl font-bold">Budgeting can be lonely!</div>
        <div className="text-2xl font-semibold">
          Who&apos;s going to help you <span className="font-bold underline">Steward.</span> your
          money?
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[40rem] space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email" className="text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" className="w-full" {...field} />
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button
              type="submit"
              variant="outline"
              disabled={form.formState.isSubmitting || !emailFormSpy}
            >
              {(form.formState.isSubmitting || cooldown) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {form.formState.isSubmitting || cooldown ? "Sending..." : "Send Invite"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-[40rem] text-white">
        <UserTable />
      </div>
    </div>
  );
}

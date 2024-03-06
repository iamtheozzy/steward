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
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";

const formSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters").max(50),
});

export default function FinanceTeam() {
  const { isSignedIn, user } = useUser();
  const { mutate: CreateFinanceTeam } = api.financeTeam.createFinanceTeam.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
    },
  });

  const teamName = form.watch("teamName");

  function onSubmit(values: z.infer<typeof formSchema>) {
    CreateFinanceTeam(
      {
        name: values.teamName,
      },
      {
        onSuccess: (data) => {
          console.log("Success!!! ", data);
        },
        onError: (error) => {
          console.error("Error creating finance team", error);
        },
      },
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-8 text-3xl font-semibold text-white">Give your finance team a name</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-6">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Team name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={isSignedIn ? `${user.lastName} Team` : "Team Name"}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white"></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button
              variant="outline"
              type="submit"
              disabled={form.formState.isSubmitting || !teamName}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

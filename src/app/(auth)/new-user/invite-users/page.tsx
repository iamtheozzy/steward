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
  email: z.string().email("Invalid email address"),
});

export default function InviteUsers() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailInputSpy = form.watch("email");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-12">
      <div className="flex flex-col items-center space-y-2 text-white">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button
              type="submit"
              variant="outline"
              disabled={form.formState.isSubmitting || !emailInputSpy}
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

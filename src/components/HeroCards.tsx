import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { currentUser } from "@clerk/nextjs";

export const HeroCards = async () => {
  const user = await currentUser();
  const isLoggedIn = user !== null;

  return (
    <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
      {/* Testimonial */}
      <Card className="absolute -top-[15px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?img=30" alt="user avatar" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Skylar Palisades</CardTitle>
            <CardDescription>@skylar_palisades</CardDescription>
          </div>
        </CardHeader>

        <CardContent>With Steward, my partner and I no longer argue about money!</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="mt-8 flex items-center justify-center pb-2">
          <img
            src="https://i.pravatar.cc/150?img=60"
            alt="user avatar"
            className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]"
          />
          <CardTitle className="text-center">Ambrose Downs</CardTitle>
          <CardDescription className="font-normal text-primary">Graphic Designer</CardDescription>
        </CardHeader>

        <CardContent className="pb-2 text-center">
          <p>Thanks to Steward, budgeting as a couple has never been simpler.</p>
        </CardContent>

        <CardFooter>
          <div>
            {/* <a
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GithubIcon className="w-5 h-5" />
            </a> */}
            <a
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-foreground"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute -right-[10px] bottom-[35px] w-[350px]  shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="mt-1 rounded-2xl bg-primary/20 p-1">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & Dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Providing optimal viewing comfort whether it&apos;s during late nights or in early
              mornings.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Pricing */}
      {!isLoggedIn ? (
        <Card className="absolute left-[50px] top-[150px] w-72  shadow-black/10 drop-shadow-xl dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="item-center flex justify-between">
              Free
              <Badge variant="secondary" className="text-sm text-primary">
                Most popular
              </Badge>
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground"> /month</span>
            </div>

            <CardDescription>
              Unlock essential budgeting features with our free tier plan, perfect for individuals
              and couples.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full">Start Free Trial</Button>
          </CardContent>

          <hr className="m-auto mb-4 w-4/5" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {["Expense Tracking", "Budget Creation", "Goal Setting"].map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" /> <h3 className="ml-2">{benefit}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div>
          {/* Testimonial */}
          <Card className="absolute -top-[15px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage alt="" src="" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <CardTitle className="text-lg">Jason Palisades</CardTitle>
                <CardDescription>@jason_palisades</CardDescription>
              </div>
            </CardHeader>

            <CardContent>With Steward, my partner and I no longer argue about money</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

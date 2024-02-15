import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Check, Divide, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GithubIcon } from "lucide-react";
import { currentUser } from "@clerk/nextjs";

export const HeroCards = async () => {
  const user = await currentUser();
  const isLoggedIn = user !== null;

  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              src="https://i.pravatar.cc/150?img=30"
              alt="user avatar"
            />
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
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="https://i.pravatar.cc/150?img=60"
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Ambrose Downs</CardTitle>
          <CardDescription className="font-normal text-primary">
            Graphic Designer
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
          Thanks to Steward, budgeting as a couple has never been simpler.
          </p>
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
                className="fill-foreground w-5 h-5"
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
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & Dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
            Providing optimal viewing comfort whether it&apos;s during late nights or in early mornings.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Pricing */}
      {!isLoggedIn ? (
        <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              Free
              <Badge
                variant="secondary"
                className="text-sm text-primary"
              >
                Most popular
              </Badge>
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground"> /month</span>
            </div>

            <CardDescription>
            Unlock essential budgeting features with our free tier plan, perfect for individuals and couples.</CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full">Start Free Trial</Button>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {["Expense Tracking", "Budget Creation", "Goal Setting"].map(
                (benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                )
              )}
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div>
          {/* Testimonial */}
          <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage
                  alt=""
                  src=""
                />
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

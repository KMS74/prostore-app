import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

type Props = {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
};

const SignUpPage = async ({ searchParams }: Props) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
          <div className="text-center">
            <CardTitle className="text-2xl mb-2">Create Account</CardTitle>
            <CardDescription>
              Enter your information below to sign up
            </CardDescription>
          </div>

          <CardContent>
            <SignUpForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignUpPage;

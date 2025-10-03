import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Sign In",
};

type Props = {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
};

const SignInPage = async ({ searchParams }: Props) => {
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
            <CardTitle className="text-2xl mb-2">Sign In</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </div>

          <CardContent>
            <CredentialsSignInForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignInPage;

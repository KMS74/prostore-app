"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInEmailValues } from "@/lib/constants";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
  const [data, action, isPending] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={signInEmailValues.email}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={signInEmailValues.password}
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            variant="default"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          <span>Don&apos;t have an account?</span>{" "}
          <Link
            href="/sign-up"
            target="_self"
            className="underline font-semibold text-primary"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;

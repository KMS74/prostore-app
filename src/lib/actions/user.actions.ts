"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/library";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";
import { signInSchema, signUpSchema } from "../validators";

// Sign-in action with credential
export async function signInWithCredentials(
  preState: unknown,
  formData: FormData
) {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// Sign-out action
export async function signOutUser() {
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    // Hash password before saving to database
    user.password = hashSync(plainPassword, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    // Auto sign-in after sign-up
    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.log("Sign-up error:", error);
    if (isRedirectError(error)) {
      throw error;
    }

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const fieldErrors = error.issues.map((err) => err.message).join(", ");
      return {
        success: false,
        message: fieldErrors,
      };
    }

    // Handle Prisma errors
    else if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log("PRISMA ERROR", error);
      return {
        success: false,
        message: "Email already exists. Please use a different email.",
      };
    }

    console.error("Unexpected error during sign-up:", error);

    return {
      success: false,
      message: "User was not registered. Please try again.",
    };
  }
}

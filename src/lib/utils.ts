import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(number: number): string {
  const [integerPart, decimalPart] = number.toString().split(".");
  return decimalPart
    ? `${integerPart}.${decimalPart.padEnd(2, "0")}`
    : `${integerPart}.00`;
}

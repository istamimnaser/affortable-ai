
import Form from "next/form";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ResetPasswordForm({
  action,
  defaultEmail = "",
  children,
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Email Address
        </Label>

        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm"
          type="email"
          placeholder="user@example.com"
          autoComplete="email"
          required
          defaultValue={defaultEmail}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="otp"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          OTP
        </Label>

        <Input
          id="otp"
          name="otp"
          className="bg-muted text-md md:text-sm"
          type="text"
          placeholder="Enter the OTP sent to your email"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          New Password
        </Label>

        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm"
          type="password"
          placeholder="Enter your new password"
          required
        />
      </div>

      {children}
    </Form>
  );
}
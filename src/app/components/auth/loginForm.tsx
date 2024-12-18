"use client";

import React, { useEffect, useState } from "react";
import { Text, Button, TextField, Flex } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (!res?.ok) {
      console.log(res);
    }

    if (isClient) {
      router.push("/dashboard");
    }
  });

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        {/* Email Field */}
        <label htmlFor="email">E-mail:</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "E-mail is required" }
            }}
            render={({ field }) => (
              <TextField.Input
                id="email"
                type="email"
                placeholder="e-mail"
                {...field}
              />
            )}
          />
        </TextField.Root>
        {errors.email && typeof errors.email.message === "string" && (
          <Text color="red" size="2">{errors.email.message}</Text>
        )}

        {/* Password Field */}
        <label htmlFor="password">Password:</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required" },
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            }}
            render={({ field }) => (
              <TextField.Input
                id="password"
                type="password"
                placeholder="********"
                {...field}
              />
            )}
          />
        </TextField.Root>
        {errors.password && typeof errors.password.message === "string" && (
          <Text color="red" size="2">{errors.password.message}</Text>
        )}

        {/* Submit Button */}
        <Button type="submit" mt="4" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-all">
          Sign In
        </Button>
      </Flex>
    </form>
  );
};

export default SignInForm;

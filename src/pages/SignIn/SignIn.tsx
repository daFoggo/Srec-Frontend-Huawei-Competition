"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { KeyRound, Mail } from "lucide-react";
import loginBackground from "@/assets/images/Login/login_background.png";
import { motion } from "framer-motion";
import { useEffect } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const SignIn = () => {
  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    const currentRole = localStorage.getItem("role");

    if (isSignedIn) {
      if (currentRole === "Recruiter") {
        navigate("/recruiter/job-descriptions");
      } else if (currentRole === "Candidate") {
        navigate("/candidate/welcome");
      }
    }

    return () => {};
  }, []);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      toast.success("Sign in successfully");
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <motion.div
        className="w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="font-inter backdrop-blur-sm bg-white/50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-end gap-1">
                        <Mail className="h-4 w-4 shrink-0" />
                        <p>Email</p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white/50"
                          placeholder="Type your email..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-end gap-1">
                        <KeyRound className="h-4 w-4 shrink-0" />
                        <p>Password</p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-white/50"
                          placeholder="Type your password..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;

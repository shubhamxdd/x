"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import Input from "../Input";
import useLoginModal from "@/hooks/useLoginModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const router = useRouter();
  // TODO Handle form submission with react-hook-form

  const { close, isOpen, open } = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = useCallback(() => {
    if (isLoading) return;
    close();
    loginModal.open();
  }, [close, loginModal, isLoading]);

  const handleClick = useCallback(() => {
    return setShowPassword(!showPassword);
  }, [showPassword]);
  const handleConfirmClick = useCallback(() => {
    return setShowCPassword(!showCPassword);
  }, [showCPassword]);

  const onSubmit = useCallback(async () => {
    try {
      if (!email || !name || !username || !password || !confirmPassword) {
        toast.error("Please fill all the fields");
        return;
      }
      setIsLoading(true);

      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          username,
          password,
          confirmPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error while registering", errorData.message);
        toast.error(errorData.message);
      } else {
        console.log("Account created successfully");
        toast.success("Account created successfully");
        const signin = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (!signin?.error) {
          console.log("Logged in");
          router.push("/home");
          router.refresh();
        } else {
          console.log("Error while logging in", { error: signin.error });
          toast.error(`Error while logging in ${signin.error}`);
        }
        close();
      }

      console.log("Register Response", res);
    } catch (error) {
      console.log(error);
      toast.error("Error while registering! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [close, email, password, username, name, confirmPassword, router]);

  const body = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value.toLowerCase())}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <div className="flex gap-2">
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          disabled={isLoading}
        />
        <button
          className="bg-sky-500 text-white hover:bg-sky-700 transition px-6 rounded-xl outline-none active:bg-sky-800 my-[0.5px]"
          onClick={handleClick}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={showCPassword ? "text" : "password"}
          value={confirmPassword}
          disabled={isLoading}
        />
        <button
          className="bg-sky-500 text-white hover:bg-sky-700 transition px-6 rounded-xl outline-none active:bg-sky-800 my-[0.5px]"
          onClick={handleConfirmClick}
        >
          {showCPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );

  const footer = (
    <div className="mt-4 text-neutral-400 text-center ">
      <p className="">
        Already have an Account?{" "}
        <span
          onClick={onLogin}
          className="text-white font-bold cursor-pointer hover:underline"
        >
          {" "}
          Sign In{" "}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      onSubmit={onSubmit}
      title="Register"
      actionLabel="Register"
      disabled={isLoading}
      body={body}
      footer={footer}
    />
  );
};

export default RegisterModal;

"use client";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import Input from "../Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginModal = () => {
  const router = useRouter();
  const { close, isOpen, open } = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = useCallback(() => {
    if (isLoading) return;
    close();
    registerModal.open();
  }, [close, registerModal, isLoading]);

  const handleClick = useCallback(() => {
    return setShowPassword(!showPassword);
  }, [showPassword]);

  const onSubmit = useCallback(async () => {
    try {
      if (!email || !password) {
        toast.error("Please fill all the fields");
        return;
      }

      setIsLoading(true);

      // TODO Add validation here

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Logging In", { res });

      if (!res?.error) {
        console.log("Logged in");
        router.push("/home");
        router.refresh();
        toast.success("Logged in successfully");
      } else {
        console.log("Error while logging in", { error: res.error });
        toast.error(`Error while logging in ${res.error}`);
      }
      close();
    } catch (error) {
      console.log(error);
      toast.error("Error while logging in");
    } finally {
      setIsLoading(false);
    }
  }, [close, email, password, router]);

  const body = (
    <div className="flex flex-col gap-4">
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
          type={showPassword ? "text" : "password"}
          value={password}
          disabled={isLoading}
        />
        <button
          className="bg-sky-500 text-white hover:bg-sky-700 transition px-6 rounded-xl outline-none active:bg-sky-800 my-[0.5px]"
          onClick={handleClick}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
  const footer = (
    <div className="mt-4 text-neutral-400 text-center ">
      <p className="">
        Dont have an account?{" "}
        <span
          onClick={onRegister}
          className="text-white font-bold cursor-pointer hover:underline"
        >
          {" "}
          Sign Up{" "}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      onSubmit={onSubmit}
      title="Login"
      actionLabel="Login"
      disabled={isLoading}
      body={body}
      footer={footer}
    />
  );
};

export default LoginModal;

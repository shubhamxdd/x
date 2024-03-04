"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import Input from "../Input";
import useLoginModal from "@/hooks/useLoginModal";
import toast from "react-hot-toast";

const RegisterModal = () => {
  // TODO Handle form submission with react-hook-form

  const { close, isOpen, open } = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = useCallback(() => {
    if (isLoading) return;
    close();
    loginModal.open();
  }, [close, loginModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
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
        console.log("User registered successfully");
        toast.success("User registered successfully");
        close();
        loginModal.open();
      }

      console.log("Register Response", res);
    } catch (error) {
      console.log(error);
      toast.error("Error while registering! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [close, email, password, username, name, confirmPassword, loginModal]);

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
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
      <Input
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        disabled={isLoading}
      />
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

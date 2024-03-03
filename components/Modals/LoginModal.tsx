"use client";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import Input from "../Input";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const { close, isOpen, open } = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = useCallback(() => {
    if (isLoading) return;
    close();
    registerModal.open();
  }, [close, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //   TODO Login

      close();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [close]);

  const body = (
    <div className="flex flex-col gap-4">
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

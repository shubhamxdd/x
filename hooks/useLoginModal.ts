import { create } from "zustand";

interface LoginModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useLoginModal = create<LoginModal>((set) => ({
  isOpen: false,
  close() {
    set({ isOpen: false });
  },
  open() {
    set({ isOpen: true });
  },
}));

export default useLoginModal;

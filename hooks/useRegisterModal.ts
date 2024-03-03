import { create } from "zustand";

interface RegisterModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useRegisterModal = create<RegisterModal>((set) => ({
  isOpen: false,
  close() {
    set({ isOpen: false });
  },
  open() {
    set({ isOpen: true });
  },
}));

export default useRegisterModal;

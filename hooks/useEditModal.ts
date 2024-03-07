import { create } from "zustand";

interface EditModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useEditModal = create<EditModal>((set) => ({
  isOpen: false,
  close() {
    set({ isOpen: false });
  },
  open() {
    set({ isOpen: true });
  },
}));

export default useEditModal;

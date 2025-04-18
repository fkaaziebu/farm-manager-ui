import { create } from "zustand";

export type ModalType =
  | "notification"
  | "add-health-record"
  | "add-farm"
  | "house"
  | "event-scheduler"
  | "add-animals-to-farm"
  | "add-house-to-farm"
  | "add-workers-to-farm"
  | "add-pens-to-barn";

interface ModalData {
  notificationType?: "success" | "error" | "info";
  notificationMessage?: string;
  tagNumber?: string;
  farmId?: string;
  farmTag?: string;
  barnUnitId?: string;
  barnName?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));

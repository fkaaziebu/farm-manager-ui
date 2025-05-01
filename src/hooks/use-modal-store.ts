import { Livestock } from "@/graphql/generated/graphql";
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
  | "add-pens-to-barn"
  | "add-livestock-to-pen"
  | "add-livestock-breeding-record"
  | "add-livestock-growth-record"
  | "add-livestock-expense-record";

interface ModalData {
  notificationType?: "success" | "error" | "info";
  notificationMessage?: string;
  tagNumber?: string;
  farmId?: string;
  farmTag?: string;
  barnUnitId?: string;
  barnName?: string;
  penUnitId?: string;
  penName?: string;
  farmName?: string;
  livestockTag?: string;
  livestockGender?: string;
  penLivestock?: Livestock[];
  livestockType?: string;
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

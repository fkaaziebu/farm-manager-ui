import { Farm, Livestock, Pen, Task } from "@/graphql/generated/graphql";
import { create } from "zustand";
import { Worker, Barn } from "@/graphql/generated/graphql";
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
  | "add-livestock-expense-record"
  | "task-modal"
  | "update-pen"
  | "update-farm"
  | "update-barn"
  | "update-livestock"
  | "update-worker";

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
  workerTag?: string;
  farmWorkers?: Worker[];
  taskList?: Task[];
  farm?: Farm[];
  barn?: Barn;
  pen?: Pen;
  livestock?: Livestock;
  createFarmEvent?: string;
  addWorkersToFarmEvent?: string;
  addBansToFarmEvent?: string;
  addPensToBarnEvent?: string;
  addLivestockToPenEvent?: string;
  farmWorker?: Worker;
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

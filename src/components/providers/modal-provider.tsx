"use client";

import { AddFarmModal } from "@/components/modals/add-farm-modal";
import { AddLivestockModal } from "@/components/modals/add-animals-to-farm-modal";
import { HealthRecordModal } from "@/components/modals/add-health-record-modal";
import { FarmWorkersModal } from "@/components/modals/add-workers-to-farm-modal";
import { AddHouseModal } from "@/components/modals/add-barns-to-farm-modal";
import { useEffect, useState } from "react";
import { AddPensModal } from "../modals/add-pens-to-barns-modal";
import { NotificationModal } from "../modals/notification-modal";
import { BreedingRecordModal } from "../modals/add-livestock-breeding-record-modal";
import { GrowthRecordModal } from "../modals/add-livestock-growth-record-modal";
import { ExpenseRecordModal } from "../modals/add-livestock-expense-record-modal";
import { TaskModal } from "../modals/create-and-assign-task-to-worker-modal";
import { UpdateBarnModal } from "../modals/update-barn-modal";
import { UpdateFarmModal } from "../modals/update-farm-modal";
import { UpdateLivestockModal } from "../modals/update-livestock-modal";
import { UpdatePenModal } from "../modals/update-pen-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddFarmModal />
      <HealthRecordModal />
      <FarmWorkersModal />
      <AddHouseModal />
      <AddPensModal />
      <NotificationModal />
      <AddLivestockModal />
      <BreedingRecordModal />
      <GrowthRecordModal />
      <ExpenseRecordModal />
      <TaskModal />
      <UpdateBarnModal />
      <UpdateFarmModal />
      <UpdatePenModal />
      <UpdateLivestockModal />
    </>
  );
};

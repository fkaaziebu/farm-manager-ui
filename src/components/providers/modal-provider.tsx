"use client";

import { AddFarmModal } from "@/components/modals/add-farm-modal";
import { AddAnimalsModal } from "@/components/modals/add-animals-to-farm-modal";
import { HealthRecordModal } from "@/components/modals/add-health-record-modal";
import { AddWorkersModal } from "@/components/modals/add-workers-to-farm-modal";
import { AddHouseModal } from "@/components/modals/add-barns-to-farm-modal";
import { useEffect, useState } from "react";
import { AddPensModal } from "../modals/add-pens-to-barns-modal";
import { NotificationModal } from "../modals/notification-modal";

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
      <AddAnimalsModal />
      <HealthRecordModal />
      <AddWorkersModal />
      <AddHouseModal />
      <AddPensModal />
      <NotificationModal />
    </>
  );
};

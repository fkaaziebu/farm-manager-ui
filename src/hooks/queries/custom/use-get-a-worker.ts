"use client";
import { useState } from "react";
import useGetWorker from "../use-get-worker";

import { GetWorkerQuery } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";
type WorkerProps = NonNullable<GetWorkerQuery["getWorker"]>;

export default function useGetASingleWorker() {
  const [loadingWorker, setLoadingWorker] = useState(false);
  const [worker, setWorker] = useState<WorkerProps>();
  const { getWorker } = useGetWorker();
  const { onOpen } = useModal();

  const fetchWorker = async ({ workerTag }: { workerTag: string }) => {
    setLoadingWorker(true);
    try {
      const response = await getWorker({
        variables: {
          workerTag,
        },
      });

      setWorker(response.data?.getWorker);
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `${error}`,
      });
    } finally {
      setLoadingWorker(false);
    }
  };

  return { worker, loadingWorker, fetchWorker };
}

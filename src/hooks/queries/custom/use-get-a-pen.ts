"use client";
import { useState } from "react";
import useGetPen from "../use-get-pen";

import { GetPenQuery } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";
type PenProps = NonNullable<GetPenQuery["getPen"]>;

export default function useFetchPen() {
  const [loadingPen, setLoadingPen] = useState(false);
  const [pen, setPen] = useState<PenProps>();
  const { getPen } = useGetPen();
  const { onOpen } = useModal();

  const fetchPen = async ({ penUnitId }: { penUnitId: string }) => {
    setLoadingPen(true);
    try {
      const response = await getPen({
        variables: {
          penUnitId,
        },
      });

      setPen(response.data?.getPen);
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `${error}`,
      });
    } finally {
      setLoadingPen(false);
    }
  };

  return { pen, loadingPen, fetchPen };
}

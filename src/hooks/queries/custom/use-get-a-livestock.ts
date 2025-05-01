import { useState } from "react";
import useGetLivestock from "../use-get-livestock";

import { GetLivestockQuery } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";

type LivestockProp = NonNullable<GetLivestockQuery["getLivestock"]>;

export default function useFetchALivestock() {
  const [loadingLivestock, setLoadingLivestock] = useState(false);
  const [livestock, setLivestock] = useState<LivestockProp>();
  const { getLivestock } = useGetLivestock();
  const { onOpen } = useModal();

  const fetchLivestock = async ({ livestockTag }: { livestockTag: string }) => {
    setLoadingLivestock(true);
    try {
      const response = await getLivestock({
        variables: {
          livestockTag,
        },
      });

      setLivestock(response?.data?.getLivestock);
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `${error}`,
      });
    } finally {
      setLoadingLivestock(false);
    }
  };

  return { livestock, loadingLivestock, fetchLivestock };
}

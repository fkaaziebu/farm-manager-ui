import { useState } from "react";
import useGetBarn from "../use-get-barn";

import { GetBarnQuery } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";
type BarnProps = NonNullable<GetBarnQuery["getBarn"]>;

export default function useFetchBarn() {
  const [loadingBarn, setLoadingBarn] = useState(false);
  const [barn, setBarn] = useState<BarnProps>();
  const { getBarn } = useGetBarn();
  const { onOpen } = useModal();

  const fetchBarn = async ({ barnUnitId }: { barnUnitId: string }) => {
    setLoadingBarn(true);
    try {
      const response = await getBarn({
        variables: {
          barnUnitId,
        },
      });

      setBarn(response.data?.getBarn);
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `${error}`,
      });
    } finally {
      setLoadingBarn(false);
    }
  };

  return { barn, loadingBarn, fetchBarn };
}

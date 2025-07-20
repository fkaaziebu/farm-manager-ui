"use client";
import { useState } from "react";
import useGetField from "../use-get-field";

import { GetFieldQuery } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";
type FieldProp = NonNullable<GetFieldQuery["getField"]>;

export default function useGetABarn() {
  const [loadingField, setLoadingField] = useState(false);
  const [field, setField] = useState<FieldProp>();
  const { getField } = useGetField();
  const { onOpen } = useModal();

  const fetchField = async ({ fieldUnitId }: { fieldUnitId: string }) => {
    setLoadingField(true);
    try {
      const response = await getField({
        variables: {
          fieldUnitId,
        },
      });

      setField(response.data?.getField);
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `${error}`,
      });
    } finally {
      setLoadingField(false);
    }
  };

  return { field, loadingField, fetchField };
}

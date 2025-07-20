"use client";
import { useState } from "react";
import useListFields from "../use-list-fields";
import { Field, PageInfo, PaginationInput } from "@/graphql/generated/graphql";
import { useModal } from "@/hooks/use-modal-store";
type FieldProps = NonNullable<Field>;

export default function useFetchFields() {
  const [loadingFields, setLoadingFields] = useState(false);
  const [fields, setField] = useState<Array<FieldProps>>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const { onOpen } = useModal();
  const { listFields } = useListFields();
  const fetchFields = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      setLoadingFields(true);
      const response = await listFields({
        variables: {
          searchTerm: searchTerm || "",
          pagination,
        },
      });
      setField(
        // @ts-expect-error err
        response?.data?.listFields?.edges?.map((edge) => edge.node) || []
      );
      setPageInfo(response?.data?.listFields?.pageInfo);
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `${error}`,
      });
    } finally {
      setLoadingFields(false);
    }
  };
  const fetchMoreFields = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      if (pageInfo?.hasNextPage && pageInfo.endCursor) {
        setLoadingFields(true);
        const response = await listFields({
          variables: {
            searchTerm: searchTerm || "",
            pagination: {
              ...pagination,
              after: pageInfo.endCursor,
            },
          },
        });

        setField([
          // @ts-expect-error err
          ...fields,
          // @ts-expect-error err
          ...response.data.listFields.edges.map((edge) => edge.node),
        ]);
        setPageInfo(response.data?.listFields.pageInfo);
      }
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `${error}`,
      });
    } finally {
      setLoadingFields(false);
    }
  };

  return {
    fields,
    loadingFields,
    fetchFields,
    fetchMoreFields,
    pageInfo,
  };
}

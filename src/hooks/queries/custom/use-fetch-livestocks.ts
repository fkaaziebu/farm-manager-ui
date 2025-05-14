"use client";
import { useState } from "react";
import useListLivestocks from "../use-list-livestocks";
import { toast } from "sonner";
import {
  Livestock,
  LivestockSortField,
  PageInfo,
  SortDirection,
  PaginationInput,
} from "@/graphql/generated/graphql";

type LivestockProps = NonNullable<Livestock>;

export default function useFetchLivestocks() {
  const [loadingLivestocks, setLoadingLivestocks] = useState(false);
  const [livestocks, setLivestocks] = useState<Array<LivestockProps>>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();

  const { getLivestocks } = useListLivestocks();

  const fetchLivestocks = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      setLoadingLivestocks(true);
      const response = await getLivestocks({
        variables: {
          searchTerm: searchTerm || "",
          sort: [
            {
              field: LivestockSortField.Id,
              direction: SortDirection.Asc,
            },
          ],
          pagination,
        },
      });

      setLivestocks(
        // @ts-expect-error err
        response?.data?.listLivestock?.edges?.map((edge) => edge.node) || []
      );
      setPageInfo(response?.data?.listLivestock?.pageInfo);
    } catch (error) {
      toast("Error loading livestocks", {
        description: `${error}`,
      });
    } finally {
      setLoadingLivestocks(false);
    }
  };

  const fetchMoreLivestocks = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      if (pageInfo?.hasNextPage && pageInfo.endCursor) {
        setLoadingLivestocks(true);
        const response = await getLivestocks({
          variables: {
            searchTerm: searchTerm || "",
            sort: [
              {
                field: LivestockSortField.Id,
                direction: SortDirection.Asc,
              },
            ],
            pagination: {
              ...pagination,
              after: pageInfo.endCursor,
            },
          },
        });

        setLivestocks([
          // @ts-expect-error err
          ...livestocks,
          // @ts-expect-error err
          ...response.data.listLivestock.edges.map((edge) => edge.node),
        ]);
        setPageInfo(response.data?.listLivestock?.pageInfo);
      }
    } catch (error) {
      toast("Error loading livestocks", {
        description: `${error}`,
      });
    } finally {
      setLoadingLivestocks(false);
    }
  };

  return {
    livestocks,
    loadingLivestocks,
    fetchLivestocks,
    fetchMoreLivestocks,
    pageInfo,
  };
}

"use client";
import { useState } from "react";
import useListBarns from "../use-list-barns";
import { toast } from "sonner";
import {
  Barn,
  BarnSortField,
  PageInfo,
  SortDirection,
  PaginationInput,
} from "@/graphql/generated/graphql";

type BarnProps = NonNullable<Barn>;

export default function useFetchBarns() {
  const [loadingBarns, setLoadingBarns] = useState(false);
  const [barns, setBarns] = useState<Array<BarnProps>>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();

  const { listBarns } = useListBarns();

  const fetchBarns = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      setLoadingBarns(true);
      const response = await listBarns({
        variables: {
          searchTerm: searchTerm || "",
          sort: [
            {
              field: BarnSortField.Id,
              direction: SortDirection.Asc,
            },
          ],
          pagination,
        },
      });
      // @ts-expect-error err
      setBarns(response?.data?.listBarns?.edges.map((edge) => edge.node) || []);
      setPageInfo(response?.data?.listBarns?.pageInfo);
    } catch (error) {
      toast("Error loading barns", {
        description: `${error}`,
      });
    } finally {
      setLoadingBarns(false);
    }
  };

  const fetchMoreBarns = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      if (pageInfo?.hasNextPage && pageInfo.endCursor) {
        setLoadingBarns(true);
        const response = await listBarns({
          variables: {
            searchTerm: searchTerm || "",
            sort: [
              {
                field: BarnSortField.Id,
                direction: SortDirection.Asc,
              },
            ],
            pagination: {
              ...pagination,
              after: pageInfo.endCursor,
            },
          },
        });

        setBarns([
          // @ts-expect-error err
          ...barns,
          // @ts-expect-error err
          ...response.data.listBarns.edges.map((edge) => edge.node),
        ]);
        setPageInfo(response.data?.listBarns.pageInfo);
      }
    } catch (error) {
      toast("Error loading barns", {
        description: `${error}`,
      });
    } finally {
      setLoadingBarns(false);
    }
  };

  return {
    barns,
    loadingBarns,
    fetchBarns,
    fetchMoreBarns,
    pageInfo,
  };
}

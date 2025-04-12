import { useState } from "react";
import useListFarms from "../use-list-farms";
import { toast } from "sonner";
import {
  type FarmFilterInput,
  type PageInfo,
  type PaginationInput,
  type Farm,
  FarmSortField,
  SortDirection,
} from "@/graphql/generated/graphql";

export default function useFetchFarms() {
  const [loadingFarms, setLoadingFarms] = useState(false);
  const [farms, setFarms] = useState<Array<Farm>>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const { listFarms } = useListFarms();

  const fetchFarms = async ({
    searchTerm,
    pagination,
    filter,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
    filter?: FarmFilterInput;
  }) => {
    try {
      setLoadingFarms(true);
      const response = await listFarms({
        variables: {
          searchTerm,
          sort: [
            {
              field: FarmSortField.Id,
              direction: SortDirection.Asc,
            },
          ],
          pagination,
          filter,
        },
      });
      setFarms(
        response?.data?.listFarms?.edges?.map((edge) => edge.node) || []
      );
      setPageInfo(response.data?.listFarms.pageInfo);
    } catch (error) {
      toast("Error loading farms", {
        description: `${error}`,
      });
    } finally {
      setLoadingFarms(false);
    }
  };

  const fetchMoreFarms = async ({
    searchTerm,
    pagination,
    filter,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
    filter?: FarmFilterInput;
  }) => {
    try {
      if (pageInfo?.hasNextPage && pageInfo.endCursor) {
        setLoadingFarms(true);
        const response = await listFarms({
          variables: {
            searchTerm,
            sort: [
              {
                field: FarmSortField.Id,
                direction: SortDirection.Asc,
              },
            ],
            pagination: {
              ...pagination,
              after: pageInfo.endCursor,
            },
            filter,
          },
        });

        setFarms([
          // @ts-expect-error err
          ...farms,
          // @ts-expect-error err
          ...response.data.listFarms.edges.map((edge) => edge.node),
        ]);
        setPageInfo(response.data?.listFarms.pageInfo);
      }
    } catch (error) {
      toast("Error loading farms", {
        description: `${error}`,
      });
    } finally {
      setLoadingFarms(false);
    }
  };

  return {
    farms,
    loadingFarms,
    fetchFarms,
    fetchMoreFarms,
  };
}

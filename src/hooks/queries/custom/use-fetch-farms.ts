import { useState } from "react";
import useListFarms from "../use-list-farms";
import { toast } from "sonner";
import {
  type Farm,
  FarmSortField,
  type PageInfo,
  SortDirection,
  type PaginationInput,
  type FarmFilterInput,
} from "@/graphql/generated/graphql";

type FarmProps = NonNullable<Farm>;

export default function useFetchFarms() {
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [loadingMoreFarms, setLoadingMoreFarms] = useState(true);
  const [farms, setFarms] = useState<Array<FarmProps>>();
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
          searchTerm: searchTerm || "",
          sort: [
            {
              field: FarmSortField.Id,
              direction: SortDirection.Asc,
            },
          ],
          pagination,
          filter: {
            id: filter?.id,
          },
        },
      });
      // @ts-expect-error err
      setFarms(response?.data?.listFarms?.edges.map((edge) => edge.node) || []);
      setPageInfo(response?.data?.listFarms?.pageInfo);
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
        setLoadingMoreFarms(true);
        const response = await listFarms({
          variables: {
            searchTerm: searchTerm || "",
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
            filter: {
              id: filter?.id,
            },
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
      setLoadingMoreFarms(false);
    }
  };

  return {
    farms,
    loadingFarms,
    loadingMoreFarms,
    fetchFarms,
    fetchMoreFarms,
    pageInfo,
  };
}

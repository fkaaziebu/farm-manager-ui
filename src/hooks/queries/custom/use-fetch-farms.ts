import { useState } from "react";
import useListFarms from "../use-list-farms";
import { toast } from "sonner";
import {
  Farm,
  FarmSortField,
  PageInfo,
  SortDirection,
  PaginationInput,
} from "@/graphql/generated/graphql";

type FarmProps = NonNullable<Farm>;

export default function useFetchFarms() {
  const [loadingFarms, setLoadingFarms] = useState(false);
  const [farms, setFarms] = useState<Array<FarmProps>>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();

  const { listFarms } = useListFarms();

  const fetchFarms = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
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
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      if (pageInfo?.hasNextPage && pageInfo.endCursor) {
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
            pagination: {
              ...pagination,
              after: pageInfo.endCursor,
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
      setLoadingFarms(false);
    }
  };

  return {
    farms,
    loadingFarms,
    fetchFarms,
    fetchMoreFarms,
    pageInfo,
  };
}

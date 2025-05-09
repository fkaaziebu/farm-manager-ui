import { useState } from "react";
import useListPens from "../use-list-pens";
import { toast } from "sonner";
import {
  Pen,
  PenSortField,
  PageInfo,
  SortDirection,
  PaginationInput,
} from "@/graphql/generated/graphql";

type PenProps = NonNullable<Pen>;

export default function useFetchPens() {
  const [loadingPens, setLoadingPens] = useState(false);
  const [pens, setPens] = useState<Array<PenProps>>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();

  const { listPens } = useListPens();
  const fetchPens = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      setLoadingPens(true);
      const response = await listPens({
        variables: {
          searchTerm: searchTerm || "",
          sort: [
            {
              field: PenSortField.Id,
              direction: SortDirection.Asc,
            },
          ],
          pagination,
        },
      });
      // @ts-expect-error error
      setPens(response?.data?.listPens?.edges.map((edge) => edge.node) || []);
      setPageInfo(response?.data?.listPens?.pageInfo);
    } catch (error) {
      toast("Error loading pens", {
        description: `${error}`,
      });
    } finally {
      setLoadingPens(false);
    }
  };

  const fetchMorePens = async ({
    searchTerm,
    pagination,
  }: {
    searchTerm?: string;
    pagination?: PaginationInput;
  }) => {
    try {
      if (pageInfo?.hasNextPage && pageInfo.endCursor) {
        setLoadingPens(true);
        const response = await listPens({
          variables: {
            searchTerm: searchTerm || "",
            sort: [
              {
                field: PenSortField.Id,
                direction: SortDirection.Asc,
              },
            ],
            pagination: {
              ...pagination,
              after: pageInfo.endCursor,
            },
          },
        });

        setPens([
          ...(pens || []),
          // @ts-expect-error error
          ...response?.data?.listPens?.edges?.map((edge) => edge.node),
        ]);
        setPageInfo(response.data?.listPens?.pageInfo);
      }
    } catch (error) {
      toast("Error loading pens", {
        description: `${error}`,
      });
    } finally {
      setLoadingPens(false);
    }
  };

  return {
    pens,
    loadingPens,
    fetchPens,
    fetchMorePens,
    pageInfo,
  };
}

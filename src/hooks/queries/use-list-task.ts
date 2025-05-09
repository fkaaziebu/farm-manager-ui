import { useLazyQuery } from "@apollo/client";

import { ListTask } from "@/graphql/queries/list-task.graphql";

import type {
  ListTaskQuery,
  ListTaskQueryVariables,
} from "@/graphql/generated/graphql";

const useListTask = (args?: ListTaskQueryVariables) => {
  const [listTask, { loading, data }] = useLazyQuery<
    ListTaskQuery,
    ListTaskQueryVariables
  >(ListTask, {
    variables: args,
  });

  return { listTask, loading, data };
};
export default useListTask;

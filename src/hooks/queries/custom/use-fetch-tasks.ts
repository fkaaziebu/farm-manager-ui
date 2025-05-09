import { useState } from "react";
import useListTasks from "../use-list-task";
import { Task } from "@/graphql/generated/graphql";

type PenProps = NonNullable<Task>;

export default function useFetchPens() {
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState<Array<PenProps>>();

  const { listTask } = useListTasks();
  const fetchTasks = async ({ farmTag }: { farmTag?: string }) => {
    try {
      setLoadingTasks(true);
      const response = await listTask({
        variables: {
          filter: {
            farmTag: farmTag || "",
          },
        },
      });
      //   @ts-expect-error error
      setTasks(response?.data?.listTask?.map((edge) => edge) || []);
    } catch (error) {
      console.error("Error loading tasks", error);
    } finally {
      setLoadingTasks(false);
    }
  };

  return {
    tasks,
    loadingTasks,
    fetchTasks,
  };
}

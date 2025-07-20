"use client";
import { useState } from "react";

import useListPredictions from "../use-list-prediction";
import useGetCropBatch from "../use-get-crop-batch";
import {
  CropBatch,
  HousingUnit,
  Prediction,
  PredictionCropType,
  PredictionSortField,
  SortDirection,
} from "@/graphql/generated/graphql";

export default function useGetCropBatchWithPredictions() {
  const { getCropBatch } = useGetCropBatch();
  const { listPredictions } = useListPredictions();
  const [loading, setLoading] = useState(false);
  const [cropBatch, setCropBatch] = useState<CropBatch>();
  const [predictions, setPredictions] = useState<Prediction[]>();

  const getCropBatchWithPredictions = async ({
    cropBatchTag,
    cropType,
    housingUnit,
    farmTag,
  }: {
    cropBatchTag: string;
    cropType?: PredictionCropType;
    housingUnit: HousingUnit;
    farmTag?: string;
  }) => {
    try {
      setLoading(true);
      const response = await getCropBatch({
        variables: {
          cropBatchTag,
          housingUnit,
        },
      });

      setCropBatch(response?.data?.getCropBatch);

      // get predictions
      const result = await listPredictions({
        variables: {
          filter: {
            cropType,
            farmTag,
          },
          pagination: {
            first: 20,
          },
          sort: [
            {
              field: PredictionSortField.InsertedAt,
              direction: SortDirection.Desc,
            },
          ],
        },
      });
      setPredictions(
        // @ts-expect-error err
        result?.data?.listPredictions?.edges.map((edge) => edge?.node) || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    cropBatch,
    predictions,
    getCropBatchWithPredictions,
  };
}

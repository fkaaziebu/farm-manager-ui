"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Farm } from "@/graphql/generated/graphql";
import {
  FarmDetailsHeader,
  FarmOverviewSection,
  FarmWorkersSection,
  FarmBarnsSection,
  FarmLivestockSection,
  FarmFieldsSection,
  FarmTasksSection,
} from "@/components/pages/farms/[farmTag]";
import useGetFarm from "@/hooks/queries/use-get-farm";

export default function FarmDetailsPage() {
  const [farm, setFarm] = useState<Farm>();
  const [loadingFarm, setLoadingFarm] = useState(true);
  const { getFarm } = useGetFarm();
  const params = useParams();
  const farmTag = params.farmTag;
  const { data } = useModal();

  const fetchFarm = async () => {
    try {
      setLoadingFarm(true);
      const response = await getFarm({
        variables: {
          farmTag: `${farmTag}`,
        },
      });
      // @ts-expect-error error
      setFarm(response.data?.getFarm);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFarm(false);
    }
  };

  useEffect(() => {
    fetchFarm();
  }, [
    data.addWorkersToFarmEvent,
    data.addFieldsToFarmEvent,
    data.addBansToFarmEvent,
    data.updateFarmEvent,
    data.addLivestockToPenEvent,
    data.createTaskEvent,
  ]);

  useEffect(() => {
    if (farm?.farm_tag) {
      sessionStorage.setItem("farm_Tag", farm.farm_tag);
    }
  }, [farm]);

  // Determine which sections to show based on farm type
  const shouldShowBarns = () => {
    if (!farm?.farm_type) return false;
    return ["LIVESTOCK", "MIXED"].includes(farm.farm_type);
  };

  const shouldShowLivestock = () => {
    if (!farm?.farm_type) return false;
    return ["LIVESTOCK", "MIXED"].includes(farm.farm_type);
  };

  const shouldShowFields = () => {
    if (!farm?.farm_type) return false;
    return ["CROP", "MIXED"].includes(farm.farm_type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <FarmDetailsHeader farm={farm} loading={loadingFarm} />

      {/* Overview Stats */}
      <FarmOverviewSection farm={farm} loading={loadingFarm} />

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="space-y-4 sm:space-y-6">
          {/* First Row - Workers and Barns/Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <FarmWorkersSection farm={farm} loading={loadingFarm} />
            {shouldShowBarns() && (
              <FarmBarnsSection farm={farm} loading={loadingFarm} />
            )}
            {shouldShowFields() && !shouldShowBarns() && (
              <FarmFieldsSection farm={farm} loading={loadingFarm} />
            )}
          </div>

          {/* Second Row - Livestock and Fields (if both exist) */}
          {(shouldShowLivestock() ||
            (shouldShowFields() && shouldShowBarns())) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {shouldShowLivestock() && (
                <FarmLivestockSection farm={farm} loading={loadingFarm} />
              )}
              {shouldShowFields() && shouldShowBarns() && (
                <FarmFieldsSection farm={farm} loading={loadingFarm} />
              )}
            </div>
          )}

          {/* Third Row - Tasks (Full Width) */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <FarmTasksSection farm={farm} loading={loadingFarm} />
          </div>
        </div>
      </div>
    </div>
  );
}

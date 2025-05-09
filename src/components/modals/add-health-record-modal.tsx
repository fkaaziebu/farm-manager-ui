"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import {
  Tag,
  Clipboard,
  Thermometer,
  Stethoscope,
  Pill,
  User,
  DollarSign,
  FilePlus,
  CalendarCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAddAnimalHealthRecord } from "@/hooks/mutations";

import { HealthRecordStatus } from "@/graphql/generated/graphql";

type AddHealthRecordInput = {
  tagNumber: string;
  issue: string;
  symptoms: string;
  diagnosis: string;
  medication: string;
  vetName: string;
  cost: string;
  notes: string;
  dosage: string;
  treatment: string;
  recordDate: string;
  recordStatus: HealthRecordStatus;
};

export const HealthRecordModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { addLivestockHealthRecord, loading } = useAddAnimalHealthRecord();
  const { onOpen } = useModal();
  const tagNumber = data?.livestockTag || "";

  const [healthRecord, setHealthRecord] = useState({
    tagNumber: tagNumber,
    issue: "",
    symptoms: "",
    diagnosis: "",
    medication: "",
    vetName: "",
    cost: "",
    notes: "",
    dosage: "",
    treatment: "",
    recordDate: new Date().toISOString(),
    recordStatus: HealthRecordStatus.Healthy,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddHealthRecordInput>({
    defaultValues: {
      tagNumber: "",
      issue: "",
      symptoms: "",
      diagnosis: "",
      medication: "",
      vetName: "",
      cost: "",
      notes: "",
      dosage: "",
      treatment: "",
      recordStatus: HealthRecordStatus.Healthy,
      recordDate: new Date().toISOString(),
    },
  });

  const isModalOpen = isOpen && type === "add-health-record";

  // Handle form submission
  const onSubmit: SubmitHandler<AddHealthRecordInput> = async (data, event) => {
    event?.preventDefault();
    try {
      const response = await addLivestockHealthRecord({
        variables: {
          livestockTag: tagNumber,
          healthRecord: {
            issue: data.issue,
            symptoms: data.symptoms,
            diagnosis: data.diagnosis,
            medication: data.medication,
            vetName: data.vetName,
            cost: parseFloat(data.cost),
            notes: data.notes,
            recordDate: new Date().toISOString(),
            treatment: data.treatment,
            dosage: data.dosage,
            recordStatus: data.recordStatus,
          },
        },
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data?.addLivestockHealthRecord) {
        throw new Error("Failed to add health record");
      }

      // Reset form and state
      reset();
      setHealthRecord({
        tagNumber: "",
        issue: "",
        symptoms: "",
        diagnosis: "",
        medication: "",
        vetName: "",
        cost: "",
        notes: "",
        dosage: "",
        treatment: "",
        recordDate: new Date().toISOString(),
        recordStatus: HealthRecordStatus.Healthy,
      });

      onClose();
      onOpen("notification", {
        notificationType: "success",
        notificationMessage: `Health record created successfully!`,
      });
    } catch (error) {
      onOpen("notification", {
        notificationType: "error",
        notificationMessage: `Error creating health record: ${error}`,
      });
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ y: 5, opacity: 0, display: "none" }}
          animate={{ y: 0, opacity: 1, display: "block" }}
          exit={{ y: 5, opacity: 0, display: "none" }}
          className="backdrop-blur-sm fixed bg-gray-400/60 inset-0 z-50 flex items-center justify-center "
          onClick={() => onClose()}
        >
          <div className="flex items-center justify-center w-full h-full">
            <div
              className=" w-full max-w-xl bg-white rounded-lg shadow-xl overflow-hidden items-center justify-center m-auto "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="text-xl font-semibold text-gray-900">
                  Add Health Record
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Enter the details of the animal health record below.
                </div>
                <button
                  onClick={() => onClose()}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <form id="health_record_form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Animal Tag Number */}
                    <div className="space-y-2">
                      <Label htmlFor="tagNumber" className="flex items-center">
                        <Tag className="h-4 w-4 mr-1 text-gray-500" />
                        Tag Number
                      </Label>
                      <Input
                        id="tagNumber"
                        placeholder="e.g. A12345"
                        value={tagNumber}
                        readOnly
                        className="col-span-3 bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="recordStatus"
                        className="flex items-center"
                      >
                        <Clipboard className="h-4 w-4 mr-1 text-gray-500" />
                        Animal health Status
                      </Label>
                      <select
                        id="recordStatus"
                        value={healthRecord.recordStatus}
                        {...register("recordStatus", {
                          required: {
                            value: true,
                            message: "Health status is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              recordStatus: event.target
                                .value as HealthRecordStatus,
                            });
                          },
                        })}
                        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      >
                        <option value={HealthRecordStatus.Healthy}>
                          Healthy
                        </option>
                        <option value={HealthRecordStatus.Sick}>Sick</option>
                        <option value={HealthRecordStatus.Recovering}>
                          Recovering
                        </option>
                        <option value={HealthRecordStatus.Treated}>
                          Treated
                        </option>
                      </select>
                      {errors.recordStatus && (
                        <p className="text-xs text-red-500">
                          {errors.recordStatus.message}
                        </p>
                      )}
                    </div>

                    {/* Health Issue */}
                    <div className="space-y-2">
                      <Label htmlFor="issue" className="flex items-center">
                        <Clipboard className="h-4 w-4 mr-1 text-gray-500" />
                        Health Issue
                      </Label>
                      <Input
                        id="issue"
                        placeholder="eg. respiratory infection"
                        value={healthRecord.issue}
                        {...register("issue", {
                          required: {
                            value: true,
                            message: "Health issue is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              issue: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.issue && (
                        <p className="text-xs text-red-500">
                          {errors.issue.message}
                        </p>
                      )}
                    </div>

                    {/* Symptoms */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="symptoms" className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-1 text-gray-500" />
                        Symptoms
                      </Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Describe the symptoms observed"
                        value={healthRecord.symptoms}
                        {...register("symptoms", {
                          required: {
                            value: true,
                            message: "Symptoms are required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              symptoms: event.target.value,
                            });
                          },
                        })}
                        className="resize-none"
                        rows={2}
                      />
                      {errors.symptoms && (
                        <p className="text-xs text-red-500">
                          {errors.symptoms.message}
                        </p>
                      )}
                    </div>

                    {/* Diagnosis */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="diagnosis" className="flex items-center">
                        <Stethoscope className="h-4 w-4 mr-1 text-gray-500" />
                        Diagnosis
                      </Label>
                      <Input
                        id="diagnosis"
                        placeholder="e.g. Respiratory infection"
                        value={healthRecord.diagnosis}
                        {...register("diagnosis", {
                          required: {
                            value: true,
                            message: "Diagnosis is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              diagnosis: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.diagnosis && (
                        <p className="text-xs text-red-500">
                          {errors.diagnosis.message}
                        </p>
                      )}
                    </div>

                    {/* Medication */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="treatment" className="flex items-center">
                        <Pill className="h-4 w-4 mr-1 text-gray-500" />
                        Treatment
                      </Label>
                      <Input
                        id="treatment"
                        placeholder="e.g Isolate and give injection"
                        value={healthRecord.treatment}
                        {...register("treatment", {
                          required: {
                            value: true,
                            message: "Treatment is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              treatment: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.treatment && (
                        <p className="text-xs text-red-500">
                          {errors.treatment.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="medication" className="flex items-center">
                        <Pill className="h-4 w-4 mr-1 text-gray-500" />
                        Medication
                      </Label>
                      <Input
                        id="medication"
                        placeholder="e.g. Antibiotics"
                        value={healthRecord.medication}
                        {...register("medication", {
                          required: {
                            value: true,
                            message: "Medication is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              medication: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.medication && (
                        <p className="text-xs text-red-500">
                          {errors.medication.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doasge" className="flex items-center">
                        <Pill className="h-4 w-4 mr-1 text-gray-500" />
                        Dosage
                      </Label>
                      <Input
                        id="dosage"
                        type="string"
                        placeholder="e.g. 500mg"
                        value={healthRecord.dosage}
                        {...register("dosage", {
                          required: {
                            value: true,
                            message: "Dosage is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              dosage: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.dosage && (
                        <p className="text-xs text-red-500">
                          {errors.dosage.message}
                        </p>
                      )}
                    </div>

                    {/* Veterinarian */}
                    <div className="space-y-2">
                      <Label htmlFor="vetName" className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-gray-500" />
                        Veterinarian
                      </Label>
                      <Input
                        id="vetName"
                        placeholder="e.g. Dr. Smith"
                        value={healthRecord.vetName}
                        {...register("vetName", {
                          required: {
                            value: true,
                            message: "Veterinarian name is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              vetName: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.vetName && (
                        <p className="text-xs text-red-500">
                          {errors.vetName.message}
                        </p>
                      )}
                    </div>

                    {/* Cost */}
                    <div className="space-y-2">
                      <Label htmlFor="cost" className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                        Cost
                      </Label>
                      <Input
                        id="cost"
                        type="number"
                        placeholder="0.00"
                        value={healthRecord.cost}
                        {...register("cost", {
                          required: {
                            value: true,
                            message: "Cost is required",
                          },
                          min: {
                            value: 0,
                            message: "Cost must be a positive number",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              cost: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.cost && (
                        <p className="text-xs text-red-500">
                          {errors.cost.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recordDate" className="flex items-center">
                        <CalendarCheckIcon className="h-4 w-4 mr-1 text-gray-500" />
                        Date Recorded
                      </Label>
                      <Input
                        id="recordDate"
                        type="date"
                        placeholder=""
                        value={healthRecord.recordDate}
                        {...register("recordDate", {
                          required: {
                            value: true,
                            message: "Date is required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              recordDate: event.target.value,
                            });
                          },
                        })}
                      />
                      {errors.recordDate && (
                        <p className="text-xs text-red-500">
                          {errors.recordDate.message}
                        </p>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes" className="flex items-center">
                        <FilePlus className="h-4 w-4 mr-1 text-gray-500" />
                        Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information"
                        value={healthRecord.notes}
                        {...register("notes", {
                          required: {
                            value: true,
                            message: "Notes are required",
                          },
                          onChange(event) {
                            setHealthRecord({
                              ...healthRecord,
                              notes: event.target.value,
                            });
                          },
                        })}
                        className="resize-none"
                        rows={3}
                      />
                      {errors.notes && (
                        <p className="text-xs text-red-500">
                          {errors.notes.message}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="health_record_form"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {!loading ? "Save Record" : "Saving..."}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

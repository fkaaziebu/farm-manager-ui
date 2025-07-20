import { useMutation } from "@apollo/client";

import { SubmitPredictionFeedback } from "@/graphql/mutations/submit-crop-prediction-feedback.graphql";

import type {
  SubmitPredictionFeedbackMutation,
  SubmitPredictionFeedbackMutationVariables,
} from "@/graphql/generated/graphql";

const useSubmitCropPredictionFeedback = () => {
  const [submitFeedback, { loading, error }] = useMutation<
    SubmitPredictionFeedbackMutation,
    SubmitPredictionFeedbackMutationVariables
  >(SubmitPredictionFeedback);
  return { submitFeedback, loading, error };
};

export default useSubmitCropPredictionFeedback;

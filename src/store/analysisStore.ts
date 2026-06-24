import { create } from "zustand";
import axios from "axios";

export interface AnalysisStore {
  analysisResult: unknown | null;
  analysisError: string | null;
  isAnalyzing: boolean;
  fileName: string;
  resumeId: string | null;
  abortController: AbortController | null;
  startAnalysis: (file: File) => Promise<void>;
  resetAnalysis: () => void;
  abortAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  analysisResult: null,
  analysisError: null,
  isAnalyzing: false,
  fileName: "",
  resumeId: null,
  abortController: null,
  startAnalysis: async (file: File) => {
    // If already analyzing, do not start again
    if (get().isAnalyzing) return;

    // Reset previous state and create new AbortController
    const controller = new AbortController();
    set({
      analysisResult: null,
      analysisError: null,
      isAnalyzing: true,
      fileName: file.name,
      resumeId: null,
      abortController: controller
    });

    console.log("Calling /resume/analyze");
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal
      });

      console.log("Extraction and Analysis Result:", response.data);
      set({
        analysisResult: response.data?.data?.analysis,
        resumeId: response.data?.data?.resumeId,
        isAnalyzing: false,
        abortController: null
      });
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        console.log("Analysis request aborted");
        return;
      }
      console.error("Upload error during analysis:", error);
      const err = error as { response?: { data?: { error?: string } } };
      const errorMessage = err.response?.data?.error || "Failed to upload and analyze resume.";
      set({
        analysisError: errorMessage,
        isAnalyzing: false,
        abortController: null
      });
    }
  },
  resetAnalysis: () => set({
    analysisResult: null,
    analysisError: null,
    isAnalyzing: false,
    fileName: "",
    resumeId: null,
    abortController: null
  }),
  abortAnalysis: () => {
    const controller = get().abortController;
    if (controller) {
      controller.abort();
    }
    set({
      isAnalyzing: false,
      abortController: null
    });
  }
}));

import { create } from "zustand";

const useAnalysisStore = create((set) => ({
  analysisResult: null,
  setAnalysisResult: (data) => set({ analysisResult: data }),
  clearAnalysisResult: () => set({ analysisResult: null }),

  prompt: "",
  setPrompt: (text) => set({ prompt: text }),

  aiResponse: "",
  setAIResponse: (text) => set({ aiResponse: text }),
}));

export default useAnalysisStore;

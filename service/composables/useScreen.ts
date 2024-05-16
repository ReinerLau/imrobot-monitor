import type { ProjectData } from "~/types";

export const useScreen = () => {
  const screenDialogVisible = ref(false);

  const currentScreenInfo = ref<ProjectData>({
    token: "",
    name: "",
  });

  const showScreenDialog = (projectData: ProjectData) => {
    screenDialogVisible.value = true;
    currentScreenInfo.value = projectData;
  };

  return {
    screenDialogVisible,
    showScreenDialog,
    currentScreenInfo,
  };
};

export const useScreen = () => {
  const screenDialogVisible = ref(false);

  const showScreenDialog = () => {
    screenDialogVisible.value = true;
  };

  return {
    screenDialogVisible,
    showScreenDialog,
  };
};

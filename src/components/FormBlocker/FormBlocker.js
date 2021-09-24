import { useState, useCallback } from 'react';

export default function FormBlocker() {
  const [isReqInProgress, setIsReqInProgress] = useState(false);
  console.log(1);
  const blockForm = () => {
    setIsReqInProgress(true);
  };

  const unblockForm = () => {
    setIsReqInProgress(false);
  };

  const resetFormBlocker = useCallback(
    (newIsReqInProgress = false) => {
      setIsReqInProgress(newIsReqInProgress);
    },
    [setIsReqInProgress]
  );
  return { isReqInProgress, blockForm, unblockForm, resetFormBlocker };
}

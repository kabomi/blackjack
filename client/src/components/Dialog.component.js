import { useEffect, useRef } from 'react';
import './Dialog.component.css';

export const Dialog = ({ dataTestId, content, contentActions, showModal }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (showModal && dialogRef?.current) {
      dialogRef.current.showModal?.();
    }
  }, [showModal, dialogRef]);

  return  <dialog data-testid={dataTestId} ref={dialogRef}>
    {content}
    <form method="dialog">
      {contentActions}
    </form>
  </dialog>;
}


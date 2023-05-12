import {
  $,
  QwikMouseEvent,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';
import { DialogContext } from './types';

export const Root = component$(() => {
  const state = useStore({
    opened: false,
    dialogRef: useSignal<HTMLDialogElement>(),
  });

  const openDialog$ = $(() => {
    const dialog = state.dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot open the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.showModal();
    state.opened = true;
  });

  const closeDialog$ = $(() => {
    const dialog = state.dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot close the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.close();
    state.opened = false;
  });

  const closeOnDialogClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) =>
      hasBackdropBeenClicked(event) ? closeDialog$() : Promise.resolve()
  );

  const context: DialogContext = {
    state,

    open: openDialog$,
    close: closeDialog$,
    closeOnDialogClick: closeOnDialogClick$,
  };

  useContextProvider(dialogContext, context);

  return <Slot />;
});

function hasBackdropBeenClicked(
  event: QwikMouseEvent<HTMLDialogElement, MouseEvent>
) {
  const rect = (event.target as HTMLDialogElement).getBoundingClientRect();

  return (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  );
}

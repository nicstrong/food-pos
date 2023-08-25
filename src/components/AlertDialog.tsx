import {
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    AlertDialog as ChakraAlertDialog,
} from "@chakra-ui/react";
import { useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: (ok: boolean) => void;
  cancelText?: string;
  okText: string;
  heading: string;
  message: string;
};

export function AlertDialog({
  isOpen,
  onClose,
  heading,
  message,
  okText,
  cancelText,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => onClose(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose(false)}>
              {cancelText ?? "Cancel"}
            </Button>
            <Button colorScheme="red" onClick={() => onClose(true)} ml={3}>
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
}

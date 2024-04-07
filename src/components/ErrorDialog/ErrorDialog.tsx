import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
} from "@components";
import { CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ErrorDialogProps {
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  message,
  open,
  setOpen,
}) => {
  const { t } = useTranslation();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <CircleX className="w-20 h-20" color="red" />
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{t("close")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

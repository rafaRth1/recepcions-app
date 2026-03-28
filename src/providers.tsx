import { Toast } from "@heroui/react";

interface Props {
   children: React.ReactNode;
}

export function Providers({ children }: Props) {
   return (
      <>
         <Toast.Provider placement="top" />
         {children}
      </>
   );
}

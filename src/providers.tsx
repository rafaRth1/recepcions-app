import { HeroUIProvider, ToastProvider } from "@heroui/react";

interface Props {
   children: React.ReactNode;
}

export function Providers({ children }: Props) {
   return (
      <HeroUIProvider>
         <ToastProvider placement="top-center" />
         {children}
      </HeroUIProvider>
   );
}

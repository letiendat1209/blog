import { Navbar } from "@/components/client/navbar";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

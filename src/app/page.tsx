import Navbar from "@/components/Navbar";
import Body from "@/components/Body";
import { DesktopProvider } from "../utils/DesktopContext";

export default function Home() {
  return (
    <DesktopProvider>
      <div className="h-screen overflow-hidden flex flex-col">
        <div className="flex-1 m-4 p-4 border-[3px] border-black rounded-sm shadow-[6px_6px_0_#000] flex flex-col">
          <Navbar />
          <Body />
        </div>
      </div>
    </DesktopProvider>
  );
}

import { FC } from "react";

interface RecycleProps {
  showRecycleBin: (show: boolean) => void;
}

const Recycle: FC<RecycleProps> = ({ showRecycleBin }) => {
  return (
    <div className="w-[320px] bg-[#C0C0C0] border-[3px] border-black rounded-sm shadow-[4px_4px_0_0_#000] font-mono text-[13px]">
      {/* Top bar */}
      <div className="flex justify-between items-center bg-[#000080] text-white px-2 py-1 border-b border-black">
        <span className="font-bold">Home</span>
        <button
          className="bg-[#C0C0C0] text-black border border-black w-5 h-5 flex items-center justify-center leading-none font-bold hover:bg-white"
          onClick={() => showRecycleBin(false)}
        >
          ×
        </button>
      </div>

      {/* Body content */}
      <div className="bg-[#E0E0E0] p-3">
        <hr className="border-t border-black mb-2" />
        <p className="text-black">Recycle</p>
      </div>
    </div>
  );
};

export default Recycle;

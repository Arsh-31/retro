import { FC, ReactNode } from "react";

interface FolderProps {
  icon: ReactNode;
  name: string;
  onDoubleClick?: () => void;
}

const Folder: FC<FolderProps> = ({ icon, name, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center justify-center w-[80px] p-2 rounded-sm cursor-pointer select-none hover:bg-[#D0D0D0] transition-all duration-100 border border-transparent hover:border-black"
    >
      <div className="text-3xl mb-1">{icon}</div>
      <span className="text-center text-[13px] font-mono text-black shadow-sm leading-tight">
        {name}
      </span>
    </div>
  );
};

export default Folder;

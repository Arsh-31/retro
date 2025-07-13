"use client";
import { useDesktop, DesktopItem } from "../utils/DesktopContext";
import { useCallback, useState } from "react";

interface FoldersProps {
  parentId?: string | null;
  onFolderOpen?: (id: string, name: string) => void;
}

const Folders = ({ parentId = null }: FoldersProps) => {
  const { items, openFolder, openTextFile, renameItem, deleteItem } = useDesktop();
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Get children for this parent
  const getChildren = (parentId: string | null) => {
    if (!parentId) return items.filter(i => !i.parentId);
    const parent = items.find(i => i.id === parentId && i.type === "folder");
    return parent && parent.children ? parent.children : [];
  };
  const children = getChildren(parentId);

  const handleDoubleClick = useCallback((item: DesktopItem) => {
    if (item.type === "folder") {
      openFolder(item.id, item.name);
    } else if (item.type === "text") {
      openTextFile(item.id, item.name);
    }
  }, [openFolder, openTextFile]);

  const handleTextClick = (item: DesktopItem) => {
    setRenamingId(item.id);
    setRenameValue(item.name);
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value);
  };

  const handleRenameBlur = (id: string) => {
    if (renameValue.trim()) {
      renameItem(id, renameValue.trim());
    }
    setRenamingId(null);
  };

  const handleRenameKey = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      setRenamingId(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-6">
      {children.map((item: DesktopItem) => (
        <div
          key={item.id}
          className="flex flex-col items-center cursor-pointer w-20 relative group"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="w-12 h-12 flex items-center justify-center bg-gray-200 border border-gray-400 rounded-md mb-1"
            onDoubleClick={() => handleDoubleClick(item)}
          >
            {item.type === "folder" ? (
              <span role="img" aria-label="folder">📁</span>
            ) : (
              <span role="img" aria-label="text file">📄</span>
            )}
          </div>
          {renamingId === item.id ? (
            <input
              className="text-xs text-center break-all border border-gray-400 bg-white px-1 py-0.5 w-16 outline-none"
              value={renameValue}
              autoFocus
              onChange={handleRenameChange}
              onBlur={() => handleRenameBlur(item.id)}
              onKeyDown={e => handleRenameKey(e, item.id)}
              maxLength={32}
            />
          ) : (
            <span className="text-xs text-center break-all">
              <span onClick={() => handleTextClick(item)}>{item.name}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Folders;

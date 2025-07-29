"use client";
import { FC, useRef, useState } from "react";
import Folders from "./Folders";
import { DesktopProvider, useDesktop, OpenWindow, findNodeById } from "../utils/DesktopContext";

const FolderWindow = ({ id, name }: { id: string; name: string }) => {
  const { items, closeWindow, addFolder, addTextFile, openTextFile, renameItem, deleteItem } = useDesktop();
  const [currentFolderId, setCurrentFolderId] = useState(id);
  const [history, setHistory] = useState<string[]>([]);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const folder = findNodeById(items, currentFolderId);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  // Remove hovered state

  if (!folder) return null;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({ x: e.clientX, y: e.clientY });
  };
  const handleMenuClick = (action: "folder" | "text") => {
    // if (action === "folder") {
    //   addFolder(currentFolderId);
    // } else {
    if (action === "text") {
      addTextFile(currentFolderId);
    }
    setMenu(null);
  };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenu(null);
  };
  const handleDoubleClick = (item: any) => {
    if (item.type === "folder") {
      setHistory(h => [...h, currentFolderId]);
      setCurrentFolderId(item.id);
    } else if (item.type === "text") {
      openTextFile(item.id, item.name);
    }
  };
  const handleBack = () => {
    setCurrentFolderId(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
  };
  const handleRename = () => {
    setRenaming(true);
    setRenameValue(folder.name);
  };
  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value);
  };
  const handleRenameBlur = () => {
    if (renameValue.trim()) {
      renameItem(currentFolderId, renameValue.trim());
    }
    setRenaming(false);
  };
  const handleRenameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      setRenaming(false);
    }
  };
  const handleDelete = () => {
    deleteItem(currentFolderId);
    closeWindow(id);
  };

  return (
    <div className="fixed top-32 left-32 w-80 h-60 bg-white border border-gray-700 shadow-lg z-50 flex flex-col"
      onContextMenu={handleContextMenu} onClick={handleClick}>
      <div className="flex items-center justify-between bg-gray-200 px-2 py-1 border-b border-gray-400">
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button className="text-xs px-2 py-0.5 bg-gray-300 hover:bg-gray-400 rounded" onClick={handleBack}>
              ← Back
            </button>
          )}
          {renaming ? (
            <input
              className="text-xs text-center break-all border border-gray-400 bg-white px-1 py-0.5 w-24 outline-none"
              value={renameValue}
              autoFocus
              onChange={handleRenameChange}
              onBlur={handleRenameBlur}
              onKeyDown={handleRenameKey}
              maxLength={32}
            />
          ) : (
            <span className="font-bold text-sm flex items-center gap-1">
              {folder.name}
              {/* Always show icons, not just on hover */}
              <span
                className="ml-1 cursor-pointer"
                title="Rename"
                onClick={handleRename}
              >
                ✏️
              </span>
              <span
                className="ml-1 cursor-pointer"
                title="Delete"
                onClick={handleDelete}
              >
                🗑️
              </span>
            </span>
          )}
        </div>
        <button className="text-xs px-2 py-0.5 bg-red-400 hover:bg-red-600 text-white rounded" onClick={() => closeWindow(id)}>
          X
        </button>
      </div>
      <div className="flex-1 p-2 overflow-auto">
        <Folders parentId={currentFolderId} onFolderOpen={(id, name) => {
          setHistory(h => [...h, currentFolderId]);
          setCurrentFolderId(id);
        }} />
        {menu && (
          <ul
            className="absolute bg-white border border-gray-400 shadow-lg z-50 text-sm"
            style={{ top: menu.y, left: menu.x, minWidth: 140 }}
          >
            {/*
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleMenuClick("folder")}
            >
              New Folder
            </li>
            */}
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleMenuClick("text")}
            >
              New Text File
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

const NotepadWindow = ({ id, name }: { id: string; name: string }) => {
  const { items, closeWindow, saveTextFile, renameItem, deleteItem } = useDesktop();
  const file = items.find(i => i.id === id);
  const [value, setValue] = useState(file?.content || "");
  const [saved, setSaved] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(file?.name || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    saveTextFile(id, value);
    setSaved(true);
  };

  const handleRename = () => {
    setRenaming(true);
    setRenameValue(file?.name || "");
  };
  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value);
  };
  const handleRenameBlur = () => {
    if (renameValue.trim()) {
      renameItem(id, renameValue.trim());
    }
    setRenaming(false);
  };
  const handleRenameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      setRenaming(false);
    }
  };
  const handleDelete = () => {
    deleteItem(id);
    closeWindow(id);
  };

  return (
    <div className="fixed top-32 left-32 w-96 h-72 bg-white border border-gray-700 shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between bg-blue-200 px-2 py-1 border-b border-gray-400">
        <span className="font-bold text-sm flex items-center gap-1">
          {renaming ? (
            <input
              className="text-xs text-center break-all border border-gray-400 bg-white px-1 py-0.5 w-32 outline-none"
              value={renameValue}
              autoFocus
              onChange={handleRenameChange}
              onBlur={handleRenameBlur}
              onKeyDown={handleRenameKey}
              maxLength={32}
            />
          ) : (
            <>
              {file?.name}
              <span
                className="ml-1 cursor-pointer"
                title="Rename"
                onClick={handleRename}
              >
                ✏️
              </span>
              <span
                className="ml-1 cursor-pointer"
                title="Delete"
                onClick={handleDelete}
              >
                🗑️
              </span>
            </>
          )}
        </span>
        <button className="text-xs px-2 py-0.5 bg-red-400 hover:bg-red-600 text-white rounded" onClick={() => closeWindow(id)}>
          X
        </button>
      </div>
      <textarea
        className="flex-1 p-2 font-mono text-sm outline-none resize-none"
        value={value}
        onChange={handleChange}
        spellCheck={false}
      />
      <div className="flex justify-end p-2 border-t border-gray-300 bg-gray-50">
        <button
          className={`px-3 py-1 rounded text-white ${saved ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
          onClick={handleSave}
          disabled={saved}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const MusicPlayerWindow = ({ id, name }: { id: string; name: string }) => {
  const { items, closeWindow, renameItem, deleteItem } = useDesktop();
  const file = items.find(i => i.id === id);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(file?.name || "");

  // Extract YouTube and Spotify links from content
  const content = file?.content || "";
  const youtubeMatch = content.match(/https?:\/\/(www\.)?youtube\.com\/watch\?v=[^\s\\n]+/);
  const spotifyMatch = content.match(/https?:\/\/(open\.)?spotify\.com\/track\/[^\s\\n]+/);
  const youtubeUrl = youtubeMatch ? youtubeMatch[0] : null;
  const spotifyUrl = spotifyMatch ? spotifyMatch[0] : null;

  // Convert YouTube link to embed
  let youtubeEmbed = null;
  if (youtubeUrl) {
    const videoId = youtubeUrl.split("v=")[1];
    youtubeEmbed = `https://www.youtube.com/embed/${videoId}`;
  }

  const handleRename = () => {
    setRenaming(true);
    setRenameValue(file?.name || "");
  };
  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value);
  };
  const handleRenameBlur = () => {
    if (renameValue.trim()) {
      renameItem(id, renameValue.trim());
    }
    setRenaming(false);
  };
  const handleRenameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      setRenaming(false);
    }
  };
  const handleDelete = () => {
    deleteItem(id);
    closeWindow(id);
  };

  return (
    <div className="fixed top-40 left-40 w-96 h-80 bg-[#F0F0F0] border-[3px] border-black rounded-sm shadow-[4px_4px_0_0_#000] z-50 flex flex-col font-mono">
      <div className="flex items-center justify-between bg-[#000080] text-white px-2 py-1 border-b border-black">
        <span className="font-bold text-sm flex items-center gap-1">
          {renaming ? (
            <input
              className="text-xs text-center break-all border border-gray-400 bg-white px-1 py-0.5 w-32 outline-none"
              value={renameValue}
              autoFocus
              onChange={handleRenameChange}
              onBlur={handleRenameBlur}
              onKeyDown={handleRenameKey}
              maxLength={32}
            />
          ) : (
            <>
              <span role="img" aria-label="music">🎵</span> {file?.name}
              <span className="ml-1 cursor-pointer" title="Rename" onClick={handleRename}>✏️</span>
              <span className="ml-1 cursor-pointer" title="Delete" onClick={handleDelete}>🗑️</span>
            </>
          )}
        </span>
        <button className="text-xs px-2 py-0.5 bg-red-400 hover:bg-red-600 text-white rounded" onClick={() => closeWindow(id)}>
          X
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
        {youtubeEmbed && (
          <iframe
            width="280"
            height="158"
            src={youtubeEmbed}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border border-black shadow"
          />
        )}
        {spotifyUrl && (
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-green-600 text-white rounded font-bold text-xs border border-black shadow hover:bg-green-700"
          >
            ▶️ Play on Spotify
          </a>
        )}
        {!youtubeEmbed && !spotifyUrl && (
          <div className="text-center text-gray-700">No playable link found.<br />{content}</div>
        )}
      </div>
    </div>
  );
};

const DesktopArea = () => {
  const { addFolder, addTextFile, openWindows, items } = useDesktop();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  };

  const handleMenuClick = (action: "folder" | "text") => {
    // if (action === "folder") {
    //   addFolder();
    // } else {
    if (action === "text") {
      addTextFile();
    }
    setMenu(null);
  };

  const handleClick = () => setMenu(null);

  return (
    <div
      ref={areaRef}
      className="p-4 mt-2 h-[calc(100%-60px)] overflow-auto relative select-none"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      style={{ minHeight: 400 }}
    >
      {/* Render children (folders, files, etc.) */}
      <Folders parentId={null} />
      {menu && (
        <ul
          className="absolute bg-white border border-gray-400 shadow-lg z-50 text-sm"
          style={{ top: menu.y, left: menu.x, minWidth: 140 }}
        >
          {/*
          <li
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleMenuClick("folder")}
          >
            New Folder
          </li>
          */}
          <li
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleMenuClick("text")}
          >
            New Text File
          </li>
        </ul>
      )}
      {/* Render open folder and notepad windows */}
      {openWindows.map((win: OpenWindow) => {
        const item = items.find(i => i.id === win.id);
        // Use regex to detect YouTube or Spotify links in the content, ignoring case and newlines
        const isSong = item?.type === "text" &&
          (item.content &&
            (/https?:\/\/(www\.)?youtube\.com\/watch\?v=[^\s]+/i.test(item.content) ||
             /https?:\/\/(open\.)?spotify\.com\/track\/[^\s]+/i.test(item.content)));
        if (isSong) {
          return <MusicPlayerWindow key={win.id} id={win.id} name={win.name} />;
        } else if (item?.type === "folder") {
          return <FolderWindow key={win.id} id={win.id} name={win.name} />;
        } else if (item?.type === "text") {
          return <NotepadWindow key={win.id} id={win.id} name={win.name} />;
        }
        return null;
      })}
    </div>
  );
};

const Body: FC = () => {
  return <DesktopArea />;
};

export default Body;

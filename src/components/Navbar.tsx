"use client";

import Time from "./Time";
import { useDesktop } from "../utils/DesktopContext";
import { findNodeById, DesktopItem } from "../utils/DesktopContext";
import { useMemo } from "react";

function getPath(items: DesktopItem[], id: string): string[] {
  const path: string[] = [];
  let node: DesktopItem | undefined = findNodeById(items, id);
  while (node) {
    path.unshift(node.name);
    node = node.parentId ? findNodeById(items, node.parentId) : undefined;
  }
  return path;
}

function Navbar() {
  const { openWindows, items } = useDesktop();
  // Show path for the last opened folder window, or 'Desktop' if none
  const currentFolderId =
    openWindows.length > 0 ? openWindows[openWindows.length - 1].id : null;
  const path = useMemo(
    () => (currentFolderId ? getPath(items, currentFolderId) : ["Desktop"]),
    [items, currentFolderId]
  );

  return (
    <div className="flex justify-between items-center border-[3px] border-black rounded-sm shadow-[3px_3px_0_0_#000] px-3 py-2 font-mono text-sm select-none bg-[#C0C0C0]">
      <div className="flex gap-4 items-center">
        <div className="text-lg font-bold">☯︎</div>
        <div className="text-base font-bold">Arsh</div>
        <div className="ml-4 text-xs text-black/80">{path.join(" / ")}</div>
      </div>
      <div className="text-black px-2 py-1">
        <Time />
        <div>another one</div>
        <p>This doesn't work</p>
      </div>
    </div>
  );
}

export default Navbar;

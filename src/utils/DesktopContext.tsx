"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type DesktopItem = {
  id: string;
  type: "folder" | "text";
  name: string;
  content?: string; // Only for text files
  children?: DesktopItem[]; // Only for folders
  parentId?: string | null; // null for root
};

export type OpenWindow = {
  id: string;
  name: string;
};

interface DesktopContextType {
  items: DesktopItem[];
  openWindows: OpenWindow[];
  addFolder: (parentId?: string | null) => void;
  addTextFile: (parentId?: string | null) => void;
  openFolder: (id: string, name: string) => void;
  closeWindow: (id: string) => void;
  openTextFile: (id: string, name: string) => void;
  saveTextFile: (id: string, content: string) => void;
  renameItem: (id: string, newName: string) => void;
  deleteItem: (id: string) => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export const DesktopProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<DesktopItem[]>([
    {
      id: "songs-folder",
      type: "folder",
      name: "Songs",
      children: [
        {
          id: "song-1",
          type: "text",
          name: "Bohemian Rhapsody.txt",
          content: "Is this the real life? Is this just fantasy?",
          parentId: "songs-folder",
        },
        {
          id: "song-2",
          type: "text",
          name: "Stairway to Heaven.txt",
          content: "There's a lady who's sure all that glitters is gold...",
          parentId: "songs-folder",
        },
        {
          id: "song-3",
          type: "text",
          name: "Imagine.txt",
          content: "Imagine all the people living life in peace...",
          parentId: "songs-folder",
        },
      ],
      parentId: null,
    },
    {
      id: "games-folder",
      type: "folder",
      name: "Games",
      children: [
        {
          id: "game-1",
          type: "text",
          name: "Minesweeper.txt",
          content: "Classic logic puzzle game. Avoid the mines!",
          parentId: "games-folder",
        },
        {
          id: "game-2",
          type: "text",
          name: "Snake.txt",
          content: "Eat the apples, grow the snake, don't hit the wall!",
          parentId: "games-folder",
        },
        {
          id: "game-3",
          type: "text",
          name: "Tetris.txt",
          content: "Arrange the blocks to clear lines. Classic!",
          parentId: "games-folder",
        },
      ],
      parentId: null,
    },
  ]);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);

  const addFolder = (parentId: string | null = null) => {
    const name = `New Folder ${getNextIndex(items, parentId, "folder")}`;
    const id = `${Date.now()}-folder`;
    const newFolder: DesktopItem = { id, type: "folder", name, children: [], parentId };
    setItems(items => addItemToTree(items, newFolder, parentId));
  };

  const addTextFile = (parentId: string | null = null) => {
    const name = `New Text File ${getNextIndex(items, parentId, "text")}.txt`;
    const id = `${Date.now()}-text`;
    const newFile: DesktopItem = { id, type: "text", name, content: "", parentId };
    setItems(items => addItemToTree(items, newFile, parentId));
  };

  const openFolder = (id: string, name: string) => {
    if (!openWindows.find(w => w.id === id)) {
      setOpenWindows([...openWindows, { id, name }]);
    }
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const openTextFile = (id: string, name: string) => {
    if (!openWindows.find(w => w.id === id)) {
      setOpenWindows([...openWindows, { id, name }]);
    }
  };

  const saveTextFile = (id: string, content: string) => {
    setItems(items => items.map(item => item.id === id ? { ...item, content } : item));
  };

  const renameItem = (id: string, newName: string) => {
    setItems(items => renameItemInTree(items, id, newName));
  };

  const deleteItem = (id: string) => {
    setItems(items => deleteItemFromTree(items, id));
  };

  return (
    <DesktopContext.Provider value={{ items, openWindows, addFolder, addTextFile, openFolder, closeWindow, openTextFile, saveTextFile, renameItem, deleteItem }}>
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = () => {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
};

// Helper to add item to tree
function addItemToTree(tree: DesktopItem[], item: DesktopItem, parentId: string | null): DesktopItem[] {
  if (!parentId) return [...tree, item];
  return tree.map(node => {
    if (node.id === parentId && node.type === "folder") {
      return { ...node, children: node.children ? [...node.children, item] : [item] };
    } else if (node.type === "folder" && node.children) {
      return { ...node, children: addItemToTree(node.children, item, parentId) };
    }
    return node;
  });
}
// Helper to get next index for naming
function getNextIndex(tree: DesktopItem[], parentId: string | null, type: "folder" | "text"): number {
  let arr: DesktopItem[] = parentId ? findNodeById(tree, parentId)?.children || [] : tree;
  return (arr.filter(i => i.type === type).length + 1);
}

export function findNodeById(tree: DesktopItem[], id: string): DesktopItem | undefined {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.type === "folder" && node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

// Helper to rename item in tree
function renameItemInTree(tree: DesktopItem[], id: string, newName: string): DesktopItem[] {
  return tree.map(node => {
    if (node.id === id) {
      return { ...node, name: newName };
    } else if (node.type === "folder" && node.children) {
      return { ...node, children: renameItemInTree(node.children, id, newName) };
    }
    return node;
  });
}

// Helper to delete item from tree
function deleteItemFromTree(tree: DesktopItem[], id: string): DesktopItem[] {
  return tree.filter(node => node.id !== id).map(node => {
    if (node.type === "folder" && node.children) {
      return { ...node, children: deleteItemFromTree(node.children, id) };
    }
    return node;
  });
} 
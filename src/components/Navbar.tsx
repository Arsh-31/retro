import Time from "./Time";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div>☾</div>
        <div className="flex gap-2">
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className="MenubarItem">
                  New Tab <div className="RightSlot">⌘ T</div>
                </MenubarItem>
                <MenubarItem className="MenubarItem">
                  New Window <div className="RightSlot">⌘ N</div>
                </MenubarItem>
                <MenubarItem className="MenubarItem" disabled>
                  New Incognito Window
                </MenubarItem>
                <MenubarSeparator className="MenubarSeparator" />
                <MenubarSub>
                  <MenubarSubTrigger className="MenubarSubTrigger">
                    Share
                    <div className="RightSlot">
                      <ChevronRightIcon />
                    </div>
                  </MenubarSubTrigger>
                  <MenubarPortal>
                    <MenubarSubContent
                      className="MenubarSubContent"
                      alignOffset={-5}
                    >
                      <MenubarItem className="MenubarItem">
                        Email Link
                      </MenubarItem>
                      <MenubarItem className="MenubarItem">
                        Messages
                      </MenubarItem>
                      <MenubarItem className="MenubarItem">Notes</MenubarItem>
                    </MenubarSubContent>
                  </MenubarPortal>
                </MenubarSub>
                <MenubarSeparator className="MenubarSeparator" />
                <MenubarItem className="MenubarItem">
                  Print… <div className="RightSlot">⌘ P</div>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className="MenubarItem">
                  Undo <div className="RightSlot">⌘ Z</div>
                </MenubarItem>
                <MenubarItem className="MenubarItem">
                  Redo <div className="RightSlot">⇧ ⌘ Z</div>
                </MenubarItem>
                <MenubarSeparator className="MenubarSeparator" />
                <MenubarSub>
                  <MenubarSubTrigger className="MenubarSubTrigger">
                    Find
                    <div className="RightSlot">
                      <ChevronRightIcon />
                    </div>
                  </MenubarSubTrigger>

                  <MenubarPortal>
                    <MenubarSubContent
                      className="MenubarSubContent"
                      alignOffset={-5}
                    >
                      <MenubarItem className="MenubarItem">
                        Search the web…
                      </MenubarItem>
                      <MenubarSeparator className="MenubarSeparator" />
                      <MenubarItem className="MenubarItem">Find…</MenubarItem>
                      <MenubarItem className="MenubarItem">
                        Find Next
                      </MenubarItem>
                      <MenubarItem className="MenubarItem">
                        Find Previous
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarPortal>
                </MenubarSub>
                <MenubarSeparator className="MenubarSeparator" />
                <MenubarItem className="MenubarItem">Cut</MenubarItem>
                <MenubarItem className="MenubarItem">Copy</MenubarItem>
                <MenubarItem className="MenubarItem">Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Menubar className="border-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  View <MenubarShortcut>⌘V</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div>
        <Time />
      </div>
    </div>
  );
}

export default Navbar;

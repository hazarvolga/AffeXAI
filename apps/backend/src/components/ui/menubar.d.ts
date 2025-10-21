import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
declare function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>): JSX.Element;
declare function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>): JSX.Element;
declare function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>): JSX.Element;
declare function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>): JSX.Element;
declare function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>): JSX.Element;
declare const Menubar: any;
declare const MenubarTrigger: any;
declare const MenubarSubTrigger: any;
declare const MenubarSubContent: any;
declare const MenubarContent: any;
declare const MenubarItem: any;
declare const MenubarCheckboxItem: any;
declare const MenubarRadioItem: any;
declare const MenubarLabel: any;
declare const MenubarSeparator: any;
declare const MenubarShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;
    displayname: string;
};
export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal, MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut, };
//# sourceMappingURL=menubar.d.ts.map
import { Component } from '@/lib/cms/cms-service';
export declare class ComponentFactory {
    static createComponent(type: Component['type'], customProps?: Record<string, any>): Component;
    static createBlockComponent(blockId: string, customProps?: Record<string, any>): Component;
    static createTextComponent(content: string, customProps?: Record<string, any>): Component;
    static createButtonComponent(text: string, customProps?: Record<string, any>): Component;
    static createImageComponent(src: string, alt: string, customProps?: Record<string, any>): Component;
    static createContainerComponent(customProps?: Record<string, any>): Component;
    static createCardComponent(customProps?: Record<string, any>): Component;
    static createGridComponent(columns: number, customProps?: Record<string, any>): Component;
    static cloneComponent(component: Component): Component;
    static createFromTemplate(template: Partial<Component>): Component;
}
export default ComponentFactory;
//# sourceMappingURL=component-factory.d.ts.map
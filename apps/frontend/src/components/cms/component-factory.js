"use strict";
// Component Factory
// Factory pattern for creating new CMS components
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentFactory = void 0;
const uuid_1 = require("uuid");
// Default props for each component type
const defaultComponentProps = {
    text: {
        content: 'New text component',
        variant: 'body',
        align: 'left',
    },
    button: {
        text: 'Click me',
        variant: 'default',
        size: 'default',
    },
    image: {
        src: '/placeholder-image.jpg',
        alt: 'Placeholder image',
    },
    container: {
        padding: 'md',
        background: 'none',
    },
    card: {
        padding: 'md',
        rounded: 'lg',
    },
    grid: {
        columns: 3,
        gap: 'md',
    },
    block: {
        blockId: '',
        className: 'w-full',
    }
};
// Factory class for creating components
class ComponentFactory {
    static createComponent(type, customProps = {}) {
        // Generate a unique ID for the component
        const id = `comp-${(0, uuid_1.v4)()}`;
        // Get default props for the component type
        const defaultProps = defaultComponentProps[type] || {};
        // Merge default props with custom props
        const props = { ...defaultProps, ...customProps };
        // Create the component object
        const component = {
            id,
            pageId: '',
            parentId: null,
            type,
            props,
            orderIndex: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        return component;
    }
    static createBlockComponent(blockId, customProps = {}) {
        return this.createComponent('block', {
            blockId,
            ...customProps
        });
    }
    static createTextComponent(content, customProps = {}) {
        return this.createComponent('text', {
            content,
            ...customProps
        });
    }
    static createButtonComponent(text, customProps = {}) {
        return this.createComponent('button', {
            text,
            ...customProps
        });
    }
    static createImageComponent(src, alt, customProps = {}) {
        return this.createComponent('image', {
            src,
            alt,
            ...customProps
        });
    }
    static createContainerComponent(customProps = {}) {
        return this.createComponent('container', customProps);
    }
    static createCardComponent(customProps = {}) {
        return this.createComponent('card', customProps);
    }
    static createGridComponent(columns, customProps = {}) {
        return this.createComponent('grid', {
            columns,
            ...customProps
        });
    }
    // Clone an existing component with a new ID
    static cloneComponent(component) {
        const clonedComponent = { ...component };
        clonedComponent.id = `comp-${(0, uuid_1.v4)()}`;
        clonedComponent.createdAt = new Date().toISOString();
        clonedComponent.updatedAt = new Date().toISOString();
        return clonedComponent;
    }
    // Create a component from a template
    static createFromTemplate(template) {
        const component = {
            id: `comp-${(0, uuid_1.v4)()}`,
            pageId: '',
            parentId: null,
            type: 'text',
            props: {},
            orderIndex: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...template
        };
        // Ensure required fields are present
        if (!component.type)
            component.type = 'text';
        if (!component.props)
            component.props = {};
        return component;
    }
}
exports.ComponentFactory = ComponentFactory;
exports.default = ComponentFactory;
//# sourceMappingURL=component-factory.js.map
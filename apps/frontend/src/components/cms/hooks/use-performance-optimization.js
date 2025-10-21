"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePerformanceOptimization = void 0;
const react_1 = require("react");
// Hook for performance optimization in the CMS
const usePerformanceOptimization = () => {
    // Memoize component rendering to prevent unnecessary re-renders
    const useMemoizedComponents = (components) => {
        return (0, react_1.useMemo)(() => {
            return components.map(component => {
                // Create a stable key for each component
                const key = `${component.id}-${component.type}-${JSON.stringify(component.props)}`;
                return {
                    ...component,
                    _stableKey: key
                };
            });
        }, [components]);
    };
    // Memoize layout options to prevent unnecessary re-renders
    const useMemoizedLayoutOptions = (layoutOptions) => {
        return (0, react_1.useMemo)(() => {
            return { ...layoutOptions };
        }, [JSON.stringify(layoutOptions)]);
    };
    // Callback for efficient component rendering
    const renderComponentCallback = (0, react_1.useCallback)((component) => {
        // This would be implemented in the renderer component
        return component;
    }, []);
    // Function to determine if a component should be rendered
    const shouldRenderComponent = (component, viewportWidth) => {
        // Check if component has viewport constraints
        if (component.props.viewportConstraints) {
            const { minWidth, maxWidth } = component.props.viewportConstraints;
            if (minWidth && viewportWidth < minWidth) {
                return false;
            }
            if (maxWidth && viewportWidth > maxWidth) {
                return false;
            }
        }
        return true;
    };
    // Function to apply code splitting based on component type
    const getCodeSplittingConfig = (componentType) => {
        // Define which components should be lazy loaded
        const lazyComponents = ['hero', 'gallery', 'ecommerce', 'blog'];
        return {
            isLazy: lazyComponents.some(lazyType => componentType.includes(lazyType)),
            priority: lazyComponents.indexOf(componentType) === -1 ? 'high' : 'low'
        };
    };
    // Function to apply memoization to component props
    const useMemoizedProps = (props) => {
        return (0, react_1.useMemo)(() => {
            return { ...props };
        }, [JSON.stringify(props)]);
    };
    // Function to determine if component should use virtualization
    const shouldVirtualize = (component, parentContainer) => {
        // Virtualize components that are part of large lists or grids
        if (component.type === 'grid' && component.props.items && component.props.items.length > 50) {
            return true;
        }
        // Virtualize components in containers with many children
        if (parentContainer && parentContainer.children && parentContainer.children.length > 30) {
            return true;
        }
        return false;
    };
    return {
        useMemoizedComponents,
        useMemoizedLayoutOptions,
        renderComponentCallback,
        shouldRenderComponent,
        getCodeSplittingConfig,
        useMemoizedProps,
        shouldVirtualize
    };
};
exports.usePerformanceOptimization = usePerformanceOptimization;
//# sourceMappingURL=use-performance-optimization.js.map
import React from 'react';
interface HistoryItem {
    components: any[];
    timestamp: number;
}
interface HistoryPanelProps {
    history: HistoryItem[];
    currentIndex: number;
    onHistorySelect: (index: number) => void;
}
export declare const HistoryPanel: React.FC<HistoryPanelProps>;
export default HistoryPanel;
//# sourceMappingURL=history-panel.d.ts.map
import React from 'react';
interface VideoComponentProps {
    id?: string;
    src?: string;
    poster?: string;
    title?: string;
    caption?: string;
    width?: number | string;
    height?: number | string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
}
export declare const VideoComponent: React.FC<VideoComponentProps>;
export default VideoComponent;
//# sourceMappingURL=video-component.d.ts.map
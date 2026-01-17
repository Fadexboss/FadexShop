import { useState, useRef, useCallback, useEffect } from 'react';
import './ImageZoom.css';

function ImageZoom({ src, alt }) {
    const [showZoom, setShowZoom] = useState(false);
    const containerRef = useRef(null);
    const lensRef = useRef(null);
    const previewRef = useRef(null);
    const rafRef = useRef(null);
    const containerRectRef = useRef(null);

    const zoomLevel = 2.5; // Zoom magnification level
    const lensSize = 150; // Lens size in pixels

    // Cache container dimensions on mouse enter
    const cacheContainerRect = useCallback(() => {
        if (containerRef.current) {
            containerRectRef.current = containerRef.current.getBoundingClientRect();
        }
    }, []);

    const handleMouseMove = useCallback((e) => {
        // Cancel previous animation frame
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            const rect = containerRectRef.current;
            if (!rect || !lensRef.current || !previewRef.current) return;

            // Mouse position relative to container
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            // Constrain lens position within bounds
            const halfLens = lensSize / 2;
            x = Math.max(halfLens, Math.min(x, rect.width - halfLens));
            y = Math.max(halfLens, Math.min(y, rect.height - halfLens));

            // Update lens position directly via DOM (bypass React state)
            lensRef.current.style.transform = `translate(${x - halfLens}px, ${y - halfLens}px)`;

            // Calculate percentage position (0-100)
            // This works correctly with background-size: cover on both sides
            const zoomX = (x / rect.width) * 100;
            const zoomY = (y / rect.height) * 100;
            previewRef.current.style.backgroundPosition = `${zoomX}% ${zoomY}%`;
        });
    }, []);

    const handleMouseEnter = useCallback(() => {
        cacheContainerRect();
        setShowZoom(true);
    }, [cacheContainerRect]);

    const handleMouseLeave = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        setShowZoom(false);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    // Update container rect on window resize
    useEffect(() => {
        const handleResize = () => {
            if (showZoom) {
                cacheContainerRect();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showZoom, cacheContainerRect]);

    return (
        <div className="image-zoom-container">
            <div
                ref={containerRef}
                className="zoom-image-wrapper"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Main image using background for consistent cover behavior */}
                <div
                    className="zoom-base-image"
                    style={{ backgroundImage: `url(${src})` }}
                    role="img"
                    aria-label={alt}
                />

                {/* Lens overlay */}
                {showZoom && (
                    <div
                        ref={lensRef}
                        className="zoom-lens"
                        style={{
                            width: lensSize,
                            height: lensSize,
                        }}
                    />
                )}
            </div>

            {/* Zoom preview window */}
            {showZoom && (
                <div className="zoom-preview">
                    <div
                        ref={previewRef}
                        className="zoom-preview-image"
                        style={{
                            backgroundImage: `url(${src})`,
                            backgroundSize: `${zoomLevel * 100}%`
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ImageZoom;


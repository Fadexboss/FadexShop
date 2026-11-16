import { useState } from 'react';
import './ImageZoom.css';
export default function ImageZoom({ src, alt }) {
    const [position, setPosition] = useState({x:50,y:50});
    const [zoomed, setZoomed] = useState(false);
    return <div className="image-zoom-container"><div className={`zoom-image-wrapper ${zoomed ? 'is-zoomed' : ''}`} onMouseMove={event => { const rect = event.currentTarget.getBoundingClientRect(); setPosition({x: (event.clientX-rect.left)/rect.width*100, y: (event.clientY-rect.top)/rect.height*100}); }} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)}><img src={src} alt={alt} className="zoom-base-image" width="960" height="1200" style={{transformOrigin:`${position.x}% ${position.y}%`}}/></div></div>;
}

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fadexshop-motion';
function readPreference() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === 'full' || saved === 'reduced' ? saved : 'auto';
    } catch { return 'auto'; }
}

export default function useMotionPreference() {
    const [preference, setPreference] = useState(readPreference);
    const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const motionEnabled = preference === 'full' || (preference === 'auto' && !systemReduced);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = event => setSystemReduced(event.matches);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        document.documentElement.dataset.motion = motionEnabled ? 'full' : 'reduced';
    }, [motionEnabled]);

    const toggleMotion = () => {
        const next = motionEnabled ? 'reduced' : 'full';
        setPreference(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* The preference still works for this visit. */ }
    };
    return { motionEnabled, toggleMotion };
}

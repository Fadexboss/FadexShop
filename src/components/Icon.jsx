export default function Icon({ name, size = 20, ...props }) {
    const paths = {
        bag: <><path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
        arrow: <path d="M4 12h16M14 6l6 6-6 6"/>,
        plus: <path d="M12 5v14M5 12h14"/>,
        pause: <><path d="M9 5v14M15 5v14" strokeWidth="2.5"/></>,
        play: <path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>,
        chevronUp: <path d="m6 15 6-6 6 6"/>,
        chevronDown: <path d="m6 9 6 6 6-6"/>,
        check: <path d="m5 12 4 4L19 6"/>,
        truck: <><path d="M3 6h11v12H3zM14 10h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></>,
        return: <path d="m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12h-3"/>,
        shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/></>,
        mail: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/></>,
        filter: <><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/></>,
        close: <path d="m6 6 12 12M6 18 18 6"/>,
        heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
        fabric: <path d="m7 3-5 4 3 5 2-1v10h10V11l2 1 3-5-5-4-3 2h-4L7 3Z"/>,
        chat: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 0 1 19 0Z"/>,
    };
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

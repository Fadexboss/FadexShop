import './PageHeader.css';
export default function PageHeader({ title, subtitle, backgroundImage }) {
    return <header className="page-header-premium" style={{backgroundImage: `url(${backgroundImage || '/images/editorial-studio.webp'})`}}>
        <div className="header-overlay"/>
        <div className="container header-content"><span className="eyebrow">FADEXSHOP / THE EVERYDAY EDIT</span><h1 className="header-title">{title}</h1>{subtitle && <p className="header-subtitle">{subtitle}</p>}</div>
    </header>;
}

import Icon from './Icon';

export default function PriceInput({ id, label, value, onChange, placeholder, name }) {
    const step = amount => onChange(String(Math.max(0, (Number(value) || 0) + amount)));
    return (
        <div className="price-input-group">
            <label htmlFor={id}>{label}</label>
            <div className="price-number-field">
                <input
                    id={id}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder={placeholder}
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    onKeyDown={event => {
                        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                            event.preventDefault();
                            step(event.key === 'ArrowUp' ? 50 : -50);
                        }
                    }}
                />
                <div className="price-steppers">
                    <button type="button" className="price-step" aria-label={`${name} fiyatı artır`} onClick={() => step(50)}><Icon name="chevronUp" size={12}/></button>
                    <button type="button" className="price-step" aria-label={`${name} fiyatı azalt`} disabled={value === '' || Number(value) <= 0} onClick={() => step(-50)}><Icon name="chevronDown" size={12}/></button>
                </div>
            </div>
        </div>
    );
}

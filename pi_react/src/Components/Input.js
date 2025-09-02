function Input({

    type,
    placeholder,
    onChange,
    className,
    label,
    objeto, 
    campo
    }) {
    return (
        <>
            { label &&
                (
             <label>{label} :</label>
            )}

            <input 
            value={objeto[campo]}
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange({...objeto, [campo]: e.target.value})}
            className={className}
            
            
            
            />
                
        </>
    );
}

export {Input};
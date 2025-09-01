function Input({
    type,
    placeholder,
    onchange,
    className,
    label,
    objeto,
    campo
}){

    
    return(
        <>
            {label && (
                <label> {label} :</label>
            )}

            <input type={type} placeholder={placeholder} className={className} onchange={(e) => onchange({... objeto, [campo]: e.value})}/>
        </>
    )
}

export {Input}
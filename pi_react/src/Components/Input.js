function Input({
    type,
    placeholder,
    onChange,
    label,
    objeto, 
    campo
    }) {

    return (
            <label>
              {label}
              <input
                type={type}
                placeholder={placeholder}
                value={objeto[campo] || ""}
                onChange={(e) => onChange({ ...objeto, [campo]: e.target.value })}
              />
            </label>
    );

}

export {Input};
// src/Components/Input.jsx

export function Input({ type, placeholder, onChange, objeto, campo, value, min, max }) {
    const handleChange = (e) => {
      const val = e.target.value;
  
      if (objeto && campo) {
        // Atualiza um campo dentro de um objeto (ex: categorie.name)
        onChange(prev => ({ ...prev, [campo]: val }));
      } else {
        // Atualiza um valor simples (ex: month ou year)
        onChange(val);
      }
    };
  
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={objeto && campo ? objeto[campo] : value || ''}
        onChange={handleChange}
        min={min}
        max={max}
      />
    );
  }
  
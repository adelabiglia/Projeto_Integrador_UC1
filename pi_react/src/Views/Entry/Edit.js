import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';

const supabaseUrl = "https://kvuxqtwfmqnookboncos.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g";
const supabase = createClient(supabaseUrl, supabaseKey);

function Entry() {
  const { id } = useParams();
  const nav = useNavigate();

  const [entry, setEntry] = useState({
    date: "",
    description: "",
    value: "",
    category_id: "",
    user_id: "",
  });

  const [categories, setCategories] = useState([]); // Armazenar categorias aqui
  const [loading, setLoading] = useState(true); // Para carregar enquanto as categorias e entrada são carregadas

  useEffect(() => {
    showEntries();
    fetchCategories();
  }, []);

  // Função para buscar as categorias
  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Erro ao carregar categorias:', error);
    } else {
      setCategories(data); // Definindo as categorias no estado
    }
  }

  // Função para buscar a entrada com base no ID
  async function showEntries() {
    let { data: dataEntries, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao carregar entrada:', error);
    } else {
      setEntry(dataEntries);
    }

    setLoading(false); // Finaliza o carregamento
  }

  // Função para atualizar a entrada
  async function updateEntry() {
    const { data: dU, error: eU } = await supabase.auth.getUser();
    const uid = dU?.user?.id;
    if (!uid) nav('/login', { replace: true });

    const { data, error } = await supabase
      .from('entries')
      .update({ ...entry, user_id: uid })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar entrada:', error);
    } else {
      nav('/entry', { replace: true });
    }
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="screen">
      <Form func={updateEntry} title="Entradas">
        <Input type="date" placeholder="Data" onChange={setEntry} objeto={entry} campo="date" />
        <Input type="text" placeholder="Descrição" onChange={setEntry} objeto={entry} campo="description" />
        <Input type="number" placeholder="Valor" onChange={setEntry} objeto={entry} campo="value" />

        {/* Caixa de seleção para categorias */}
        <label htmlFor="category_id">Categoria</label>
        <select
          id="category_id"
          value={entry.category_id || ''}
          onChange={(e) => setEntry({ ...entry, category_id: e.target.value })}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} {/* Exibe o nome da categoria */}
            </option>
          ))}
        </select>
      </Form>
    </div>
  );
}

export default Entry;

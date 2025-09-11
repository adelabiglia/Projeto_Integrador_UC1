import { useState, useEffect } from 'react'; 
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';

const supabaseUrl = "https://kvuxqtwfmqnookboncos.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g";
const supabase = createClient(supabaseUrl, supabaseKey);

function Exit() { 
  const { id } = useParams();
  const nav = useNavigate();

  const [exit, setExit] = useState({
    date: "",
    description: "",
    value: "",
    category_id: "",
    user_id: "",
  });

  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const [loading, setLoading] = useState(true); // Para saber se as categorias estão sendo carregadas

  useEffect(() => {
    showExits();
    fetchCategories(); // Carregar as categorias assim que o componente carregar
  }, []);

  // Função para buscar as categorias
  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Erro ao carregar categorias:', error);
    } else {
      setCategories(data); // Armazenar as categorias no estado
    }
  }

  // Função para buscar a saída com base no ID
  async function showExits() {
    let { data: dataExits, error } = await supabase
      .from('exits')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao carregar saída:', error);
    } else {
      setExit(dataExits);
    }

    setLoading(false); // Finaliza o carregamento
  }

  // Função para atualizar a saída
  async function updateExit() {
    const { data: dU, error: eU } = await supabase.auth.getUser();
    const uid = dU?.user?.id;

    if (!uid) nav('/login', { replace: true });

    const { data, error } = await supabase
      .from('exits')
      .update({ ...exit, user_id: uid })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar saída:', error);
    } else {
      nav('/exit', { replace: true });
    }
  }

  // Exibir mensagem de carregamento enquanto as categorias e saídas estão sendo carregadas
  if (loading) return <div>Carregando...</div>;

  return (
    <div className="screen">
      <Form func={updateExit} title="Saídas">
        <Input type="date" placeholder="Data" onChange={setExit} objeto={exit} campo="date" />
        <Input type="text" placeholder="Descrição" onChange={setExit} objeto={exit} campo="description" />
        <Input type="number" placeholder="Valor" onChange={setExit} objeto={exit} campo="value" />

        {/* Caixa de seleção para categorias */}
        <label htmlFor="category_id">Categoria</label>
        <select
          id="category_id"
          value={exit.category_id || ''}
          onChange={(e) => setExit({ ...exit, category_id: e.target.value })}
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

export default Exit;

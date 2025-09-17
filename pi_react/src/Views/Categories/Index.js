import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Input } from '../../Components/Input';
import { Form } from '../../Components/Form';

const supabaseUrl = "https://kvuxqtwfmqnookboncos.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Categories() {
  const nav = useNavigate();

  const [categorie, setCategorie] = useState({
    name: "",
    meta: "",
    user_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [valoresPorCategoria, setValoresPorCategoria] = useState({});

  useEffect(() => {
    readCategories();
    calcularValoresPorCategoria();
  }, []);

  async function createCategorie() {
    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    const uid = dataUser?.user?.id;

    if (!uid) return nav('/login', { replace: true });

    await supabase
      .from('categories')
      .insert({ ...categorie, user_id: uid });

    readCategories();
    calcularValoresPorCategoria();
  }

  async function delCategorie(id) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user?.id) {
      alert("Você precisa estar logado para deletar.");
      nav('/login', { replace: true });
      return;
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', userData.user.id);

    if (error) {
      console.error("Erro ao deletar:", error.message);
      alert("Erro ao deletar: " + error.message);
    } else {
      setCategories(prev => prev.filter(cat => cat.id !== id));
      calcularValoresPorCategoria(); // Atualiza valores
    }
  }

  async function readCategories() {
    const { data: dataCategories } = await supabase
      .from('categories')
      .select('*');
    setCategories(dataCategories || []);
  }

  async function calcularValoresPorCategoria() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user?.id) {
      console.error("Usuário não autenticado.");
      return;
    }

    const uid = userData.user.id;

    const { data: entradas } = await supabase
      .from('entries')
      .select('value, category_id')
      .eq('user_id', uid);

    const { data: saidas } = await supabase
      .from('exits')
      .select('value, category_id')
      .eq('user_id', uid);

    const valores = {};

    entradas?.forEach(({ category_id, value }) => {
      if (!valores[category_id]) valores[category_id] = 0;
      valores[category_id] += Number(value);
    });

    saidas?.forEach(({ category_id, value }) => {
      if (!valores[category_id]) valores[category_id] = 0;
      valores[category_id] = Number(value);
    });

    setValoresPorCategoria(valores);
  }

  return (
    <div className="screen">

      <Form func={createCategorie} title="Cadastrar Categoria">
        <Input type="text" placeholder='Digite a categoria' onChange={setCategorie} objeto={categorie} campo='name' />
        <Input type="text" placeholder='Digite sua meta' onChange={setCategorie} objeto={categorie} campo='meta' />
      </Form>

      <div className='row'>
        {categories.map(c => (
          <div className='cardGame' key={c.id}>
            <p><strong>Nome:</strong> {c.name}</p>

            <p><strong>Meta:</strong> {Number(c.meta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>

            <p><strong>Valor Atingido:</strong> {Number(valoresPorCategoria[c.id] || 0).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}</p>

            <progress value={valoresPorCategoria[c.id] || 0} max={c.meta}></progress>
            <p>{((valoresPorCategoria[c.id] || 0) / c.meta * 100).toFixed(1)}%</p>

            <div style={{ marginTop: "10px" }}>
              <Button variant="danger" onClick={() => delCategorie(c.id)}>Excluir</Button>{' '}
              <Button variant="warning" onClick={() => nav(`/categories/${c.id}`, { replace: true })}>Editar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

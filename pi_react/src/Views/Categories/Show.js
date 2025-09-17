import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';

const supabaseUrl = "https://kvuxqtwfmqnookboncos.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dXhxdHdmbXFub29rYm9uY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NjIsImV4cCI6MjA2OTkyNjg2Mn0.n2F4uWJuIxu17qjEfHHFmv3Kg9uq5con54ys3E3Al9g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Categories() {
  const nav = useNavigate();
  const { id } = useParams();

  const [categorie, setCategorie] = useState({
    name: "",
    meta: "",
    user_id: "",
  });

  useEffect(() => {
    if (id) {
      readCategory();
    }
  }, [id]);

  // Função para buscar categoria pelo id para edição
  async function readCategory() {
    const { data: dataCategory, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Erro ao carregar categoria:", error.message);
      alert("Categoria não encontrada.");
      nav('/categories'); // redireciona se não encontrar
      return;
    }

    setCategorie({
      name: dataCategory.name || "",
      meta: dataCategory.meta || "",
      user_id: dataCategory.user_id || "",
    });
  }

  // Função para criar ou atualizar categoria
  async function saveCategorie() {
    const { data: dataUser } = await supabase.auth.getUser();
    const uid = dataUser?.user?.id;

    if (!uid) {
      alert("Você precisa estar logado.");
      nav('/login', { replace: true });
      return;
    }

    if (id) {
      // Atualiza a categoria existente
      const { error } = await supabase
        .from('categories')
        .update({
          name: categorie.name,
          meta: categorie.meta,
        })
        .eq('id', id)
        .eq('user_id', uid);

      if (error) {
        alert("Erro ao atualizar categoria: " + error.message);
      } else {
        alert("Categoria atualizada com sucesso!");
        nav('/categories'); // ou para onde quiser após salvar
      }

    } else {
      // Cria nova categoria
      const { error } = await supabase
        .from('categories')
        .insert([{ ...categorie, user_id: uid }]);

      if (error) {
        alert("Erro ao criar categoria: " + error.message);
      } else {
        alert("Categoria criada com sucesso!");
        setCategorie({ name: "", meta: "", user_id: "" }); // limpa form
      }
    }
  }

  return (
    <div className="screen">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={categorie.name}
          placeholder='Digite seu nome'
          onChange={(e) => setCategorie({ ...categorie, name: e.target.value })}
        />
        <input
          type="text"
          value={categorie.meta}
          placeholder='Digite sua meta'
          onChange={(e) => setCategorie({ ...categorie, meta: e.target.value })}
        />

        <button onClick={saveCategorie}>Salvar</button>
      </form>
    </div>
  );
}

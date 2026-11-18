import "./Objetos.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Objetos() {
    const navigate = useNavigate();
    const nomeUsuario = sessionStorage.getItem("nomeUsuario");
    const [pesquisa, setPesquisa] = useState("");
    const [objetos, setObjetos] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [tipoSelecionado, setTipoSelecionado] = useState("");
    const [carregando, setCarregando] = useState(true);


    useEffect(() => {
        const idUsuario = sessionStorage.getItem("idUsuario");

        if (!idUsuario) {
            navigate("/login");
        }
    },[]);

    useEffect(() => {
        async function buscarObjetos() {
            try {
                const resposta = await fetch("http://localhost:8080/api/objetos");
                const dados = await resposta.json();

                setObjetos(dados);
            } catch (erro) {
                console.error("Erro ao buscar objetos:", erro);
            } finally {
                setCarregando(false);
            }
        }

        buscarObjetos();
    },[]);

    function sair() {
        sessionStorage.clear();
        navigate("/login");
    }

    const objetosFiltrados = objetos.filter((objeto) =>
        objeto.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <main className="pagina-objetos">
            <h2>Olá {nomeUsuario}!</h2>
            <button onClick={sair}>Sair</button>
            <h1>Objetos perdidos e encontrados</h1>
            <p className="descricao-objetos">
                Confira os objetos registrados na plataforma e encontre
                aquilo que você está procurando.
            </p>
            <div className="filtros-objetos">
                <input type="text"
                       placeholder="Pesquisar objeto..."
                       value={pesquisa}
                       onChange={(evento) => setPesquisa(evento.target.value)}/>
                <select defaultValue="">
                    <option value="" disabled>Tipo de Registro</option>
                    <option value="PERDIDO">Perdido</option>
                    <option value="ENCONTRADO">Encontrado</option>
                </select>
                <select defaultValue="">
                    <option value="" disabled>Categoria</option>
                    <option value="ELETRÔNICO">Eletrônicos</option>
                    <option value="MATERIAL_ESCOLAR">Material escolar</option>
                    <option value="ROUPA">Roupas e Acessórios</option>
                    <option value="OUTRO">Outros</option>
                </select>
            </div>
            <div className="lista-objetos">
                {carregando ? (
                    <p>Carregando objetos...</p>
                ) : objetosFiltrados.length === 0 ? (
                    <p>Nenhum objeto encontrado.</p>
                ) : (
                    objetosFiltrados.map((objeto) => (
                        <article className="card-objeto" key={objeto.idObjeto}>
                            <h2>{objeto.nome}</h2>
                            <p><strong>Categoria:</strong> {objeto.categoria}</p>
                            <p><strong>Cor:</strong> {objeto.cor}</p>
                            <p><strong>Marca:</strong> {objeto.marca}</p>
                            <p><strong>Descrição:</strong> {objeto.descricao}</p>
                        </article>
                    ))
                )}
            </div>
        </main>
    );
}

export default Objetos;
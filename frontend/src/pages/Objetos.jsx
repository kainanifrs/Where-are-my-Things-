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
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [localSelecionado, setLocalSelecionado] = useState("");
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

    useEffect(() => {
        async function buscarRegistros() {
            try {
                const resposta = await fetch("http://localhost:8080/api/registros");
                const dados = await resposta.json();

                setRegistros(dados);
            } catch(erro) {
                console.error("Erro ao buscar registros", erro);
            }
        }

        buscarRegistros();
    },[]);

    function sair() {
        sessionStorage.clear();
        navigate("/login");
    }

    const objetosFiltrados = objetos.filter((objeto) => {
        const correspondePesquisa = objeto.nome.toLowerCase().includes(pesquisa.toLowerCase());

        const correspondeTipo = tipoSelecionado === "" || registros.some((registro) =>
            String(registro.objeto.idObjeto) === String(objeto.idObjeto) &&
            registro.tipoRegistro === tipoSelecionado
        );

        const correspondeCategoria = categoriaSelecionada === "" || objeto.categoria === categoriaSelecionada;

        return correspondePesquisa && correspondeTipo & correspondeCategoria;
    });

    return (
        <main className="pagina-objetos">
            <header className="cabecalho-objetos">
                <div>
                    <h2>Where are my Things</h2>
                    <p>Achados e Perdidos</p>
                </div>
                <div className="usuario-logado">
                    <span>Olá, {nomeUsuario}!</span>
                    <button onClick={sair}>Sair</button>
                </div>
            </header>
            <div className="conteudo-objetos">
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
                <select value={tipoSelecionado} onChange={(evento) => setTipoSelecionado(evento.target.value)}>
                    <option value="">Todos os tipos</option>
                    <option value="PERDIDO">Perdido</option>
                    <option value="ENCONTRADO">Encontrado</option>
                </select>
                <select value={categoriaSelecionada} onChange={(evento) => setCategoriaSelecionada(evento.target.value)}>
                    <option value="">Categoria</option>
                    <option value="ELETRÔNICO">Eletrônicos</option>
                    <option value="MATERIAL_ESCOLAR">Material escolar</option>
                    <option value="ACESSORIOS">Roupas e Acessórios</option>
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
                            {registros
                                .filter((registro) => String(registro.objeto.idObjeto) === String(objeto.idObjeto))
                                .map((registro) => (<p key={registro.idRegistro}><strong>Local: </strong>{registro.localOcorrencia}</p>))
                            }
                            <h2>{objeto.nome}</h2>
                            <p><strong>Categoria:</strong> {objeto.categoria}</p>
                            <p><strong>Cor:</strong> {objeto.cor}</p>
                            <p><strong>Marca:</strong> {objeto.marca}</p>
                            <p><strong>Descrição:</strong> {objeto.descricao}</p>
                        </article>
                    ))
                )}
                </div>
            </div>
        </main>
    );
}

export default Objetos;
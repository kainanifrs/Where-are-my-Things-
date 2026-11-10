import "./Objetos.css";

function Objetos() {
    return (
        <main className="pagina-objetos">
            <h1>Objetos perdidos e encontrados</h1>
            <p className="descricao-objetos">
                Confira os objetos registrados na plataforma e encontre
                aquilo que você está procurando.
            </p>
            <div className="filtros-objetos">
                <input type="text" placeholder="Pesquisar objeto..."/>
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
                <article className="card-objeto">
                    <h2>Exemplo: Garrafa azul</h2>
                    <p><strong>Tipo:</strong>Encontrado</p>
                    <p><strong>Categoria:</strong>Acessórios</p>
                    <p><strong>Local:</strong>Biblioteca</p>
                    <p><strong>Data:</strong>10/11/2026</p>
                </article>
                <article className="card-objeto">
                    <h2>Exemplo: Estojo perdido</h2>
                    <p><strong>Tipo:</strong>Perdido</p>
                    <p><strong>Categoria:</strong>Material escolar</p>
                    <p><strong>Local:</strong>Sala 12</p>
                    <p><strong>Data:</strong>10/11/2026</p>
                </article>
            </div>
        </main>
    );
}

export default Objetos;
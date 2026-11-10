import { Link } from "react-router-dom";

function Home() {
    return (
        <main>
            <header>
                <h1>Where Are My Things?</h1>
                <p>
                    Encontre o que você perdeu. Ajude alguém a encontrar o que procura.
                </p>
                <nav>
                    <a href="#inicio">Início</a>
                    <Link to="/objetos">Ver objetos</Link>
                    <a href="#registro">Registrar objeto</a>
                    <a href="#login">Entrar / Cadastrar</a>
                </nav>
            </header>
            <section id="inicio">
                <h2>Perdeu ou encontrou algum objeto?</h2>
                <p>
                    Nossa plataforma ajuda a conectar pessoas que perderam
                    objetos com aquelas que os encontraram.
                </p>
                <button>Ver objetos</button>
                <button>Registrar objeto</button>
            </section>
        </main>
    );
}

export default Home;

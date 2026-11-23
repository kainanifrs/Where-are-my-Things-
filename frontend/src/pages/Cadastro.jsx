import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/;

        if (!senhaValida.test(senha)) {
            setMensagem("A senha deve ter entre 8 e 16 caracteres, incluindo pelo menos 1 letra maiúscula, 1 minúscula e 1 caractere especial.");
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagem("As senhas não correspondem!");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:8080/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    senha: senha,
                })
            });

            if (!resposta.ok) {
                setMensagem("Não foi possível realizar o cadastro. Verifique os dados.");
                return;
            }

            setMensagem("Cadastro realizado com sucesso!");

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch(erro) {
            setMensagem("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <main className="pagina-cadastro">
            <div className="cadastro-card">
                <div className="cadastro-logo">
                    <h1>Where are My Things?</h1>
                    <p>Lost & Found</p>
                </div>

                <h2>Crie sua conta</h2>
                <p className="cadastro-subtitulo">Encontre ou anuncie objetos perdidos.</p>

                <form onSubmit={handleSubmit}>
                    <div className="cadastro-campo">
                        <label htmlFor="nome">Nome completo</label>
                        <input type="text" id="nome" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                    </div>
                    <div className="cadastro-campo">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="Digite seu E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="cadastro-campo">
                        <label htmlFor="telefone">Telefone</label>
                        <input type="tel" id="telefone" placeholder="Digite seu telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                    </div>
                    <div className="cadastro-campo">
                        <label htmlFor="senha">Senha</label>

                        <div className="cadastro-senha-container">
                            <input type={mostrarSenha ? "text" : "password"} id="senha" placeholder="Crie uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
                            <button type="button"
                                    className="cadastro-olho"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                                    {mostrarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    <div className="cadastro-campo">
                        <label htmlFor="confirmarSenha">Confirmar senha</label>

                        <div className="cadastro-senha-container">
                            <input type={mostrarConfirmarSenha ? "text" : "password"}
                                   id="confirmarSenha" placeholder="Digite a senha novamente"
                                   value={confirmarSenha}
                                   onChange={(e) => setConfirmarSenha(e.target.value)} required/>
                            <button type="button"
                                    className="cadastro-olho"
                                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                    aria-label={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}>
                                    {mostrarConfirmarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="cadastro-botao">Criar conta</button>

                    <p className="cadastro-mensagem">{mensagem}</p>
                    <p className="cadastro-login">Já possui uma conta?<Link to="/login">Faça Login</Link></p>
                </form>
            </div>
        </main>
    );
}

export default Cadastro;
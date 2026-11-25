import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const resposta = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    senha: password
                })
            });

            const dados = await resposta.json();

            setMensagem(dados.mensagem);

            if (dados.sucesso) {
                sessionStorage.setItem("idUsuario", dados.idUsuario);
                sessionStorage.setItem("nomeUsuario", dados.nome);
                sessionStorage.setItem("tipoUsuario", dados.tipoUsuario);

                navigate('/objetos');
            }

        } catch (erro) {
            setMensagem("Não foi possível conectar ao servidor");
        }
    }
    return (
        <main className="pagina-login">
            <div className="login-card">
                <div className="login-logo">
                    <h1>Where are My Things?</h1>
                    <p>Achados e Perdidos</p>
                </div>
                <h2>Bem-vindo de volta!</h2>
                <p className="login-subtitulo">Entre na sua conta para continuar.</p>
                <form onSubmit={handleSubmit}>
                    <div className="login-campo">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="login-campo">
                        <label htmlFor="senha">Senha</label>

                        <div className="login-senha-container">
                            <input type={mostrarSenha ? "text" : "password"} id="senha" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <button type="button"
                                    className="login-olho"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                                    {mostrarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="login-esqueci-senha">
                        <Link to="/recuperar-senha">Esqueci minha senha</Link>
                    </div>

                    <button type="submit" className="login-botao">Entrar</button>

                    <p className="login-mensagem">{mensagem}</p>
                    <p className="login-cadastro">Ainda não tem uma conta?{" "}<Link to="/cadastro">Cadastre-se</Link></p>
                </form>
            </div>
        </main>
    );
}

export default Login;
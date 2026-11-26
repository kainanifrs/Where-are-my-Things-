
import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

function RedefinirSenha() {
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    const [statusToken, setStatusToken] = useState("VERIFICANDO");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    useEffect(() => {
        async function verificarToken() {
            if (!token) {
                setStatusToken("INVALIDO");
                return;
            }

            try {
                const resposta = await fetch(`http://localhost:8080/api/auth/verificar-token?token=${encodeURIComponent(token)}`);

                if (!resposta.ok) {
                    setStatusToken("ERRO");
                    return;
                }

                const dados = await resposta.json();
                setStatusToken(dados.status);

            } catch (erro) {
                console.error("Erro ao verificar token:", erro);
                setStatusToken("ERRO");
            }
        }

        verificarToken();
    }, [token]);

    const requisitos = [
        {
            texto: "Entre 8 e 16 caracteres",
            atendido: novaSenha.length >= 8 && novaSenha.length <= 16
        },
        {
            texto: "Pelo menos uma letra minúscula",
            atendido: /[a-z]/.test(novaSenha)
        },
        {
            texto: "Pelo menos uma letra maiúscula",
            atendido: /[A-Z]/.test(novaSenha)
        },
        {
            texto: "Pelo menos um número",
            atendido: /[0-9]/.test(novaSenha)
        },
        {
            texto: "Pelo menos um caractere especial",
            atendido: /[^A-Za-z0-9]/.test(novaSenha)
        }
    ];

    const senhaValida = requisitos.every((requisito) => requisito.atendido);

    async function handleSubmit(e) {
        e.preventDefault();
        setMensagem("");

        if (!token) {
            setMensagem("Link de recuperação inválido ou incompleto.");
            return;
        }

        if (!senhaValida) {
            setMensagem("A nova senha não atende a todos os requisitos.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setMensagem("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        try {
            const resposta = await fetch("http://localhost:8080/api/auth/redefinir-senha",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: token,
                        novaSenha: novaSenha
                    })
                }
            );

            let dados = {};

            try {
                dados = await resposta.json();
            } catch {
                dados = {};
            }

            if (resposta.ok) {
                setMensagem("Senha redefinida com sucesso!");
                //setStatusToken("UTILIZADO");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            } else {
                setMensagem(dados.mensagem || "Não foi possível redefinir a senha.");

                if (dados.mensagem?.toLowerCase().includes("expirado")) {
                    setStatusToken("EXPIRADO");
                } else if (dados.mensagem?.toLowerCase().includes("utilizado")) {
                    setStatusToken("UTILIZADO");
                }
            }

        } catch (erro) {
            console.error("Erro ao redefinir senha:", erro);
            setMensagem("Não foi possível conectar ao servidor.");

        } finally {
            setCarregando(false);
        }
    }

    if (statusToken === "VERIFICANDO") {
        return (
            <main className="pagina-login">
                <div className="login-card">
                    <div className="login-logo">
                        <h1>Where are My Things?</h1>
                        <p>Achados e Perdidos</p>
                    </div>

                    <h2>Verificando link...</h2>
                    <p className="login-subtitulo">
                        Aguarde enquanto verificamos seu link de recuperação.
                    </p>
                </div>
            </main>
        );
    }

    if (statusToken !== "VALIDO") {
        let mensagemToken = "";

        switch (statusToken) {
            case "EXPIRADO":
                mensagemToken = "Link de recuperação expirado. Solicite uma nova recuperação de senha.";
                break;

            case "UTILIZADO":
                mensagemToken = "Este link de recuperação já foi utilizado. Se precisar, solicite uma nova recuperação de senha.";
                break;

            case "INVALIDO":
                mensagemToken = "Link de recuperação inválido ou incompleto.";
                break;

            default:
                mensagemToken = "Não foi possível verificar o link. Verifique sua conexão e tente novamente.";
        }

        return (
            <main className="pagina-login">
                <div className="login-card">
                    <div className="login-logo">
                        <h1>Where are My Things?</h1>
                        <p>Achados e Perdidos</p>
                    </div>

                    <h2>Redefinir senha</h2>

                    <p className="login-subtitulo">
                        {mensagemToken}
                    </p>

                    <p className="login-cadastro">
                        <Link to="/recuperar-senha">
                            Solicitar nova recuperação
                        </Link>
                    </p>

                    <p className="login-cadastro">
                        <Link to="/login">Voltar para login</Link>
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="pagina-login">
            <div className="login-card">

                <div className="login-logo">
                    <h1>Where are My Things?</h1>
                    <p>Achados e Perdidos</p>
                </div>

                <h2>Redefinir senha</h2>

                <p className="login-subtitulo">
                    Cadastre sua nova senha para acessar sua conta.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="login-campo">
                        <label htmlFor="novaSenha">Nova senha</label>

                        <div className="cadastro-senha-container">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                id="novaSenha"
                                placeholder="Digite sua nova senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="cadastro-olho"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
                            >
                                {mostrarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>

                        <div className="cadastro-requisitos">
                            {requisitos.map((requisito, index) => (
                                <span
                                    key={index}
                                    className={
                                        requisito.atendido
                                            ? "validacao-sucesso"
                                            : "validacao-erro"
                                    }
                                >
                                    {requisito.atendido ? "✓" : "✗"}{" "}
                                    {requisito.texto}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="login-campo">
                        <label htmlFor="confirmarSenha">Confirmar nova senha</label>

                        <div className="cadastro-senha-container">
                            <input
                                type={mostrarConfirmacao ? "text" : "password"}
                                id="confirmarSenha"
                                placeholder="Confirme sua nova senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="cadastro-olho"
                                onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                                aria-label={mostrarConfirmacao ? "Esconder confirmação" : "Mostrar confirmação"}
                            >
                                {mostrarConfirmacao ? "🙈" : "👁️"}
                            </button>
                        </div>

                        {confirmarSenha && (
                            <span
                                className={
                                    novaSenha === confirmarSenha
                                        ? "validacao-sucesso"
                                        : "validacao-erro"
                                }
                            >
                                {novaSenha === confirmarSenha
                                    ? "✓ As senhas coincidem"
                                    : "✗ As senhas não coincidem"}
                            </span>
                        )}
                    </div>

                    <button type="submit" className="login-botao" disabled={carregando}>
                        {carregando ? "Salvando..." : "Salvar nova senha"}
                    </button>

                    <p className={mensagem === "Senha redefinida com sucesso!" ? "validacao-sucesso" : "login-mensagem"}>{mensagem}</p>

                    <p className="login-cadastro">
                        <Link to="/login">Voltar para login</Link>
                    </p>

                </form>
            </div>
        </main>
    );
}

export default RedefinirSenha;
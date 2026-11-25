import { useState } from "react";
import { Link } from "react-router-dom";

function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMensagem("Enviando solicitação...");

        try {
            const resposta = await fetch("http://localhost:8080/api/auth/recuperar-senha",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                }
                );

            //const dados = await resposta.json();

            if (resposta.ok) {
                setMensagem("Se o e-mail estiver cadastrado, você receberá um link de recuperação.");
            } else {
                setMensagem("Não foi possível processar a solicitação.");
            }
        } catch(erro) {
            console.error("Erro ao solicitar recuperação:", erro);
            setMensagem("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <main className="pagina-login">
            <div className="login-card">
                <div className="login-logo">
                    <h1>Where are My Things?</h1>
                    <p>Achados e Perdidos</p>
                </div>

                <h2>Recuperar senha</h2>

                <p className="login-subtitulo">Informe seu e-mail cadastrado para receber um link de recuperação de senha.</p>

                <form onSubmit={handleSubmit}>
                    <div className="login-campo">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>

                    <button type="submit" className="login-botao">Enviar link de recuperação</button>

                    <p className="login-mensagem">{mensagem}</p>
                    <p className="login-cadastro">Lembrou sua senha?{" "}<Link to="/login">Voltar para login</Link></p>
                </form>
            </div>
        </main>
    );
}

export default RecuperarSenha;
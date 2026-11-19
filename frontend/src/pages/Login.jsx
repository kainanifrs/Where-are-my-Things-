import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');

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
        <div>
            <h1>Where are My Things?</h1>
            <h2>Fazer Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Entrar</button>
                <p>{mensagem}</p>
            </form>
        </div>
    );
}

export default Login;
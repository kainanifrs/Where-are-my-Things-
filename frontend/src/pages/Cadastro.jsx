import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length === 0) return "";

    if (numeros.length <= 2) {
        return `(${numeros}`;
    }

    const ddd = numeros.slice(0, 2);
    const restante = numeros.slice(2);

    let telefoneFormatado = `(${ddd})`;

    if (restante.length > 0) {
        telefoneFormatado += ` ${restante.slice(0,1)}`;
    }

    if (restante.length > 1) {
        telefoneFormatado += ` ${restante.slice(1,5)}`;
    }

    if (restante.length > 5) {
        telefoneFormatado += `-${restante.slice(5,9)}`;
    }

    return telefoneFormatado;
}

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    const telefoneNumeros = telefone.replace(/\D/g, "");
    const telefoneValido = telefoneNumeros.length === 11;

    const senhaRequisitos = {
        minimo: senha.length >= 8,
        maximo: senha.length <= 16,
        maiuscula: /[A-Z]/.test(senha),
        minuscula: /[a-z]/.test(senha),
        numero: /[0-9]/.test(senha),
        especial: /[^A-Za-z0-9]/.test(senha)
    };

    const senhaValida = Object.values(senhaRequisitos).every(Boolean);

    const senhasCorrespondem = confirmarSenha.length > 0 && senha === confirmarSenha;

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
        if (!emailValido) {
            setMensagem("Digite um endereço de e-mail válido.");
            return;
        }

        if (telefone && telefone.replace(/\D/g, "").length !== 11) {
            setMensagem("Digite um telefone válido com DDD e com 9 dígitos.");
            return;
        }

        if (!senhaValida) {
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
                    email: email.trim(),
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
                        {email.length > 0 && (
                            <small className={emailValido ? "validacao-sucesso" : "validacao-erro"}>
                                {emailValido ? "✓ E-mail válido" : "Digite um e-mail válido"}
                            </small>
                        )}
                    </div>
                    <div className="cadastro-campo">
                        <label htmlFor="telefone">Telefone</label>
                        <input type="tel" id="telefone" placeholder="Digite seu telefone" value={telefone} onChange={(e) => setTelefone(formatarTelefone(e.target.value))} maxLength={17}/>
                        {telefone.length > 0 && (
                            <small className={telefoneValido ? "validacao-sucesso" : "validacao-erro"}>
                                {telefoneValido ? "✓ Telefone válido" : "Digite os 11 números do telefone, incluindo o DDD"}
                            </small>
                        )}
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
                        {senha.length > 0 && (
                            <div className="cadastro-requisitos">
                                <small className={senhaRequisitos.minimo ? "validacao-sucesso" : "validacao-erro"}>
                                    {senhaRequisitos.minimo ? "✓ " : "✗"} Mínimo de 8 caracteres
                                </small>

                                <small className={senhaRequisitos.maximo ? "validacao-sucesso" : "validacao-erro"}>
                                    {senhaRequisitos.maximo ? "✓" : "✗"} Máximo de 16 caracteres
                                </small>

                                <small className={senhaRequisitos.maiuscula ? "validacao-sucesso" : "validacao-erro"}>
                                    {senhaRequisitos.maiuscula ? "✓" : "✗"} Uma letra maiúscula
                                </small>

                                <small className={senhaRequisitos.minuscula ? "validacao-sucesso" : "validacao-erro"}>
                                    {senhaRequisitos.minuscula ? "✓" : "✗"} Uma letra minuscúcula
                                </small>

                                <small className={senhaRequisitos.numero ? "validacao-sucesso" : "validacao-erro"}>
                                    {senhaRequisitos.numero ? "✓" : "✗"} Pelo menos um número
                                </small>

                                <small className={senhaRequisitos.especial ? "validacao-sucesso" : "validacao-erro"}>
                                    {senhaRequisitos.especial ? "✓" : "✗"} Um caractere especial
                                </small>
                            </div>
                        )}
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
                        {confirmarSenha.length > 0 && (
                            <small className={senhasCorrespondem ? "validacao-sucesso" : "validacao-erro"}>
                                {senhasCorrespondem ? "✓ As senhas correspondem" : "✗ As senhas não correspondem."}
                            </small>
                        )}
                    </div>

                    <button type="submit" className="cadastro-botao">Criar conta</button>

                    <p className={`cadastro-mensagem ${mensagem.includes("sucesso") ? "validacao-sucesso" : "validacao-erro"}`}>
                        {mensagem}
                    </p>
                    <p className="cadastro-login">Já possui uma conta?<Link to="/login"> Faça Login</Link></p>
                </form>
            </div>
        </main>
    );
}

export default Cadastro;
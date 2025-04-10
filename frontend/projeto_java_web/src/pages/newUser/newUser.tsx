import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

interface UserData {
    nome: string;
    email: string;
    phone: string;
    address: string;
    hobby: string;
}

function NewUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setTelefone] = useState('');
    const [address, setAddress] = useState('');
    const [hobby, setHobby] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    email,
                    phone,
                    address,
                    hobby
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            toast.success('Usuário cadastrado com sucesso!', { autoClose: 3000 });
            console.log(data);
        } catch (erro) {
            toast.error('Erro ao cadastrar usuário!', { autoClose: 3000 });
            console.error(erro);
        }
    }

    return (
        <>
        <div className="tabelaInput">
            <h1>Cadastro de Usuário</h1>
            <form className="formulario" onSubmit={handleSubmit}>
                <input type="text" id="nome" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" id="phone" placeholder="Telefone: (11) 12345-6789" value={phone} onChange={(e) => setTelefone(e.target.value)} />
                <input type="text" id="address" placeholder="UF/País: SP, Brasil" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" id="hobby" placeholder="Hobby Favorito" value={hobby} onChange={(e) => setHobby(e.target.value)} />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
        </>
    )
}

export default NewUser;
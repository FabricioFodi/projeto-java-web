import React, { useEffect, useState } from "react";
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
    const [isEdtiting, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);


    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setTelefone] = useState('');
    const [address, setAddress] = useState('');
    const [hobby, setHobby] = useState('');

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`api/users/${id}`);
                    if (!response.ok) throw new Error('Usuário não encontrado');

                    const data: UserData = await response.json();
                    setNome(data.nome);
                    setEmail(data.email);
                    setTelefone(data.phone);
                    setAddress(data.address);
                    setHobby(data.hobby);
                    setIsEditing(true);
                } catch (error) {
                    toast.error('Erro ao carregar usuário!', { autoClose: 3000 });
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = isEdtiting ? `/api/users/${id}` : '/api/users';
            const method = isEdtiting ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
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
            if (!response.ok) throw new Error('Erro na resposta do servidor');

            const data = await response.json();
            toast.success(`Usuário ${isEdtiting ? 'atualizado' : 'cadastrado'} com sucesso!`, { autoClose: 3000 });
            if (!isEdtiting) {
                navigate('/');
            }
        } catch (error) {
            toast.error(`Erro ao ${isEdtiting ? 'atualizar' : 'cadastrar'} usuário!`, { autoClose: 3000 });
            console.error(error);
        }
    };

    if (loading) return <div>Carregando...</div>

    return (
        <>
            <div className="tabelaInput">
                <h1>{isEdtiting ? 'Editar Usuário' : 'Cadastro de usuário'}</h1>
                <form className="formulario" onSubmit={handleSubmit}>
                    <input type="text" id="nome" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" id="phone" placeholder="Telefone: (11) 12345-6789" value={phone} onChange={(e) => setTelefone(e.target.value)} />
                    <input type="text" id="address" placeholder="UF/País: SP, Brasil" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" id="hobby" placeholder="Hobby Favorito" value={hobby} onChange={(e) => setHobby(e.target.value)} />

                    <button type="submit">{isEdtiting ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </form>
            </div>
        </>
    )
}

export default NewUser;
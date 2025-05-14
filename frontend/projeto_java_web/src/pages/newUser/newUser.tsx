import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import '../../App.css';

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
            navigate('/');
        } catch (error) {
            toast.error(`Erro ao ${isEdtiting ? 'atualizar' : 'cadastrar'} usuário!`, { autoClose: 3000 });
            console.error(error);
        }
    };

    if (loading) return <div>Carregando...</div>

    return (
        <>
            <div className=" flex items-center jsutify-center px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-6">
                        {isEdtiting ? 'Editar Usuário' : 'Cadastro de usuário'}
                    </h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Nome Completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input
                            type="email"
                            id="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input
                            type="text"
                            id="phone"
                            placeholder="Telefone: (11) 12345-6789"
                            value={phone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input
                            type="text"
                            id="address"
                            placeholder="UF/País: SP, Brasil"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input
                            type="text"
                            id="hobby"
                            placeholder="Hobby Favorito"
                            value={hobby}
                            onChange={(e) => setHobby(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition durtion-200 cursor-pointer">
                            {isEdtiting ? 'Salvar Alterações' : 'Cadastrar'}</button>
                    </form>
                    <button onClick={() => navigate('/')} className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200 cursor-pointer">
                        Voltar para página principal
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewUser;
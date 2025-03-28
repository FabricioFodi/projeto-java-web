import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
    interface User {
        id: number;
        nome: string;
        email: string;
        phone: string;
        address: string;
        hobby: string;
    }

    const [message, setMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data: User[] = await response.json();

                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                setUsers(data);
                setMessage('Conexão com o banco de dados bem sucedida')
            }
            catch (erro) {
                setMessage('Erro ao conectar com o banco de dados')
            }
        };

        fetchUsers();
    }, []);


    useEffect(() => {
        const table = tableRef.current;
        if (!table) return;

        const resizers = table.querySelectorAll('.resizer');
        let currentCol: HTMLElement | null = null;
        let startX = 0;
        let startWith = 0;

        const onMouseMove = (e: MouseEvent) => {
            if (!currentCol) return;
            const newWidth = startWith + (e.clientX - startX);
            (currentCol as HTMLElement).style.width = `${newWidth}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        resizers.forEach((resizer) => {
            const th = (resizer as HTMLElement).parentElement;
            if (!th) return;

            (resizer as HTMLElement).addEventListener('mousedown', (e: MouseEvent) => {
                currentCol = th;
                startX = e.clientX;
                startWith = th.offsetWidth;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });

    })

    return (
        <>
            <div className="tabela">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Hobby</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.hobby}</td>
                                    <td>
                                        <button onClick={() => alert(`Editar ${user.nome}`)}>Editar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>Carregando usuários...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div> {/* Fim da div tabela */}
            <p>{message}</p>
        </>
    )
}

export default App

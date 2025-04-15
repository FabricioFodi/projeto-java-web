import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './mainPage.css'

function Main() {
    interface User {
        id: number;
        nome: string;
        email: string;
        phone: string;
        address: string;
        hobby: string;
    }

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
                toast.success('Conexão com o banco de dados bem sucedida', {autoClose: 3000});
            }
            catch (erro) {
                toast.error('Erro ao conectar com o banco de dados', {autoClose: 3000});
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

        return () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <>
            <div className='tudo'>
                <h1>Lista de Usuários CRUD</h1>
                <div className="tabela">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {['ID', 'Nome', 'E-mail', 'Telefone', 'Endereço', 'Hobby', 'Ações'].map((col, index) => (
                                    <th key={index}>
                                        {col}
                                        <div className='resizer'></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.hobby}</td>
                                    <td> <Link to={`/editar/${user.id}`}>✏️</Link> <a >❌</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> {/* Fim da div tabela */}
                <button className='cadastraUser'><Link to='/cadastro'>Cadastrar Usuario</Link></button>
            </div>
        </>
    )
}

export default Main

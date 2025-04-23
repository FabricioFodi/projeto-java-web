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
                toast.success('Conexão com o banco de dados bem sucedida', { autoClose: 3000 });
            }
            catch (erro) {
                toast.error('Erro ao conectar com o banco de dados', { autoClose: 3000 });
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
            <div className='flex flex-col gap-16 items-center'>
                <h1 className='text-5xl font-semibold'>Lista de Usuários CRUD</h1>
                <table ref={tableRef} className="w-full border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            {['ID', 'Nome', 'E-mail', 'Telefone', 'Endereço', 'Hobby', 'Ações'].map((col, index) => (
                                <th
                                    key={index}
                                    className="px-2 py-1 border border-gray-300 bg-gray-100 relative select-none"
                                >
                                    {col}
                                    <div className="resizer w-[5px] h-full bg-transparent absolute right-0 top-0 cursor-col-resize hover:bg-gray-500" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-2 py-1 border border-gray-300 relative">{user.id}</td>
                                <td className="px-2 py-1 border border-gray-300 relative">{user.nome}</td>
                                <td className="px-2 py-1 border border-gray-300 relative">{user.email}</td>
                                <td className="px-2 py-1 border border-gray-300 relative">{user.phone}</td>
                                <td className="px-2 py-1 border border-gray-300 relative">{user.address}</td>
                                <td className="px-2 py-1 border border-gray-300 relative">{user.hobby}</td>
                                <td className="px-2 py-1 border border-gray-300 relative">
                                    <Link to={`/editar/${user.id}`}>✏️</Link> <a>❌</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className=''><Link to='/cadastro'>Cadastrar Usuario</Link></button>
            </div>
        </>
    )
}

export default Main

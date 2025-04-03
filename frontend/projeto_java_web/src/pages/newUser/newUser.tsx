import { useEffect } from "react";

function NewUser() {

useEffect(() => {
    const fetchCreateuser = async () => {
        try {
            const response = await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: (document.getElementById('nome') as HTMLInputElement).value,
                    email: (document.getElementById('nome') as HTMLInputElement).value,
                    telefone: (document.getElementById('nome') as HTMLInputElement).value,
                    address: (document.getElementById('nome') as HTMLInputElement).value,
                    hobby: (document.getElementById('nome') as HTMLInputElement).value
                })
            })

        }catch(erro) {}
    }
})

    return (
        <>
        <div className="tabelaInput">
            <h1>Cadastro de Usuário</h1>
            <form className="formulario">
                <input type="text" id="nome" placeholder="Nome Completo" name="nome" required />

                <input type="email" id="email" placeholder="E-mail" name="email" required />

                <input type="text" id="telefone" placeholder="Telefone: (11) 12345-6789" name="telefone"  />

                <input type="text" id="address" placeholder="UF/País: SP, Brasil" name="address" />

                <input type="text" id="hobby" placeholder="Hobby Favorito" name="hobby" />

                <button >Cadastrar</button>
            </form>
        </div>
        </>
    )
}

export default NewUser;
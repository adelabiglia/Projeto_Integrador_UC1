import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


function Form({
    onSubmit,
    func,
    title,
    children,
     
}){

    const [loading, setLoading] = useState(false);

    async function send(){
         setLoading(true)
         var any = await func()
         setLoading(false)
         return any
    }

    return(
        < div className='cardForm'>
            <h3>{title}</h3>
            <form onSubmit={onSubmit}>
                {children}


                <Button className="input-salvar" onClick={() => send()} disabled={loading}>
                     {loading ? (
                        <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                Loading...
                                </span>
                        </Spinner>

                    ):(
                        <>Salvar</>

                    )}
                </Button>

        </form>
        </div>

    );

}

export {Form}   


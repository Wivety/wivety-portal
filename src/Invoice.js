import './Home.css';
import defaultProduct from "./images/default-product-image.png";
import { v4 as uuidv4 } from 'uuid';

export const Invoice = (props) => {
    return <>
        <div>
            <article className="card">
                <div className={"card-body"}>
                    <div className={"row"}>
                        <aside className={"col-md-6"}>
                            <article className={"gallery-wrap"}>
                                <div className={"card img-big-wrap"}>
                                    <a href="#"> <img src={props.product.image || defaultProduct}/></a>
                                </div>
                            </article>
                        </aside>
                        <main className={"col-md-6"}>
                            <article>
                                <h6s className={"text-primary"}>Factura</h6s>
                                <h3 className="title">{props.product.name} </h3>

                                <hr/>

                                <div className={"mb-3"}>
                                    <h6>N° Transaccion:</h6>
                                    {uuidv4()}
                                </div>

                                <div className={"mb-3"}>
                                    <h6>Descripción</h6>
                                    {props.product.description}
                                </div>

                                <div className={"mb-3"}>
                                    <h6>Cantidad comprada</h6>
                                    <span>x {props.quantity}</span>

                                </div>

                                <div className={"mb-3"}>
                                    <h6>Precio unitario</h6>
                                    <span>$ {props.product.price}</span>

                                </div>

                                <div className="mb-3">
                                    <var className="price h4"><b>TOTAL:</b> $ {props.product.price * props.quantity}</var> <br/>

                                </div>

                                <div className="mb-3">
                                    <h6>Gracias por su compra</h6>

                                </div>

                            </article>
                        </main>
                    </div>
                </div>
            </article>
        </div>
    </>
}

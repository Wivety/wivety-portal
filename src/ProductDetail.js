import './ProductDetail.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import defaultProduct from "./images/default-product-image.png";
import {Alert, Modal} from "react-bootstrap";
import {BuyForm} from "./BuyForm";


function ProductDetail() {

    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [refresh, setRefresh] = useState(true);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState({});
    const [post, setPost] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [canBuy, setCanBuy] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);


    useEffect(
        () => {
            axios.get(`http://localhost:8080/api/product/${id}`).then(value => {
                setProduct(value.data);
                axios.get(`http://localhost:8080/api/post/${id}`).then(value => {
                    setPost(value.data);
                }).catch(reason => {

                })
                axios.get(`http://localhost:8080/api/inventory/${id}`).then(value => {
                    const inExistence = value.data || false;
                    if (inExistence) {
                        setCanBuy(true);
                        setQuantity(value.data.quantity);
                    } else {
                        setShowAlert(true);
                        setCanBuy(false);
                    }
                }).catch(reason => {

                })
            }).catch(reason => {

            })
            const user = localStorage.getItem('login');
            axios.get(`http://localhost:8080/api/user/${user}`).then(value => {
                setUser(value.data);
            }).catch(reason => {

            })
        }
        , [refresh])

    const saveComment = () => {
        axios.post(`http://localhost:8080/api/post`, {
            message: comment,
            product: product.id,
            profile: localStorage.getItem('login') || 1
        }).then(value => {
            setRefresh(!refresh);
        }).catch(reason => {

        })
    }

    return (

        <>
            <div className="App">

                <section className={"main-content padding-y bg"}>
                    <div className="container">
                        <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)}>
                            <Alert.Heading>Sin existencias</Alert.Heading>
                            <p>
                                Disculpenos, no contamos con este producto.
                            </p>
                        </Alert>
                        <article className="card">
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <aside className={"col-md-6"}>
                                        <article className={"gallery-wrap"}>
                                            <div className={"card img-big-wrap"}>
                                                <a href="#"> <img src={product.image || defaultProduct}/></a>
                                            </div>
                                        </article>
                                    </aside>
                                    <main className={"col-md-6"}>
                                        <article>
                                            <h6 className={"text-primary"}>Categoría</h6>
                                            <h3 className="title">{product.name} </h3>

                                            <hr/>

                                            <div className={"mb-3"}>
                                                <h6>Descripción</h6>
                                                <ul className={"list-dots mb-0"}>
                                                    {product.description}
                                                </ul>
                                            </div>

                                            <div className={"mb-3"}>
                                                <h6>Cantidad diponible</h6>
                                                <ul className={"list-dots mb-0"}>
                                                    <span className={'quantity-spinner'}>
                                                        <input placeholder={1} onChange={event => {
                                                            if (event.target.value > quantity || event.target.value < 0) {
                                                                setShowAlert(true)
                                                                setCanBuy(false)
                                                            } else {
                                                                setSelectedQuantity(Number(event.target.value));
                                                                setShowAlert(false)
                                                                setCanBuy(true)
                                                            }
                                                        }}
                                                               max={quantity}
                                                               min={1}
                                                               type={'number'}/>
                                                    </span>
                                                    <span>max. {quantity}</span>
                                                </ul>
                                            </div>


                                            <div className="mb-3">
                                                <var className="price h4">$ {product.price}</var> <br/>

                                            </div>

                                            <div className="mb-4">
                                                <button onClick={event => {
                                                    setShowTransactionModal(true)
                                                }} disabled={!canBuy} className="btn btn-primary mr-1">Comprar
                                                </button>
                                            </div>

                                        </article>
                                    </main>
                                </div>
                            </div>
                        </article>

                        <div className={'comment-section'}>
                            <h2>Comentarios</h2>
                            <div>
                                <label>Comenta:</label>
                                <div>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        saveComment()
                                    }}>
                                        <input type={'text'} onChange={(e) => {
                                            setComment(e.target.value)
                                        }}/>
                                        <button type={"submit"}>Comentar
                                        </button>
                                    </form>
                                </div>
                                <br/>
                            </div>

                            <div className={'comments-panel'}>
                                {
                                    post && post.map(post => <div key={post.id}>
                                        <div className={'post'}>
                                            {post.message} - {user.username}
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            <Modal show={showTransactionModal} size={'lg'} fullscreen={true} onHide={() => setShowTransactionModal(false)}>
                <Modal.Header>
                    <Modal.Title>Realizar compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BuyForm product={product} quantity={selectedQuantity <= 0 ? 1 : selectedQuantity}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductDetail;

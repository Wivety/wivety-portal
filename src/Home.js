import './Home.css';
import {useEffect, useState} from "react";
import logo from "./images/logo.png"
import {Link} from "react-router-dom";
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import defaultProduct from "./images/default-product-image.png";

function Home() {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8080/api/product').then(value => {
            setProducts(value.data);
            setProductsFiltered(value.data);
        }).catch(reason => {

        })
        const user = localStorage.getItem('login');
        axios.get(`http://localhost:8080/api/user/${user}`).then(value => {
            setUser(value.data);
        }).catch(reason => {

        })
    }, [])
    useEffect(() => {
        setProductsFiltered(
            search ? products.filter(value => value.name.toLowerCase().includes(search.toLowerCase())) : products
        );
    }, [search])
    return (
        <>
            <div className={'main-content'}>
                <div className={'main-header flex-row'}>
                    <div className={"logo flex"}>
                        <img src={logo} height={90}/>
                    </div>
                    <div className={'search flex-center flex-row'}>
                        <input className={"search_bar"} placeholder={"Buscar"} type={"text"} onChange={event => {
                            setSearch(event.target.value);
                        }}/>
                    </div>
                    <div className={'profile flex flex-center'}>
                        <div className={'profile__name flex-column'}>
                            {
                                (user) &&
                                <>
                                    <b>Usuario:</b> {user.username || 'Administrador'}
                                </>
                            }
                        </div>
                        <Link to={'/login'} className={'profile__name'}>
                            Cerrar sesión
                        </Link>
                    </div>
                </div>

                <div className={"main-container flex-row flex-wrap flex-center"}>
                    {
                        productsFiltered || productsFiltered.length !== 0 ? productsFiltered.map(value => <>
                                <Card style={{width: '18rem'}} className={'product-item'}>
                                    <Card.Img variant="top" src={ value.image || defaultProduct} height="256"/>
                                    <Card.Body>
                                        <Card.Title>{value.name}</Card.Title>
                                        <Card.Text>
                                            <div>
                                                {value.description}
                                            </div>
                                            <div>
                                                <b>Precio: $ {value.price}</b>
                                            </div>
                                        </Card.Text>
                                        <Link to={`/product/${value.id}`} key={value.id}
                                              className={"flex-row flex-center"}>Ver detalles
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </>) :
                            <>
                                <div>Sin productos para mostrar</div>
                            </>
                    }
                </div>
                <footer className="main-footer flex-row flex-center">
                        <span className="footer">
                            &copy; Wivety Copyright 2021 Todos los derechos reservados - Hecho con ❤️ Universidad Catolica de Colombia
                        </span>
                </footer>
            </div>

        </>
    );
}

export default Home;

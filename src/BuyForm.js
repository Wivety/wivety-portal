import Styles from './Styles'
import {formatCreditCardNumber, formatCVC, formatExpirationDate} from "./CardUtils";
import {Form, Field} from 'react-final-form'
import Card from "./Card";
import './Home.css';
import {useState} from "react";
import {Invoice} from "./Invoice";
import {ButtonGroup, Dropdown, DropdownButton, Form as ReactForm} from "react-bootstrap";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const BuyForm = (props) => {
    const [didBuy, setDidBuy] = useState(false);
    const [payment, setPayment] = useState(1);

    const onSubmit = async values => {
        await sleep(300)
        setDidBuy(true)
    }

    return <>
        <Styles>
            {
                (!didBuy) ? <>
                        <p>
                            <div style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}>
                                <DropdownButton
                                    as={ButtonGroup}
                                    variant={'Primary'}
                                    title={payment === 1 ? 'Tarjeta credito' : 'PSE'}
                                    onSelect={
                                        event => {
                                            setPayment(Number(event))
                                        }
                                    }
                                >
                                    <Dropdown.Item eventKey="1" active={payment === 1}>Tarjeta credito</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" active={payment === 2}>PSE</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <h4>{props.product.name}</h4>
                            <div className={'flex-row'}>
                                <div className={'flex-column'}>

                                    <b>Cantidad:</b>
                                    <div>x {props.quantity}</div>
                                </div>
                                <div className={'flex-column flex-center'}>
                                    <b>Total:</b>
                                    <div>${props.quantity * props.product.price}</div>
                                </div>
                            </div>
                        </p>
                        {
                            (payment === 1) ? <Form
                                    onSubmit={onSubmit}
                                    render={({
                                                 handleSubmit,
                                                 form,
                                                 submitting,
                                                 pristine,
                                                 values,
                                                 active
                                             }) => {
                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <Card
                                                    number={values.number || ''}
                                                    name={values.name || ''}
                                                    expiry={values.expiry || ''}
                                                    cvc={values.cvc || ''}
                                                    focused={active}
                                                />
                                                <div>
                                                    <Field
                                                        name="number"
                                                        component="input"
                                                        type="text"
                                                        pattern="[\d| ]{16,22}"
                                                        placeholder="Número de tarjeta"
                                                        format={formatCreditCardNumber}
                                                    />
                                                </div>
                                                <div>
                                                    <Field
                                                        name="name"
                                                        component="input"
                                                        type="text"
                                                        placeholder="Nombre"
                                                    />
                                                </div>
                                                <div>
                                                    <Field
                                                        name="expiry"
                                                        component="input"
                                                        type="text"
                                                        pattern="\d\d/\d\d"
                                                        placeholder="Valido hasta"
                                                        format={formatExpirationDate}
                                                    />
                                                    <Field
                                                        name="cvc"
                                                        component="input"
                                                        type="text"
                                                        pattern="\d{3,4}"
                                                        placeholder="CVC"
                                                        format={formatCVC}
                                                    />
                                                </div>
                                                <div className="buttons">
                                                    <button type="submit" disabled={submitting}>
                                                        Pagar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={form.reset}
                                                        disabled={submitting || pristine}
                                                    >
                                                        Reiniciar
                                                    </button>
                                                </div>
                                            </form>
                                        )
                                    }}
                                /> :
                                <>
                                    <Form
                                        onSubmit={onSubmit}
                                        render={({
                                                     handleSubmit,
                                                     form,
                                                     submitting,
                                                     pristine,
                                                     values,
                                                     active
                                                 }) => {
                                            return (
                                                <form onSubmit={handleSubmit}>
                                                    <div>
                                                        <Field
                                                            name="email"
                                                            component="input"
                                                            type="email"
                                                            placeholder="Correo"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Field
                                                            name="name"
                                                            component="select"
                                                            type="text"
                                                            placeholder="Seleccione banco...">
                                                            <option value="cajasocial">Banco caja social</option>
                                                            <option value="bancolombia">Bancolombia</option>
                                                            <option value="nequi">Nequi</option>
                                                            <option value="bancobogota">Banco Bogota</option>
                                                            <option value="bancopopular">Banco popular</option>
                                                            <option value="davivienda">Davivienda</option>
                                                        </Field>
                                                    </div>
                                                    <div className="buttons">
                                                        <button type="submit" disabled={submitting}>
                                                            Pagar
                                                        </button>
                                                    </div>
                                                </form>
                                            )
                                        }}
                                    />
                                </>
                        }
                    </> :
                    <>
                        <Invoice product={props.product} quantity={props.quantity}/>
                    </>
            }
        </Styles>
    </>
}


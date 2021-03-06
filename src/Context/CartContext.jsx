import React, { createContext, useEffect, useState } from 'react'
export const context = createContext()

const { Provider } = context

const CustomProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [totalCartQty, setTotalCartQty] = useState(0)

    const addItem = (itemDetail, itemQty) => {

        const newItem =
        {
            name: itemDetail.name,
            price: itemDetail.price,
            id: itemDetail.id,
            img: itemDetail.img,
            qty: itemQty
        }

        const { name, price, id, img } = newItem

        if (isInCart(id)) {
            const itemTarget = cartItems.find((element) => element.id === id)
            itemTarget.qty = itemTarget.qty + itemQty
            setTotalCartQty(totalCartQty + itemQty)
        } else {
            const newCartItem =
            {
                name: name,
                price: price,
                id: id,
                img: img,
                qty: itemQty
            }
            setCartItems([...cartItems, newCartItem])
            setTotalCartQty(totalCartQty + itemQty)
        }
    }

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(
            (element) => element.id !== id)
        setCartItems(updatedCart)
    }

    const clear = () => {
        setCartItems([])
    }

    const isInCart = (id) => {
        return cartItems.some((element) => element.id === id)
    }

    const cartTotalCost = () => {
        return cartItems.reduce((acumulado, item) => acumulado = acumulado + (item.price * item.qty), 0)
    }

    useEffect(() => {
        if (cartItems.length > 0) {
            let cantidad = 0
            cartItems.forEach(item => cantidad = cantidad + item.qty)
            setTotalCartQty(cantidad)
        } else {
            setTotalCartQty(0)
        }
    }, [cartItems])

    return (
        <Provider value={{ cartItems, totalCartQty, addItem, removeItem, clear, cartTotalCost }}>
            {children}
        </Provider>
    )
}

export default CustomProvider
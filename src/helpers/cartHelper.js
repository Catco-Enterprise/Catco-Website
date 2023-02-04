export function addToCart(product, cartItems, setCartItems) {
    // Get the cart item from the useState variable 'cartItems' by the item ID
    const cartItem = cartItems.find((x) => x.id == product.id);

    // If this item is already in the cart
    if (cartItem) {
        // Add one to the quantity of the cart item
        cartItem.quantity++;

        // Update the useState variable 'cartItems' value
        setCartItems(cartItems);
    } else {
        // Item is not yet in the cart
        // Initialize property 'quantity' to 1
        product.quantity = 1;

        // Update the useState variable 'cartItems' and append the new item
        setCartItems((cartItems) => [...cartItems, product]);
    }

    // Update the cache item 'cartItems' with the value from the useState 'cartItems'
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    console.log(`${product.name} added to cart.`);
}

export function emptyCart(setCartItems) {
    // Update the useState variable 'cartItems' value to an empty array
    setCartItems([]);

    // Remove 'cartItems' from the cache
    localStorage.removeItem('cartItems');
}

export function minusQuantity(productId, cartItems, setCartItems) {
    // Get the cart item from the useState variable 'cartItems' by the item ID
    const cartItem = cartItems.find((x) => x.id == productId);

    if (cartItem) {
        // Subtract from the quantity of the cart item by 1
        cartItem.quantity -= 1;

        // If the cart item's quantity is 0, remove it from the array
        if (cartItem.quantity === 0) {
            const indexOfItem = cartItems.findIndex((x) => x.id === itemId);
            cartItems.splice(indexOfItem, 1);
        }

        // Update the useState variable 'cartItems' value
        setCartItems(cartItems);

        // Update the cache item 'cartItems' with the value from the useState 'cartItems'
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Reloading the page because the state isn't reflected on this action
        location.reload(false);
    }
}

export function plusQuantity(productId, cartItems, setCartItems) {
    // Get the cart item from the useState variable 'cartItems' by the item ID
    const cartItem = cartItems.find((x) => x.id === productId);

    if (cartItem) {
        // Add from the quantity of the cart item by 1
        cartItem.quantity++;

        // Update the useState variable 'cartItems' value
        setCartItems(cartItems);

        // Update the cache item 'cartItems' with the value from the useState 'cartItems'
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Reloading the page because the state isn't reflected on this action
        location.reload(false);
    }
}
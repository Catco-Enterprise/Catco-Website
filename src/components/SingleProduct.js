import { useLocation } from "react-router-dom";

const SingleProduct = () => {
    const { state } = useLocation()
    // const [oneProduct, setOneProduct] = useState(state);
    const oneProduct = state

    return (

        <div key={oneProduct.id}>
            <h2>{oneProduct.name}</h2>
            <h2>{oneProduct.description}</h2>
            <h2>{oneProduct.price}</h2>
            <h2>{oneProduct.stock}</h2>
        </div>
    )





}

export default SingleProduct;
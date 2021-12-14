import React, { useState } from 'react';
import axios from "axios";
import styles from '../components/Login.module.css';
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import Constants from "../components/Constants.json";


function ProductMaker() {

    const navigate = useNavigate();
    const params = useParams();
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const [state, setState] = useState({
        id_restaurant: params.id_restaurant,
        category: '',
        name: '',
        description: '',
        price: '',
    })

    function fileHandler(e) {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    function changeHandler(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    const submitHandler = async (e) => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("id_restaurant", state.id_restaurant);
        formData.append("name", state.name);
        formData.append("category", state.category);
        formData.append("description", state.description);
        formData.append("price", state.price);

        try {
            //sending to database
            const res = await axios.post(Constants.API_ADDRESS + `/products/add-product/${params.id_restaurant}`, formData);
            console.log(res);
            console.log('product added to menu!');
            navigate(`/profile/${params.id_customer}`, {replace: true});

        } catch (err) {
            console.log(err);
            console.log('error');
        }
    }

        return (
            <div className ={ styles.container }>
                <form onSubmit={submitHandler}>

                            <div>Category</div>
                            <input type="text"
                                   name="category"
                                   value={state.category}
                                   onChange={changeHandler} />

                            <div>Name</div>
                            <input type="text"
                                   name="name"
                                   value={state.name}
                                   onChange={changeHandler} />

                            <div>Description</div>
                            <input type="text"
                                   name="description"
                                   value={state.description}
                                   onChange={changeHandler} />

                            <div>Price</div>
                            <input type="text"
                                   name="price"
                                   value={state.price}
                                   onChange={changeHandler} />

                            <div>Image</div>
                            <input type="file"
                                   name="image"
                                   onChange={fileHandler}
                            />

                    <button type="submit">Create product</button>
                </form>
                <Link to={`/profile/restaurant/${params.id_manager}/${params.id_restaurant}`}>Back to restaurant profile</Link> <hr/><br/>
            </div>
        )
    }
export default ProductMaker;
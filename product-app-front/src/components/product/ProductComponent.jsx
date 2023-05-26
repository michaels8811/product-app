import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { retrieveProductApi, updateProductApi, createProductApi } from './api/ProductApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import './ProductComponent.css'

export default function ProductComponent() {
    
    const {id} = useParams()
    
    const[productcode, setProductcode] = useState('')
    const[productname, setProductname] = useState('')
    const[category, setCategory] = useState('')
    const[brand, setBrand] = useState('')
    const[type, setType] = useState('')
    const[productdesc, setProductdesc] = useState('')
    const isReadOnly = id !== "-1";
    const authContext = useAuth()
    const navigate = useNavigate()
    
    const username = authContext.username
    
    useEffect(
        () => retrieveProduct(),
        [id]
    )

    function retrieveProduct(){
        if(id != -1) {
            retrieveProductApi(id)
            .then(response => {
                setProductcode(response.data.productcode)
                setProductname(response.data.productname)
                setCategory(response.data.category)
                setBrand(response.data.brand)
                setType(response.data.type)
                setProductdesc(response.data.productdesc)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const product = {
          id: id === "-1" ? null : parseInt(id),
          productcode: values.productcode,
          productname: values.productname,
          category: values.category,
          brand: values.brand,
          type: values.type,
          productdesc: values.productdesc
        };

        if (id === "-1") {
          createProductApi(product)
            .then(response => {
              navigate('/product');
            })
            .catch(error => console.log(error));
        } else {
          updateProductApi(productcode, product)
            .then(response => {
              navigate('/product');
            })
            .catch(error => console.log(error));
        }
      }

    function validate(values) {
        let errors = {};
      
        if (values.productcode === undefined || values.productcode.length < 1) {
          errors.productcode = 'Product Code is Mandatory';
        }
        if (values.productname === undefined || values.productname.length < 1) {
          errors.productname = 'Product Name is Mandatory';
        }
        if (values.category === undefined || values.category.length < 1) {
          errors.category = 'Category is Mandatory';
        }
      
        return errors;
      }
      

    return (
        <div className="container">
            <h1>Enter Product Details </h1>
            <div>
                <Formik 
                    initialValues={{ productcode, productname, category, brand, type, productdesc }}
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="productcode"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <ErrorMessage 
                                name="productname"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <ErrorMessage 
                                name="category"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label className="bold-label">Code*:</label>
                                <Field type="text" className={`form-control ${isReadOnly ? 'read-only' : ''}`} name="productcode" readOnly={isReadOnly} />                            
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="bold-label">Name*:</label>
                                <Field type="text" className="form-control" name="productname" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="bold-label">Category*:</label>
                                <Field type="text" className="form-control" name="category" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="bold-label">Brand</label>
                                <Field type="text" className="form-control" name="brand" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="bold-label">Type</label>
                                <Field type="text" className="form-control" name="type" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="bold-label">Description</label>
                                <Field as="textarea" className="form-control" name="productdesc" />
                            </fieldset>

                            <div>
                            <button className="btn btn-success m-5" type="submit" disabled={!props.dirty || props.isSubmitting}>
                                Save
                            </button>                            
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>

        </div>
    )
}
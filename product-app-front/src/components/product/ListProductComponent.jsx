import { useEffect, useState, useMemo  } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllProductApi, deleteProductApi } from "./api/ProductApiService"
import { useAuth } from "./security/AuthContext"
import Pagination from "./Pagination"

let PageSize = 5;

function ListProductComponent() {

    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate()
    
    const [product,setProduct] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshProduct(), [])

     function refreshProduct() {
        
         retrieveAllProductApi()
        .then(response => {
            setProduct(response.data)
            setCurrentPage(1); // Reset to the first page
        }
            
        )
        .catch(error => console.log(error))
    
    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return product.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,product]);

    function deleteProduct(productcode) {
        console.log('clicked ' + productcode)
        deleteProductApi(productcode)
        .then(

            () => {
                setMessage(`Delete of product with code = ${productcode} successful`)
                refreshProduct()
            }

        )
        .catch(error => console.log(error))
    }

    function updateProduct(productcode) {
        console.log('clicked ' + productcode)
        navigate(`/product/${productcode}`)
    }

    function addNewProduct() {
        navigate(`/product/-1`)
    }

    return (
        <div className="container">
            
            {message && <div className="alert alert-warning">{message}</div>}

            
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>ID</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        currentTableData.map(
                            prod => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.productcode}</td>
                                    <td>{prod.productname}</td>
                                    <td>{prod.category}</td>
                                    <td>{prod.brand}</td>
                                    <td>{prod.type}</td>
                                    <td>{prod.productdesc}</td>

                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteProduct(prod.productcode)}>Delete</button> </td>
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateProduct(prod.productcode)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={product.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
            <div className="btn btn-success m-5" onClick={addNewProduct}>Add New Product</div>
        </div>
    )
}

export default ListProductComponent
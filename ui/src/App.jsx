/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint-disable react/prefer-stateless-function */

class ProductTable extends React.Component {
    render() {
        const productRows = this.props.products.map(product =>
            <ProductRow key={product.id} product={product} />);
        return (
            <table className="bordered">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Product Name</td>
                        <td>Price</td>
                        <td>Category</td>
                        <td>Image</td>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        );
    }
}

// function ProductRow(props) {
class ProductRow extends React.Component {
    render() {
        const products = this.props.product;
        return (
            <tr>
                <td>{products.id}</td>
                <td>{products.productName}</td>
                <td>${products.price}</td>
                <td>{products.category}</td>
                <td>
                    <a href={products.image} target="_blank">View</a>
                </td>
            </tr>
        );
    }
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const product = {
            price: document.querySelector('#price').value, productName: document.querySelector('#productName').value, image: document.querySelector('#image').value, category: document.querySelector('#category').value,
        }
        this.props.createProduct(product);
        document.querySelector('#price').value = "";
        document.querySelector('#productName').value = "";
        document.querySelector('#image').value = "";
        document.querySelector('#category').value = "";
    }

    render() {
        return (
            <form id="productForm" onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="category">Category</label><br />
                    <select name="category" id="category">
                        <option>Shirts</option>
                        <option>Jeans</option>
                        <option>Jackets</option>
                        <option>Sweaters</option>
                        <option>Accessories</option>
                    </select><br />
                    <label htmlFor="productName">Product Name</label><br />
                    <input type="text" name="productName" id="productName"></input><br />
                    <button>Add Product</button>
                </div>
                <div>
                    <label htmlFor="price">Price Per Unit</label><br />
                    <input type="text" name="price" id="price" placeholder="$"></input><br />
                    <label htmlFor="image">Image URL</label><br />
                    <input type="text" name="image" id="image"></input><br />
                </div>
            </form>
        );
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
          productList {
            id
            category
            productName
            price
            image
          }
        }`;

        const response = await fetch(window.ENV.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const body = await response.text();
        const result = JSON.parse(body);
        this.setState({ products: result.data.productList });
    }

    async createProduct(product) {
        const query = `mutation productAdd($product: ProductInputs!) {
              productAdd(product: $product) {
                id
              }
            }`;

        const response = await fetch(window.ENV.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { product } }),
        });

        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                <h2>My Company Inventory</h2>
                <div>Showing all available products</div>
                <hr />
                <br />
                <ProductTable products={this.state.products} />
                <br />
                <div>Add a new product to inventory</div>
                <hr />
                <br />
                <ProductAdd createProduct={this.createProduct} />
            </React.Fragment>
        );
    }
}

const application = <ProductList />;
ReactDOM.render(application, document.querySelector('#content'));
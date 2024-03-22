import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [products, setProducts] = useState([])
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    fetchData()
  }, [count])

  useEffect(() => {
    if (products.length === 100) setDisableButton(true)
    else setDisableButton(false)
  }, [products])

  async function fetchData() {
    try {
      setLoading(true)
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      )
      const data = await response.json()

      if (data && data.products && data.products.length) {
        setProducts((prevData) => [...prevData, ...data.products])
      }
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto mt-10">
      {loading && <p>Loading data...</p>}
      {errorMsg && <p>{errorMsg}</p>}
      <div className="grid grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto"
            />
            <p className="mt-2">{product.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          disabled={disableButton}
          onClick={() => setCount((prevCount) => prevCount + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Load More Products
        </button>
        {disableButton && (
          <p className="mt-2 text-gray-500">You have reached 100 products</p>
        )}
      </div>
    </div>
  )
}

export default App

import * as React from "react";
import axios from 'axios'
// import snap from './snap'

const App = () => {
    const [key, setKey] = React.useState('')
    const [first_name, setFirst_name] = React.useState('')
    const [last_name, setLast_name] = React.useState('')
    const [gross, setGross] = React.useState(0)

    const dataFetch = async () => {
        const response = await axios.post('http://localhost:3001/test', {
            first_name,
            last_name,
            gross
        })
        setKey(response?.data?.token)
    }
    React.useEffect(() => {
        key && snap.pay(key)
    }, [key])
    console.log(key)
    return (
        <>
            <input type="text" placeholder="nama depan" onChange={(e) => setFirst_name(e.target.value)} />
            <input type="text" placeholder="nama belakang" onChange={(e) => setLast_name(e.target.value)} />
            <input type="email" placeholder="email" />
            <input type="number" placeholder="harga" onChange={(e) => setGross(e.target.value)} />
            <button onClick={dataFetch}>click</button>
        </>
    )
}

export default App
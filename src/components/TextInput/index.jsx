import { useState } from "react"

const TextInput = () =>
{
    const [enteredTask, setEnteredTask] = useState(null)
    return (
        <section>
            <input type="text" onChange={(e) => setEnteredTask(e.target.value)} value={enteredTask} />
        </section>
    )
}

export default TextInput
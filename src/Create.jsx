import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Create() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(true);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const blog = { title, author, body };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        })
    }

    return(
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Blog content:</label>
                <textarea 
                    type="text"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <label>Blog author:</label>
                <input 
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {isPending ? <button>Add Blog</button> : <button disabled>Adding Blog...</button>}  
            </form>
        </div>
    );
}

export default Create
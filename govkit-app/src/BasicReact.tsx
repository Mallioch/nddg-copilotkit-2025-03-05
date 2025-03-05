import { useState } from "react"

export default function BasicReact() {

    const [count, setCount] = useState(0);
    const [showGif, setShowGif] = useState(false);

    const clickHandler = () => {
        setCount(count + 1);
    }

    const showGifHandler = () => {
        setShowGif(!showGif);
    }

    let gif = null;
    if (showGif) {
        gif = <img src="react-render-steps.gif" />
    }

    return (
        <>
            <h1 className="text-3xl mb-4">Basic React</h1>

            <p className="m-4">This is the page where we'll see basic React. Start by clicking the button below.</p>

            <button onClick={clickHandler} className="border-1 border-black p-2">Click me!</button>

            <p className="m-4">Count: {count}</p>

            <p className="mt-10 mb-3">Okay, so how does this work? <b onClick={showGifHandler}>Toggle Gif!</b></p>

            {gif}

            <p className="mt-10 mb-3">"I want to create React apps. How do I start?" Create an app using <a href="https://vite.dev/guide/" target="_blank" className="underline">Vite</a> and start coding.</p>
        </>
    )
}
import { useEffect, useState } from 'react';

function Shootout() {
    const [count, setCount] = useState(0);
    const [displayAllCount, setDisplayAllCount] = useState([]);
    const [message, setMessage] = useState('');
    const [condition, setCondition] = useState('');

    useEffect(() => {
        const paces = setTimeout(() => {
            if (count < 10) {
                setCount(count + 1);
                setDisplayAllCount((counts) => [...counts, count + 1]);
            } else {
                // Generates a delay after 10 paces before rendering a signal to press a key
                const randomDelay = (Math.floor(Math.random() * 5) + 1) * 1000;
                setTimeout(() => {
                    setMessage('He draws.....');

                    const defeat = setTimeout(() => {
                        setCondition('And shoots. You are dead.');
                        window.removeEventListener('keydown', victory);
                    }, 300); // Time limit to press a key

                    function victory() {
                        clearTimeout(defeat);
                        setCondition('But you shoot first. You killed him.');
                    }
                    window.addEventListener('keydown', victory);
                }, randomDelay);
            }
        }, 1000);
        return () => clearTimeout(paces);
    }, [count]);

    return (
        <div>
            <h1>Cowboy Shootout</h1>
            <p>
                You are back to back
                <br />
                Take 10 paces...
                <br />
            </p>
            <p>
                {displayAllCount.map((count) => (
                    <p>{count}...</p>
                ))}
            </p>
            <p>{message}</p>
            <p>{condition}</p>
        </div>
    );
}

export default Shootout;

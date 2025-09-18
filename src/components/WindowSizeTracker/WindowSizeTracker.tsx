import { useState, useEffect} from "react";
import "./WindowSizeTracker.scss";

export default function WindowSizeTracker() {
    const [size, setSize] = useState({ 
        width: window.innerWidth, 
        height: window.innerHeight 
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);
    
    return (
        <div className="window-size-tracker">
            <h2>Window Size Tracker</h2>
            <p>Width: {size.width}px</p>
            <p>Height: {size.height}px</p>
        </div>
    )
}

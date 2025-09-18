import { useState, useEffect} from "react";
import "./ColorManager.scss";

export default function ColorManager() {
    const [colors, setColors] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [error, setError] = useState("");

    const addColor= (color:string) => {
        const colorTrimmed = color.trim();
        if (colorTrimmed === "") return; 

        if(!isValidCssColor(colorTrimmed)) {
            return;
        }

        if (colors.includes(colorTrimmed)) {
            setError(`"${colorTrimmed}" ya está en la lista`);
            return;
        }

        setColors([...colors, color]);
        setInputValue("");
    }

    useEffect(() => {
        if (selectedColor) {
            document.body.style.backgroundColor = selectedColor;
        }
    }, [selectedColor]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const isValidCssColor = (color: string): boolean => {
        const s = new Option().style;
        s.color = color;
        return s.color !== "";
    };

    return (
        <div className="container">
            <h1>Color Manager</h1>
            <div className="color-manager">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe un color..."
                />
                <button onClick={() => addColor(inputValue)}>Add Color</button>  
                {error && <p className="error">{error}</p>}  
            </div> 

            <div className="color-list">
                {colors.map((color, index) => (
                    <div 
                        key={index} 
                        className="color-box" 
                        style={{ backgroundColor: color }}
                        onClick={()=>setSelectedColor(color)}
                    >
                        {color}
                    </div>
                ))}
            </div>
        </div>
    )
}

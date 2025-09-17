import { useState, useEffect} from "react";
import "./ColorManager.scss";

export default function ColorManager() {
    const [colors, setColors] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const addColor= (color:string) => {
        if (color.trim() === "") return; 

        if(!isValidCssColor(color)) {
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
                    placeholder="Escribe un color: #rrggbb"
                />
                <button onClick={() => addColor(inputValue)}>Add Color</button>    
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

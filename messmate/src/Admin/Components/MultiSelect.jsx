import { useState } from "react";
import closeBtnpic from "../../Svg/close.svg";

const MultiSelect = ({ thing, setMenu , Menu}) => {
    const [tag1, setTag1 ] = useState("");
    
    const addOption = () => {
        console.log("not add space in this area");
        // setList((prev) => [...prev, tag1]);
        setMenu(() =>[...Menu, tag1]);
        setTag1("");
    };

    const removeOption = (value) => {
        setMenu((prev) =>{
            return prev.filter((option) => option !== value)

        });
    };
    return(
        <>
        
        </>
    )
}
export default MultiSelect;

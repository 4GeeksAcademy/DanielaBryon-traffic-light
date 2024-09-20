import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component



const TrafficLight = () => {
	const [ currentColor, setCurrentColor] = useState("red");
	const [ colors, setColors] = useState(["red", "yellow", "green",]);
	const [ intervalId, setIntervalId] = useState(null);
	const [ purpleAdded, setPurpleAdded] = useState (false);
	const [ isChanging, setIsChanging] = useState(false);


    
    //función que cambia el color actual manualmente
	const changeColor = (color) => {
		setCurrentColor(color);
	};

	//color violeta
	const addPurple = () => {
		setColors((prev) => purpleAdded ? prev.filter(c => c !== "purple") : [...prev, "purple"]);
		setPurpleAdded(!purpleAdded);
    
	// cambiar color automáticamente
	const startAutoChange = () => {
		if (!intervalId) {   // inicia si no hay un intervalo en curso
			const id = setInterval (() => {
				const randomColor = colors[Math.floor(Math.random() * colors.length)];
				setCurrentColor(randomColor);
			}, 1000); // cambia cada segundo
			setIntervalId(id);
			setIsChanging(true);
		} else {
			clearInterval(intervalId);
			setIntervalId(null);
			setIsChanging(false);
		}
	};
	
	// limpiar el intervalo al desmontar el componente
	useEffect (() => () => clearInterval(intervalId), [intervalId]);

	return (
		<div className = "container">
			<h1>Traffic Light</h1>
			<div className="traffic-lights">
				{colors.map((color) => (
					<span
					    key = {color}
					    className = {`circle-lights ${color} ${currentColor === color ? "glow" : ""}`}
					    onClick = {() => changeColor(color)}
					></span>
				))}
			</div>
			<div className="base"></div>
			<button onClick={addPurple}>
				{purpleAdded ? "Delete purple" : "Add purple"}   
			</button>
			<button onClick={startAutoChange}>
				{isChanging ? "Stop change" : "Start change"}
			</button>
		</div>
	);
};		


export default TrafficLight;
ReactDOM.render(<TrafficLight />, document.querySelector('#app'));

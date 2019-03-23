import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import BodyText from '@enact/moonstone/BodyText';
import Popup from '@enact/moonstone/Popup';
import React from 'react';
import Uppercase from '@enact/i18n/Uppercase/Uppercase';

const Networking = require('../networking/Networking.js');
const Promise = require ('promise');

export default class MainPanel extends React.Component {

	state = {
		clicked: false,
		name: ''
	}

	updateBLE(self) {
		// do whatever you like here
		let getBle = Promise.denodeify(Networking.getBLE);
		getBle().then((json) => {
			console.log(json);
			console.log(json.ble)
			if (json.ble !== '' && json.ble !== undefined) {
				console.log('changing state');
				self.setState({clicked: true});
				self.setState({name: json.name});
			} else {
				console.log('to false');
				self.setState({clicked: false});
			}
		});	
	}

	componentDidMount(){
		setInterval(this.updateBLE.bind(null,this), 100);
	}

	//<Button onClick={()=>{this.setState({clicked:true})}}>Click me!</Button>
	render(){  
		return (
				<Panel>
					<Popup open={this.state.clicked} onClick={()=>{this.setState({clicked:false})}}> Hola {this.state.name}. Ahora aléjalo! </Popup>
					<BodyText onClick={()=>{this.setState({clicked:true})}} >
						Acerca tu teléfono móvil con la aplicación abierta o utiliza el API para cambiar los valores.
					</BodyText>	
				</Panel>
		);
	}
}

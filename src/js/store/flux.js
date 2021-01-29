const BASE_URL = "http://localhost:3000/";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [], //de nuestra api en particular se reciben listas que estamos mentiendo en otra lista
			singleContact: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: async (id = null) => {
				//si id es nulo hace fetch toda la agenda
				let url = `${BASE_URL}contact`;
				if (id != null) {
					url += "/" + id;
				}
				let response = await fetch(url);
				if (response.ok) {
					let body = await response.json();
					if (id == null) {
						setStore({
							contacts: body
						});
					} else {
						setStore({
							singleContact: body
						});
					}
					return true;
				} else {
					console.log(response.status);
					return false;
				}

				// try {
				// 	let response = await fetch(url);
				// 	let responseObject = await response.json(); //parchear la respuesta json
				// 	//la siguiente sección de código pretende extraer la lista anidada

				// 	//aquí termina esa sección de código
				// 	setStore({
				// 		contacts: responseObject.results
				// 	});
				// } catch (error) {
				// 	console.log(error);
				// }
			},

			deleteContact: async id => {
				let action = getActions(); //hay que hacerlo cuando hay una función del action contenida dentro de esta función
				let url = `${BASE_URL}contact/${id}`;
				let response = await fetch(url, {
					method: "DELETE"
				});
				if (response.ok) {
					await action.getContacts();
					return true;
				} else {
					console.log(response.status);
					return false;
				}
			}
		}
	};
};

export default getState;

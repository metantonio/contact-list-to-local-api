const BASE_URL = "https://assets.breatheco.de/apis/fake/contact/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getAgenda: () => {
				let url = `${BASE_URL}agenda/metantonio`;
				fetch(url)
					.then(response => response.json())
					.then(myContactList =>
						setStore({
							contacts: myContactList
						})
					);
			}
		}
	};
};

export default getState;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		/*LÓGICA PARA REGISTRARSE --------------------------------------------------------AITOR*/
		/*Esta función maneja el registro de un usuario enviando los datos del formulario al backend,
		procesa la respuesta, guarda el token en localStorage, y devuelve un valor booleano basado en si el registro fue exitoso o no.*/
		actions: {
			register: async(formData) => {
				try{
					const resp = await fetch( process.env.BACKEND_URL+'/api/register', { /*pedido fetch al backend*/
						method: 'POST',
						headers: {
							'Content-Type': 'application/json' 
						},
						body: JSON.stringify(formData) /*convertimos el formData en cadena JSON*/
					})
					if (!resp.ok) throw new Error ('Algo fue mal') /*mensaje error si la resp del fetch no es correcta*/
					const data = await resp.json() /*la respuesta del servidor es transformada en un objeto JSON*/
					localStorage.setItem('token', data.token) /*se guarda el token recibido de la resp del servidor en localStorage para su uso posterior*/
					return true /*Para la navegación y que cambie de página si estamos registrados*/
				} catch(error){
					console.log(error)
					return false
				}
			},
			/*LÓGICA PARA LOGIN --------------------------------------------------------AITOR*/
			login: async(formData) => {
				try{
					const resp = await fetch( process.env.BACKEND_URL+'/api/login', { /*Backend Url*/
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if (!resp.ok) throw new Error ('Algo fue mal')
					const data = await resp.json()
					localStorage.setItem('token', data.token) /*Toke es nombre de la propiedad y data.token el valor*/
					return true /*Para la navegación y que cambie de página si estamos registrados*/
				} catch(error){
					console.log(error)
					return false
				}
			},
			/*LÓGICA PARA CHECK --------------------------------------------------------AITOR*/
			checkUser: async () => {
				try {
					const resp = await fetch( process.env.BACKEND_URL+'/api/protected', { /*Backend Url*/
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					})
					if (!resp.ok) throw new Error ('Algo fue mal')
					if (resp.status!==200) throw new Error ('Algo fue mal')
						
					const data = await resp.json()
					console.log(data)
					setStore({user: data.user}) /*Aquí recibimos la información del usuario*/
					return true /*Para la navegación y que cambie de página si estamos registrados*/
				} catch (error) {
					console.log(error)
					return false
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
		


			
			/* SGC ADDED */
			    // Get posts for a specific forum
				getForumPosts: async (forumId) => {
					try {
						const resp = await fetch(process.env.BACKEND_URL + `/api/forums/${forumId}/posts`, {
							headers: {
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							}
						});
						if (!resp.ok) throw new Error('Failed to fetch posts');
						const data = await resp.json();
						setStore({ currentForumPosts: data });
						return data;
					} catch (error) {
						console.error('Error loading posts:', error);
						return null;
					}
				},
				
				
				createForumPost: async (forumId, content) => {
					try {
						const resp = await fetch(process.env.BACKEND_URL + `/api/forums/${forumId}/posts`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							},
							body: JSON.stringify({ content })
						});
						if (!resp.ok) throw new Error('Failed to create post');
						const data = await resp.json();
						
						// Refresh posts after creating new one
						getActions().getForumPosts(forumId);
						return true;
					} catch (error) {
						console.error('Error creating post:', error);
						return false;
					}
				},
			
				// Add this to your actions object in flux.js
createComment: async (postId, content) => {
    try {
        const resp = await fetch(process.env.BACKEND_URL + `/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ content })
        });
        return resp.ok;
    } catch (error) {
        console.error('Error creating comment:', error);
        return false;
    }

},

getPostComments: async (postId) => {
    try {
        const resp = await fetch(process.env.BACKEND_URL + `/api/posts/${postId}/comments`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!resp.ok) throw new Error('Failed to fetch comments');
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error loading comments:', error);
        return null;
    }
}
		}
	};
};

export default getState;


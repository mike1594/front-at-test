const apiREST = {

    getVuelos: async (currentPage, limit = 6) => {
        const res = await fetch(`http://localhost:3000/api/productos/vuelos?page=${currentPage}&limit=${limit}`);
        const data = await res.json();
        return data;
    },
    // GET: Buscar un vuelo por su ID
    getFindVuelo: async (id) => {       
        const res = await fetch(`http://localhost:3000/api/productos/vuelos/${id}`);
        const data = await res.json();
        return data;
    },

     // POST: Crear un nuevo vuelo
     createVuelo: async (vueloData) => {
        try {
            const res = await fetch(`http://localhost:3000/api/productos/vuelos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vueloData),
            });
            if (!res.ok) {
                throw new Error('Error al crear el vuelo');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

     // POST: Crear un reserva de  vuelo
     createReserva: async (reservaData) => {
        try {
            const res = await fetch(`http://localhost:3000/api/ordenes/reserva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservaData),
            });
            if (!res.ok) {
                throw new Error('Error al crear reserva de vuelo');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // PUT: Actualizar un vuelo existente por su ID
    updateVuelo: async (id, vueloData) => {
        try {
            const res = await fetch(`http://localhost:3000/api/productos/vuelos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vueloData),
            });
            if (!res.ok) {
                throw new Error('Error al actualizar el vuelo');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // DELETE: Eliminar un vuelo por su ID
    deleteVuelo: async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/productos/vuelos/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Error al eliminar el vuelo');
            }
            return { message: 'Vuelo eliminado correctamente' };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
   
  };
  
  export default apiREST;
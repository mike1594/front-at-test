"use client";
import { useEffect, useState, use } from 'react';
//import apiREST from "./api/vuelos-api/vuelos";
import apiREST from '@/app/api/vuelos-api/vuelos';
import { BeatLoader } from 'react-spinners';

function Stepper({ currentStep }) {
  return (
    <div className="w-full bg-white py-4 border-b border-gray-300">
      <div className="max-w-screen-lg mx-auto">
        <ul className="flex items-center justify-between">
          <li
            className={`flex items-center space-x-2 ${currentStep >= 1 ? "text-blue-900" : "text-gray-500"}`}
            data-testid={currentStep > 1 ? "visited-step" : "current-step"}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full ${currentStep > 1 ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-600"}`}>
              {currentStep > 1 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path>
                </svg>
              ) : (
                <span>1</span>
              )}
            </div>
            <span className="text-sm font-semibold">Selección de vuelos</span>
          </li>
          <li
            className={`flex items-center space-x-2 ${currentStep === 2 ? "text-blue-900" : "text-gray-500"}`}
            data-testid="not-visited-step"
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full ${currentStep === 2 ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-600"}`}>
              2
            </div>
            <span className="text-sm font-semibold">Pago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function DetalleVuelo({ params}) {
  //const { origen, destino, fechaSalida, fechaLlegada, duracion, precio, aerolinea} = router.query;
  const [currentStep, setCurrentStep] = useState(1);
  const [products, setProducts] = useState([]);
  const idParams = use(params);  
  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [confirmCorreo, setConfirmCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const [nombreError, setNombreError] = useState('');
  const [apellidoError, setApellidoError] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [confirmCorreoError, setConfirmCorreoError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlPago, setUrlPago] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiREST.getFindVuelo(idParams.id);     
      if (res && Array.isArray(res.data)) {
        // Si la respuesta es un array de productos (varios vuelos)
        setProducts(res.data);
      } else if (res && typeof res === 'object' && res.id) {
        console.log([res])
        // Si la respuesta es un solo objeto de vuelo
        setProducts([res]); // Lo colocamos dentro de un array para mantener consistencia con la UI
      } else {
        console.error('Unexpected response format', res);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []); 

  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(capitalizeFirstLetter(value));
    if (value.trim() === '') {
      setNombreError('Debe ingresar su nombre.');
    } else {
      setNombreError('');
    }
  };

  const handleApellidoChange = (e) => {
    const value = e.target.value;
    setApellido(capitalizeFirstLetter(value));
    if (value.trim() === '') {
      setApellidoError('Debe ingresar su apellido.');
    } else {
      setApellidoError('');
    }
  };

  const handleCorreoChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    const emailRegex = /^[a-zA-Z0-9._@]+$/;
    if (value.trim() === '' || !emailRegex.test(value)) {
      setCorreoError('Debe ingresar una dirección de correo electrónico válida. Los caracteres aceptables son de la "A" a la "Z", del "0" al "9", "@", "_" y ".".');
    } else {
      setCorreoError('');
    }
  };

  const handleConfirmCorreoChange = (e) => {
    const value = e.target.value;
    setConfirmCorreo(value);
    if (value !== correo) {
      setConfirmCorreoError('La dirección de correo electrónico no coincide.');
    } else {
      setConfirmCorreoError('');
    }
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);
    if (value.trim() === '' || isNaN(value)) {
      setTelefonoError('Debe ingresar un número de teléfono válido.');
    } else {
      setTelefonoError('');
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleBlur = (field) => {
    if (field === 'nombre' && nombre.trim() === '') {
      setNombreError('Debe ingresar su nombre.');
    }
    if (field === 'apellido' && apellido.trim() === '') {
      setApellidoError('Debe ingresar su apellido.');
    }
    if (field === 'correo' && (correo.trim() === '' || correoError !== '')) {
      setCorreoError('Debe ingresar una dirección de correo electrónico válida. Los caracteres aceptables son de la "A" a la "Z", del "0" al "9", "@", "_" y ".".');
    }

    if (field === 'confirmCorreo' && confirmCorreo !== correo) {
      setConfirmCorreoError('La dirección de correo electrónico no coincide.');
    }
    if (field === 'telefono' && (telefono.trim() === '' || telefonoError !== '')) {
      setTelefonoError('Debe ingresar un número de teléfono válido.');
    }
  };


  const goToNextStep = async () => {
    if (nombre.trim() === '') {
      setNombreError('Debe ingresar su nombre.');
    }
    if (apellido.trim() === '') {
      setApellidoError('Debe ingresar su apellido.');
    }
    if (correo.trim() === '' || correoError !== '') {
      setCorreoError('Debe ingresar una dirección de correo electrónico válida. Los caracteres aceptables son de la "A" a la "Z", del "0" al "9", "@", "_" y ".".');
    }

    if (confirmCorreo !== correo) {
      setConfirmCorreoError('La dirección de correo electrónico no coincide.');
    }
    if (telefono.trim() === '' || telefonoError !== '') {
      setTelefonoError('Debe ingresar un número de teléfono válido.');
    }

    if (
      nombre.trim() !== '' &&
      apellido.trim() !== '' &&
      correo.trim() !== '' &&
      correoError === '' &&
      confirmCorreo === correo &&
      telefono.trim() !== '' &&
      telefonoError === ''
    ) {
      if (currentStep === 1) {
        handleCreateReserva();
      } else if (currentStep === 2) {
        handleCreateReserva();
      } 
    }
  };

  const handleCreateReserva = async () => {
    // Perform the post request to reserve the order
    try {
      const response = await apiREST.createReserva({
        cliente: {
          nombres: nombre,
          apellidos: apellido,
          email: correo,
          telefono: telefono,
        },
        items: [
          {
            productoId: products[0].id,
            cantidad: 1,
            precio: parseFloat(products[0].precio),
          },
        ],
      });

      if (response && response.ok) {
        console.log('Orden de reserva realizada con éxito');
        setUrlPago(response.paymentSession.url); // Guardar la URL de pago
        // Mostrar modal antes de redirigir
        setTimeout(() => {
          window.open(response.paymentSession.url, '_blank');
        }, 3000);
        
        setCurrentStep(currentStep + 1); // Avanzar a la página de pago si la orden se crea correctamente
      }
    } catch (error) {
      console.error('Error al realizar la orden de reserva', error);
    } finally {
      setLoading(false);
    }
    
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8 grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <Stepper currentStep={currentStep} />
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Información de contacto de todos los pasajeros</h2>
            <form className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo electrónico *</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                  value={correo}
                  onChange={handleCorreoChange}
                  onBlur={() => handleBlur('correo')}
                  required
                  aria-describedby="correo-error"
                  placeholder="Correo electrónico"
                />
                {correoError && (
                  <div
                    aria-live="assertive"
                    id="correo-error"
                    className="text-red-500 mt-1 flex items-center space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25rem"
                      height="1.25rem"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
                    </svg>
                    <span>{correoError}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar dirección de correo electrónico *</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                  value={confirmCorreo}
                  onChange={handleConfirmCorreoChange}
                  onBlur={() => handleBlur('confirmCorreo')}
                  required
                  placeholder="Confirmar correo electrónico"
                  aria-describedby="confirmCorreo-error"
                />
                {confirmCorreoError && (
                  <div
                    aria-live="assertive"
                    id="confirmCorreo-error"
                    className="text-red-500 mt-1 flex items-center space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25rem"
                      height="1.25rem"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
                    </svg>
                    <span>{confirmCorreoError}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de teléfono móvil *</label>
                <div className="flex mt-1">
                  <select className="border border-gray-300 p-2 rounded-l-md">
                    <option value="+51">+51</option>
                  </select>
                  <input
                    type="tel"
                    className="flex-grow border border-gray-300 p-2 rounded-r-md"
                    value={telefono}
                    onChange={handleTelefonoChange}
                    onBlur={() => handleBlur('telefono')}
                    required
                    aria-describedby="telefono-error"
                    placeholder="Introduce tu número."
                  />
                </div>
                {telefonoError && (
                  <div
                    aria-live="assertive"
                    id="telefono-error"
                    className="text-red-500 mt-1 flex items-center space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25rem"
                      height="1.25rem"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
                    </svg>
                    <span>{telefonoError}</span>
                  </div>
                )}
              </div>              
            </form>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Pasajero 1, adulto</h3>
              <p className="text-sm mb-4">*Campo requerido</p>
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <p>Ingresa tu nombre y apellido exactamente como aparecen en tu pasaporte/identificación para evitar problemas en el aeropuerto. Si tienes un segundo nombre, ingrésalo en el campo del nombre.</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Sexo *</label>
                <div className="flex items-center mt-2">
                  <label className="mr-4">
                    <input type="radio" name="sexo" value="Sr." className="mr-1" /> Sr.
                  </label>
                  <label>
                    <input type="radio" name="sexo" value="Sra." className="mr-1" /> Sra.
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                    value={nombre}
                    onChange={handleNombreChange}
                    onBlur={() => handleBlur('nombre')}
                    required
                    aria-describedby="nombre-error"
                  />
                  {nombreError && (
                    <div
                      aria-live="assertive"
                      id="nombre-error"
                      className="text-red-500 mt-1 flex items-center space-x-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.25rem"
                        height="1.25rem"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
                      </svg>
                      <span>{nombreError}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido *</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                    value={apellido}
                    onChange={handleApellidoChange}
                    onBlur={() => handleBlur('apellido')}
                    required
                    aria-describedby="apellido-error"
                  />
                  {apellidoError && (
                    <div
                      aria-live="assertive"
                      id="apellido-error"
                      className="text-red-500 mt-1 flex items-center space-x-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.25rem"
                        height="1.25rem"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
                      </svg>
                      <span>{apellidoError}</span>
                    </div>
                  )}
                </div>
              </div>            
            </div>            
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Pago</h2>
            <p>Para completar el pago, haga clic en el siguiente botón:</p>
              <button
                onClick={() => window.open(urlPago, '_blank')}
                className="bg-green-600 text-white px-4 py-2 rounded-md mt-4"
              >
                Ir a Pagar
              </button>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={goToNextStep}
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-4"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#ffffff" size={10} /> : 'Continuar'}     
          </button>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="col-span-1">
          {products.length > 0 && products[0] && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Su pedido</h2>
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Salida</h3>          
                  <p className="text-sm">{products[0].fechaSalida ? new Date(products[0].fechaSalida).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : ''}</p>
                  <p className="text-sm font-semibold">{products[0].fechaSalida && products[0].fechaLlegada ?
                    `${new Date(products[0].fechaSalida).getUTCHours().toString().padStart(2, '0')}:${new Date(products[0].fechaSalida).getUTCMinutes().toString().padStart(2, '0')} - ${new Date(products[0].fechaLlegada).getUTCHours().toString().padStart(2, '0')}:${new Date(products[0].fechaLlegada).getUTCMinutes().toString().padStart(2, '0')} (${Math.floor(products[0].duracion / 60)}h ${products[0].duracion % 60}min)` : ''}</p>
                  <p className="text-sm">{products[0].origen} - {products[0].destino} {products[0].aerolinea}</p>           
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{nombre} {apellido}, adulto</h3>                
                <p className="text-sm">Precio por adulto: S/.{products[0].precio ? products[0].precio.toFixed(2) : '0.00'}</p>           
                <p className="text-sm font-semibold">Total: S/.{products[0].precio ? products[0].precio.toFixed(2) : '0.00'}</p>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-lg font-semibold">Importe total</h3>
                <p className="text-sm">Subtotal: S/.{products[0].precio ? products[0].precio.toFixed(2) : '0.00'}</p>           
                <p className="text-sm font-semibold">Importe que se debe pagar: S/.{products[0].precio ? products[0].precio.toFixed(2) : '0.00'}</p>
              </div>
            </>
          )}       
                     
        </div>
      )}
    </div>
  );
}
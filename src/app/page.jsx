"use client"
import apiREST from "./api/vuelos-api/vuelos";
/*import { useEffect, useState } from 'react';*/

import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function App() {

  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiREST.getVuelos(currentPage, 6);
      console.log(`Fetching page: ${currentPage}`);
      console.log('Response data:', JSON.stringify(res, null, 2));
      if (res && res.data && Array.isArray(res.data)) {        
        setProducts(res.data);
        setTotalPages(res.metaData.ultimaPagina);
      } else {
        console.error('Unexpected response format', res);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }; 

  const handleSelectFlight = (selectedProduct) => {
    window.location = '/detalle-vuelo/'+selectedProduct.id;    
  };
  
  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Navbar */}
      <nav className="bg-blue-900 p-6">
        <h1 className="text-4xl font-bold text-center text-white">Vuelos Aereos - Prueba Tecnica</h1>
      </nav>

      <div className="p-8">
        <div className="grid grid-cols-4 gap-6 mb-10">
          {/* Sidebar filters */}
          <div className="col-span-1 bg-gray-100 p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Cantidad de escalas</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="escala" className="mr-2" />
                Vuelo directo
              </label>
              <label className="flex items-center">
                <input type="radio" name="escala" className="mr-2" />
                Máximo una escala
              </label>
              <label className="flex items-center">
                <input type="radio" name="escala" className="mr-2" defaultChecked />
                Todo
              </label>
              <label className="flex items-center mt-4">
                <input type="checkbox" className="mr-2" />
                Mostrar vuelos sin Autotransferencia
              </label>
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-4">Precio</h2>
            <input type="range" min="322.47" max="1106.88" className="w-full" />

            <h2 className="text-lg font-semibold mt-6 mb-4">Aerolíneas</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                Euroairlines
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                Hahnair Technologies
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                LATAM
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                Sky Airline
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                Star Peru
              </label>
            </div>
          </div>

         {/* Products list */}
         <div className="col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-md shadow-md flex justify-between items-center"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="bg-gray-200 text-sm font-bold px-3 py-1 rounded-md">Menos tiempo de vuelo</span>
                    </div>
                    <div className="mb-4">
                      <h2 className="font-bold text-lg">Salida <span className="font-normal">{new Date(product.fechaSalida).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} · {product.aerolinea}</span></h2>
                      <div className="flex items-center mt-2">
                        <div className="text-3xl font-bold">{`${new Date(product.fechaSalida).getUTCHours().toString().padStart(2, '0')}:${new Date(product.fechaSalida).getUTCMinutes().toString().padStart(2, '0')}`}</div>
                        <div className="mx-4">
                          <p className="text-gray-500 text-sm">{product.origen}</p>
                        </div>
                        <div className="flex-1 text-center">
                          <p className="text-gray-500">{Math.floor(product.duracion / 60)}h {product.duracion % 60}min</p>
                          <p className="text-gray-500">Vuelo directo</p>
                        </div>
                        <div className="mx-4">
                          <p className="text-gray-500 text-sm">{product.destino}</p>
                        </div>
                        <div className="text-3xl font-bold">{`${new Date(product.fechaLlegada).getUTCHours().toString().padStart(2, '0')}:${new Date(product.fechaLlegada).getUTCMinutes().toString().padStart(2, '0')}`}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-center mb-4">
                      <div className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" role="presentation">
                          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"></path>
                        </svg>
                      </div>
                      <div className="text-sm text-gray-500">1 | 0 | 0</div>
                    </div>
                    <p className="text-3xl font-bold text-blue-900 mb-2">S/.{product.precio.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mb-4">Precio por adulto</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md"
                      onClick={() => openModal(product)}
                    >
                      Ver viaje
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
              <p>Página {currentPage} de {totalPages}</p>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal lateral */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6 flex justify-between items-center">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {selectedProduct?.origen} - {selectedProduct?.destino}
                        </Dialog.Title>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Close panel</span>
                          &#x2715;
                        </button>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <h3 className="text-lg font-bold">Itinerario</h3>
                        <p>{new Date(selectedProduct?.fechaSalida).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} · Economy</p>
                        <div className="mt-4">
                          <div className="text-3xl font-bold">{`${new Date(selectedProduct?.fechaSalida).getUTCHours().toString().padStart(2, '0')}:${new Date(selectedProduct?.fechaSalida).getUTCMinutes().toString().padStart(2, '0')}`} - {`${new Date(selectedProduct?.fechaLlegada).getUTCHours().toString().padStart(2, '0')}:${new Date(selectedProduct?.fechaLlegada).getUTCMinutes().toString().padStart(2, '0')}`}</div>
                          <p>{selectedProduct?.origen} - {selectedProduct?.destino}</p>
                          <p className="mt-2 text-gray-500">{Math.floor(selectedProduct?.duracion / 60)}h {selectedProduct?.duracion % 60}min</p>
                        </div>
                        <h3 className="mt-6 text-lg font-bold">Precio</h3>
                        <p className="text-3xl font-bold text-blue-900 mb-2">S/.{selectedProduct?.precio.toFixed(2)}</p>
                        <h3 className="mt-6 text-lg font-bold">Equipaje</h3>
                        <p className="text-gray-500">por persona</p>
                        <div className="mt-4 text-gray-500">0 | 1 | 1</div>
                        <div className="mt-6">

                        <button
                          className="w-full bg-blue-600 text-white px-6 py-2 rounded-md"
                          onClick={() => handleSelectFlight(selectedProduct)}
                        >
                          Seleccionar
                        </button>
                        
                        {/* <Link href="/detalle-vuelo" passHref>
                            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md">Seleccionar</button>
                          </Link> */}
                         {/*  <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md" onClick={() => handlePay(selectedProduct)}>Seleccionar</button> */}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );  
}
export default App;
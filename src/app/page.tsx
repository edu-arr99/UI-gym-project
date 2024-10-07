'use client';

import React, { useState } from 'react';

interface Promotion {
  promocion_id: number;
  monto: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  dni?: string;
}

interface UserData {
  dni?: string;
  membershipStatus?: "invitado" | "activa" | "inactiva"; 
  nombre?: string;
  apellido?: string;
  email?: string;
}

// DNI Input Page
const DNIInputPage: React.FC<{ onSubmit: (dni: string) => void }> = ({ onSubmit }) => {
  const [dni, setDni] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsLoading(true);
    onSubmit(dni);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gym-red dark:text-gym-orange">Gimnasio Jeredumar</h1>
      <h2 className="text-xl font-semibold text-center mb-8 text-gym-orange dark:text-gray-300">¡Deja de codear, y anda a entrenar!</h2>
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Ingrese su DNI:</h3>
      <input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDni(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-gym-bg-light dark:bg-gray-700 text-gray-800 dark:text-white"
      />
      <button 
        onClick={handleSubmit} 
        className="w-full bg-gym-red hover:bg-gym-red-dark dark:bg-gym-orange dark:hover:bg-gym-orange-dark text-white p-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Buscando...' : 'Revisar membresía'}
      </button>
    </div>
  );
};

// Membership Status Page
const MembershipStatusPage: React.FC<{
  status: string;
  dni: string;
  nombre: string;
  onRenew: () => void;
  onUpdate: () => void;
  onCancel: () => void;
}> = ({ status, dni, nombre, onRenew, onUpdate, onCancel }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-orange-400">Membresías de {nombre ? nombre : dni}</h2>
      <p className="text-lg mb-4 text-gray-800 dark:text-white">
        Su membresía está <strong>{status}</strong>.
      </p>
      <div className="flex flex-col space-y-2">
        <button 
          onClick={onRenew} 
          className="bg-red-500 hover:bg-red-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white p-2 rounded"
        >
          Renovar membresía
        </button>
        <button 
          onClick={onUpdate} 
          className="bg-orange-500 hover:bg-orange-600 dark:bg-red-500 dark:hover:bg-red-600 text-white p-2 rounded"
        >
          Editar información de perfil
        </button>
        <button 
          onClick={onCancel} 
          className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 text-white p-2 rounded"
        >
          Cancelar membresía
        </button>
      </div>
    </div>
  );
};

// Promotions Page
const PromotionsPage: React.FC<{
  promotions: Promotion[];
  onSelect: (id: number) => void;
}> = ({ promotions, onSelect }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-orange-400">Promociones disponibles</h2>
      {promotions.length > 0 ? (
        <ul className="space-y-4">
          {promotions.map((promo) => (
            <li key={promo.promocion_id} className="flex flex-col space-y-2 text-gray-800 dark:text-white">
              <span className="font-semibold">{promo.nombre}</span>
              <span className="text-sm">{promo.descripcion}</span>
              <span className="text-sm">Monto: ${promo.monto}</span>
              <span className="text-xs">Válido: {new Date(promo.fecha_inicio).toLocaleDateString()} - {new Date(promo.fecha_fin).toLocaleDateString()}</span>
              <button 
                onClick={() => onSelect(promo.promocion_id)}
                className="bg-red-500 hover:bg-red-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white p-2 rounded self-end"
              >
                Seleccionar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No hay promociones disponibles en este momento.</p>
      )}
    </div>
  );
};
// Personal Information Update Page
const PersonalInfoUpdatePage: React.FC<{
  onSubmit: (info: { nombre: string; email: string; apellido: string;}) => void;
}> = ({ onSubmit }) => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [apellido, setsetApellido] = useState<string>('');

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-orange-400">Editar Información Personal</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-orange-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setsetApellido(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-orange-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-orange-50 dark:bg-gray-700 text-gray-800 dark:text-white"
      />
      <button 
        onClick={() => onSubmit({ nombre, email, apellido })}
        className="w-full bg-red-500 hover:bg-red-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white p-2 rounded"
      >
        Actualizar Información
      </button>
    </div>
  );
};

// Main App Component
const GymMembershipApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dni');
  const [userData, setUserData] = useState<UserData>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const handleDNISubmit = async (dni: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://lb-prod-1093716168.us-east-1.elb.amazonaws.com:5000/verificar_membresia/${dni}`);
      const data = await response.json();

      if (data.status === "200") {
        setUserData({
          dni,
          membershipStatus: data.membresia.estado,
          nombre: data.data.nombre,
          apellido: data.data.apellido,
          email: data.data.email,
        });
        setPromotions(data.promociones);
        console.log("Promotions set: ", data.promociones);
        setCurrentPage('status');
      } else if (data.status === "404") {
        setPromotions(data.promociones);
        setCurrentPage('promotions');
      } else {
        alert("Error al verificar la membresía. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al verificar la membresía:", error);
      alert("Hubo un error al verificar la membresía. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenew = async () => {
      setCurrentPage('promotions');
  };

  const handlePromotionSelect = async (promoId: number) => {
    try {
      const response = await fetch(`http://lb-prod-1093716168.us-east-1.elb.amazonaws.com:5000/renovar_membresia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni: userData.dni, promocion_id: promoId }),
      });
      const data = await response.json();
      console.log(data.status);
      setCurrentPage('status');
      setUserData(prevUserData => ({
        ...prevUserData,
        membershipStatus: 'activa'
      }));        
    } catch (error) {
      console.error("Error al renovar la membresía:", error);
      alert("GA? Hubo un error al renovar la membresía. Por favor, intente nuevamente.");
    }
  };

  const handleUpdate = () => {
    setCurrentPage('updateInfo');
  };

  const handleInfoUpdate = async (info: { nombre: string; apellido: string; email: string; }) => {
    try {
      const response = await fetch(`http://lb-prod-1093716168.us-east-1.elb.amazonaws.com:5001/clientes/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni: userData.dni, ...info }),
      });
      const data = await response.json();
      if (data.status === "200") {
        setUserData({ ...userData, ...info });
        setCurrentPage('status');
      } else {
        alert("Error al actualizar la información. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      alert("Hubo un error al actualizar la información. Por favor, intente nuevamente.");
    }
  };

  const handleCancelMembership = async () => {
    try {
      const response = await fetch(`http://lb-prod-1093716168.us-east-1.elb.amazonaws.com:5000/cancelar_membresia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni: userData.dni }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setUserData(prevUserData => ({
          ...prevUserData,
          membershipStatus: 'inactiva'
        }));        
          setCurrentPage('status');
      } else {
        alert("Error al cancelar la membresía. Por favor, intente nuevamente. Status no fue 200");
      }
    } catch (error) {
      console.error("Error al cancelar la membresía:", error);
      alert("Hubo un error al cancelar la membresía. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {isLoading && <div className="text-center">Cargando...</div>}
      {!isLoading && (
        <>
          {currentPage === 'dni' && <DNIInputPage onSubmit={handleDNISubmit} />}
          {currentPage === 'status' && (
            <MembershipStatusPage
              status={userData.membershipStatus || ''}
              dni={userData.dni || ''}
              nombre={userData.nombre || ''}
              onRenew={handleRenew}
              onUpdate={handleUpdate}
              onCancel={handleCancelMembership}
            />
          )}
          {currentPage === 'promotions' && (
            <PromotionsPage promotions={promotions} onSelect={handlePromotionSelect} />
          )}
          {currentPage === 'updateInfo' && <PersonalInfoUpdatePage onSubmit={handleInfoUpdate} />}
        </>
      )}
    </div>
  );
};

export default GymMembershipApp;

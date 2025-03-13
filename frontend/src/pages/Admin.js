const Admin = () => {
    const handleLogout = async () => {
        await axios.post('https://login-itj2.onrender.com/api/logout', {}, { withCredentials: true });
        alert('Logout exitoso');
        window.location.href = '/';
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl mb-4">Panel Administrativo</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Cerrar Sesión
            </button>
        </div>
    );
};

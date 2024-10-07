//Error style page
const Error404 = () => {

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <object 
            data="/vasco-da-gama.svg" 
            type="image/svg+xml" 
            className="mb-4 w-32" 
            alt="Logo-Vasco"
            />
            <h1 className="text-2xl font-bold text-gray-800">
                O site foi de Vasco!
            </h1>
            <p className="text-lg text-gray-600 mt-2">
                Já estamos resolvendo o problema, aguenta aí!
            </p>
        </div>
    );
};

export default Error404;

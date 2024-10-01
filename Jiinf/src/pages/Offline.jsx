//Offline style page
const OfflineScreen = () => {
    const imgSrc = './vasco-logo.png'
    console.log(imgSrc);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <img
                src={imgSrc}
                alt="Offline"
                className="mb-4 w-32"
            />
            <h1 className="text-2xl font-bold text-gray-800">
                Sua internet foi de Vasco!
            </h1>
            <p className="text-lg text-gray-600 mt-2">
                Resolve aí amigão, depois você volta.
            </p>
        </div>
    );
};

export default OfflineScreen;

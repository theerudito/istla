import {Eye, Pencil, Trash2, Plus, Power} from "lucide-react";
import NewItemModal from "../modal/NewItemModal.tsx";
import {useState} from "react";

type Item = {
    id: number;
    description: string;
};

const data: Item[] = [
    { id: 1, description: "Elemento uno" },
    { id: 2, description: "Elemento dos" },
    { id: 3, description: "Elemento tres" },
    { id: 4, description: "Elemento cuatro" },
    { id: 5, description: "Elemento cinco" },
    { id: 6, description: "Elemento seis" },
    { id: 1, description: "Elemento uno" },
    { id: 2, description: "Elemento dos" },
    { id: 3, description: "Elemento tres" },
    { id: 4, description: "Elemento cuatro" },
    { id: 5, description: "Elemento cinco" },
    { id: 6, description: "Elemento seis" },
    { id: 1, description: "Elemento uno" },
    { id: 2, description: "Elemento dos" },
    { id: 3, description: "Elemento tres" },
    { id: 4, description: "Elemento cuatro" },
    { id: 5, description: "Elemento cinco" },
    { id: 6, description: "Elemento seis" },
    { id: 1, description: "Elemento uno" },
    { id: 2, description: "Elemento dos" },
    { id: 3, description: "Elemento tres" },
    { id: 4, description: "Elemento cuatro" },
    { id: 5, description: "Elemento cinco" },
    { id: 6, description: "Elemento seis" },
];


export default function PagueHome() {

    const [openModal, setOpenModal] = useState(false);

    const handleSave = (data: any) => {
        console.log("guardar", data);
    };

    const handleView = (item: Item) => {
        console.log("ver", item);
    };

    const handleEdit = (item: Item) => {
        console.log("editar", item);
    };

    const handleDelete = (item: Item) => {
        console.log("eliminar", item);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-200">

            {/* CONTENIDO */}
            <div className="flex flex-col lg:flex-row flex-1 p-4 gap-4 overflow-hidden">

                {/* COLUMNA TABLA */}
                <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl shadow flex flex-col p-4">

                    {/* BOTON NUEVO */}
                    <div className="mb-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="flex items-center gap-2 bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                        >
                            <Plus size={18}/>
                            Nuevo
                        </button>
                    </div>

                    {/* TABLA */}
                    <div className="custom-scrollbar max-h-[45vh] lg:flex-1 lg:max-h-none overflow-y-auto border border-gray-700 rounded-lg">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="text-left p-3">ID</th>
                                <th className="text-left p-3">Descripción</th>
                                <th className="text-right p-3">Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-gray-700 hover:bg-gray-700/40"
                                >
                                    <td className="p-3">{item.id}</td>

                                    <td className="p-3">
                                        {item.description}
                                    </td>

                                    <td className="p-3">
                                        <div className="flex justify-end gap-3">

                                            <button
                                                onClick={() => handleView(item)}
                                                className="text-blue-400 hover:text-blue-300"
                                            >
                                                <Eye size={18}/>
                                            </button>

                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-yellow-400 hover:text-yellow-300"
                                            >
                                                <Pencil size={18}/>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 size={18}/>
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                            </tbody>

                        </table>

                    </div>
                </div>

                {/* COLUMNA IFRAME */}
                <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl shadow border border-gray-700 overflow-hidden min-h-[300px]">

                    <iframe
                        src="https://example.com"
                        className="w-full h-full bg-gray-900"
                    />

                </div>

            </div>

            <NewItemModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleSave}
            />

            {/* FOOTER */}
            <footer className="bg-gray-800 border-t border-gray-700 py-3 px-4">
                <div className="flex items-center justify-between text-gray-200">

                    {/* Izquierda */}
                    <span className="text-sm">
      Bienvenido: <span className="text-purple-400 font-medium">Jorge</span>
            </span>

                    {/* Derecha */}
                    <button
                        className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition"
                        onClick={() => console.log("logout")}
                    >
                        <Power size={18} />
                        <span className="text-sm hidden sm:inline">Salir</span>
                    </button>

                </div>
            </footer>

        </div>
    );
}
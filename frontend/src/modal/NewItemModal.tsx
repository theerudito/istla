import { useState } from "react";
import { Upload } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (data: { description: string; file: File | null }) => void;
};

export default function NewItemModal({ open, onClose, onSave }: Props) {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const uploaded = e.dataTransfer.files[0];
        if (uploaded) setFile(uploaded);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSave = () => {
        onSave({ description, file });
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 shadow-lg">

                <h2 className="text-lg font-semibold mb-4 text-gray-200">
                    Nuevo registro
                </h2>

                {/* DESCRIPCIÓN */}
                <div className="mb-4">
                    <label className="text-sm text-gray-400">
                        Descripción
                    </label>

                    <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                    />
                </div>

                {/* DRAG & DROP */}
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition cursor-pointer mb-4"
                >
                    <Upload className="mx-auto mb-2 text-purple-400" />

                    <p className="text-sm text-gray-400">
                        Arrastra un archivo aquí
                    </p>

                    <p className="text-xs text-gray-500">
                        o haz click para subir
                    </p>

                    <input
                        type="file"
                        onChange={handleFile}
                        className="hidden"
                        id="fileUpload"
                    />

                    <label
                        htmlFor="fileUpload"
                        className="cursor-pointer block mt-2 text-purple-400 text-sm"
                    >
                        Seleccionar archivo
                    </label>

                    {file && (
                        <p className="text-xs mt-2 text-green-400">
                            {file.name}
                        </p>
                    )}
                </div>

                {/* BOTONES */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600"
                    >
                        Guardar
                    </button>

                </div>

            </div>

        </div>
    );
}
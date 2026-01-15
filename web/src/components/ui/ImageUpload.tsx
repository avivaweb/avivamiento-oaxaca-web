'use client';

import { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
    onImagesSelected: (files: File[]) => void;
    maxFiles?: number;
}

export default function ImageUpload({ onImagesSelected, maxFiles = 3 }: ImageUploadProps) {
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;

        const validFiles: File[] = [];
        const newPreviews: string[] = [];
        let totalSize = 0;

        // Current files size
        files.forEach(f => totalSize += f.size);

        Array.from(newFiles).forEach(file => {
            if (files.length + validFiles.length >= maxFiles) return;

            // Validate Type
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                alert(`Formato no soportado: ${file.name}`);
                return;
            }

            // Validate Size (Max 5MB total is the goal, check individually or accumulatively)
            // Let's check generally standard 2MB per file or accumulator.
            // Requirements: Total 5MB. 
            if (totalSize + file.size > 5 * 1024 * 1024) {
                alert(`El archivo ${file.name} excede el límite total de 5MB.`);
                return;
            }

            totalSize += file.size;
            validFiles.push(file);
            newPreviews.push(URL.createObjectURL(file));
        });

        if (validFiles.length > 0) {
            const updatedFiles = [...files, ...validFiles];
            const updatedPreviews = [...previews, ...newPreviews];
            setFiles(updatedFiles);
            setPreviews(updatedPreviews);
            onImagesSelected(updatedFiles);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        // Reset input to allow selecting same file again if deleted
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemove = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);

        // Revoke URL to avoid memory leak
        URL.revokeObjectURL(previews[index]);

        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        onImagesSelected(updatedFiles);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all text-center ${dragActive
                        ? 'border-[#DAA520] bg-[#DAA520]/5'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpg,.png,.webp"
                    className="hidden"
                    onChange={handleChange}
                />

                {files.length < maxFiles ? (
                    <div className="space-y-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="mx-auto h-12 w-12 text-gray-400">
                            <PhotoIcon />
                        </div>
                        <p className="text-sm text-gray-300">
                            <span className="font-bold text-[#DAA520]">Sube fotos</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, WEBP hasta 5MB total ({files.length}/{maxFiles})
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-[#DAA520]">Límite de {maxFiles} fotos alcanzado.</p>
                )}
            </div>

            {/* Previews */}
            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {previews.map((src, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10 bg-black">
                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

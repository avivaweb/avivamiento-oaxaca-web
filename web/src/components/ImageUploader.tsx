'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { PhotoIcon, XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';

interface ImageUploaderProps {
    userId: string;
    onUploadComplete: (urls: string[]) => void;
    maxFiles?: number;
}

export default function ImageUploader({ userId, onUploadComplete, maxFiles = 3 }: ImageUploaderProps) {
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const files = Array.from(e.target.files);

        // 1. Validations
        const validFiles = files.filter(file => {
            // Format validation
            const isValidFormat = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
            if (!isValidFormat) {
                alert(`Formato no soportado: ${file.name}. Solo .jpg, .png, .webp`);
                return false;
            }

            // Size validation (2MB)
            const isValidSize = file.size <= 2 * 1024 * 1024;
            if (!isValidSize) {
                alert(`El archivo ${file.name} excede el límite de 2MB.`);
                return false;
            }

            return true;
        });

        if (validFiles.length === 0) return;
        if (uploadedUrls.length + validFiles.length > maxFiles) {
            alert(`Solo puedes subir un máximo de ${maxFiles} imágenes.`);
            return;
        }

        setIsUploading(true);
        const newUrls: string[] = [];

        try {
            for (const file of validFiles) {
                const fileExt = file.name.split('.').pop();
                const timestamp = Date.now();
                // Pattern: reporte_{auth.uid}_{timestamp}.jpg
                const fileName = `reporte_${userId}_${timestamp}.${fileExt}`;

                const { data, error } = await supabase.storage
                    .from('victorias')
                    .upload(fileName, file);

                if (error) {
                    console.error('Error uploading:', error);
                    alert(`Error al subir ${file.name}`);
                    continue;
                }

                if (data) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('victorias')
                        .getPublicUrl(fileName);

                    newUrls.push(publicUrl);
                }
            }

            const updatedUrls = [...uploadedUrls, ...newUrls];
            setUploadedUrls(updatedUrls);
            onUploadComplete(updatedUrls);

        } catch (error) {
            console.error('Upload process error:', error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemove = (indexToRemove: number) => {
        const updatedUrls = uploadedUrls.filter((_, index) => index !== indexToRemove);
        setUploadedUrls(updatedUrls);
        onUploadComplete(updatedUrls);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">

                {/* Image Grid */}
                {uploadedUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 w-full">
                        {uploadedUrls.map((url, index) => (
                            <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-[#DAA520]/30 shadow-lg shadow-[#DAA520]/10">
                                <img src={url} alt={`Evidencia ${index + 1}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="absolute top-2 right-2 bg-red-600/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 backdrop-blur-sm"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload Button */}
                {uploadedUrls.length < maxFiles && (
                    <div
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`
                            relative group cursor-pointer
                            flex flex-col items-center justify-center
                            w-full h-32 border-2 border-dashed rounded-xl
                            transition-all duration-300
                            ${isUploading
                                ? 'border-gray-600 bg-gray-900/50 cursor-wait'
                                : 'border-[#DAA520] hover:bg-[#DAA520]/10 hover:shadow-[0_0_15px_rgba(218,165,32,0.15)] bg-[#DAA520]/5'}
                        `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.webp"
                            className="hidden"
                            onChange={handleFileSelect}
                            disabled={isUploading}
                        />

                        {isUploading ? (
                            <div className="flex flex-col items-center text-[#DAA520]">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DAA520] mb-2"></div>
                                <span className="text-sm font-medium animate-pulse">Subiendo evidencia...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-[#DAA520] group-hover:scale-105 transition-transform">
                                <CameraIcon className="w-10 h-10 mb-2" />
                                <span className="text-sm font-bold tracking-wide">AGREGAR EVIDENCIA</span>
                                <span className="text-xs text-gray-400 mt-1">Máx. 2MB (JPG, PNG, WEBP)</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

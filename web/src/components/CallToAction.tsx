'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'

export default function CallToAction() {
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-block mx-auto mt-4 mb-8"
        >
            <Link
                href={`https://wa.me/${siteConfig.whatsapp.number}?text=Hola,%20quiero%20conocer%20el%20diseño%20original%20de%20mi%20vida`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 bg-black border border-[#DAA520] text-[#DAA520] font-black text-xs md:text-sm uppercase tracking-widest rounded-full hover:bg-[#DAA520]/10 transition-colors shadow-[0_0_20px_rgba(218,165,32,0.15)] hover:shadow-[0_0_30px_rgba(218,165,32,0.3)] backdrop-blur-sm"
            >
                Conecta con el Diseño Original
            </Link>
        </motion.div>
    )
}

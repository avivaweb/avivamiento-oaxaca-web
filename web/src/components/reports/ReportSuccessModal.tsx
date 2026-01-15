import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ReportSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReportSuccessModal({ isOpen, onClose }: ReportSuccessModalProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-[#111111] border border-[#DAA520]/30 px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DAA520]/10 border border-[#DAA520]/50 animate-bounce-slow">
                                        <CheckCircleIcon className="h-10 w-10 text-[#DAA520]" aria-hidden="true" />
                                    </div>
                                    <div className="mt-5 text-center">
                                        <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-white mb-2">
                                            ¡Gloria a Dios! Tu reporte ha sido recibido
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-400">
                                                Tu fidelidad acelera la <span className="text-[#DAA520] font-semibold">Gloria Mayor</span> en Oaxaca.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link
                                        href="/dashboard"
                                        onClick={onClose}
                                        className="inline-flex w-full justify-center rounded-lg bg-[#DAA520] px-3 py-3 text-sm font-bold text-black shadow-lg hover:bg-[#B8860B] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
                                    >
                                        Volver al Dashboard
                                    </Link>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

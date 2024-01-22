// @ts-nocheck
import { useRef, useEffect, useState, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";

export default function PromocodeModal({ className = '' }: { className?: string }) {
    const [showPromocodeModal, setShowPromocodeModal] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        promocode: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('promocode'));
    };

    const openPromocodeModal = (e) => {
        e.preventDefault();
        setShowPromocodeModal(true);
    };

    const closeModal = () => {
        setShowPromocodeModal(false);
    };
    
    return (
        <>
        <Button className="ml-1" disabled={processing} onClick={(e) => openPromocodeModal(e)} variant="secondary">Promocode</Button>
            <Modal show={showPromocodeModal} onClose={closeModal}>
            <form onSubmit={submit} className="mt-0 space-y-6">
                <div>
                    <TextInput
                        id="promocode"
                        className="min-w-[100px] w-full bg-theme-800 ring-theme-700 ring-offset-theme-600 border-theme-500 text-theme-50 font-thin text-sm rounded-sm"
                        value={data.promocode}
                        placeholder="Enter promo code"
                        onChange={(e) => setData('promocode', e.target.value)}
                        autoComplete="promocode"
                    />
                    <InputError className="mt-2" message={errors.promocode} />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing} variant="outline">Redeem Code</Button>
                    <Button onClick={closeModal} className="mr-1" variant="destructive">Close</Button>

                </div>
            </form>
            </Modal>
            </>
    );
}

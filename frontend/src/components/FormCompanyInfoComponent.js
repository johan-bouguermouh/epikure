"use client";

import React from 'react';
import { useFormContext } from '../context/FormContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    siretOrSiren: z.string().min(9).max(14),
    legalStatus: z.string().optional(),
});

function FormFirstComponent() {
    const { formData, updateFormData, nextStep, fetchCompanyDetails, loading, error } = useFormContext();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            siretOrSiren: formData.siretOrSiren || '',
            legalStatus: formData.legalStatus || '',
        },
    });

    async function onSubmit(values) {
        updateFormData(values);
        await fetchCompanyDetails(values.siretOrSiren); // Attendre que les données soient chargées
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h2>Informations de l'entreprise</h2>

                <FormField
                    control={form.control}
                    name="siretOrSiren"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SIRET ou SIREN</FormLabel>
                            <FormControl>
                                <Input placeholder="SIRET ou SIREN" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="legalStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Statut Juridique</FormLabel>
                            <FormControl>
                                <Input placeholder="Statut Juridique" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading}>
                    {loading ? 'Chargement...' : 'Suivant'}
                </Button>

                {error && <p className="text-red-500">{error}</p>}
            </form>
        </Form>
    );
}

export default FormFirstComponent;

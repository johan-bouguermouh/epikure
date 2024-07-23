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
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
    gender: z.string(),
    city: z.string().min(2).max(50),
    postalCode: z.string().min(2).max(10),
    isBio: z.boolean(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
});

function FormOtherComponent() {
    const { formData, updateFormData, prevStep } = useFormContext();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: formData.gender || '',
            city: formData.city || '',
            postalCode: formData.postalCode || '',
            isBio: formData.isBio || false,
            firstName: formData.firstName || '',
            lastName: formData.lastName || '',
        },
    });

    function onSubmit(values) {
        updateFormData(values);
        console.log('Final form data:', values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h2>Vérification des Informations</h2>

                <FormField
                    control={form.control}
                    name="isBio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label Bio</FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel>Nom de l'Entreprise</FormLabel>
                    <FormControl>
                        <Input
                            value={formData.businessName || ''}
                            readOnly
                        />
                    </FormControl>
                </FormItem>

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ville"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code Postal</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Code Postal"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="M."
                                        {...field}
                                        checked={field.value === 'M.'}
                                        onChange={() => field.onChange('M.')}
                                    />
                                    M.
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Mm."
                                        {...field}
                                        checked={field.value === 'Mm.'}
                                        onChange={() => field.onChange('Mm.')}
                                    />
                                    Mm.
                                </label>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                                <Input placeholder="Prénom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="button" onClick={prevStep}>Précédent</Button>
                <Button type="submit">Soumettre</Button>
            </form>
        </Form>
    );
}

export default FormOtherComponent;

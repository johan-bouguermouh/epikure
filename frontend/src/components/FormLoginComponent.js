"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button"; // Assurez-vous que ce chemin est correct
import { Input } from "@/components/ui/input"; // Assurez-vous que ce chemin est correct
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // Assurez-vous que ce chemin est correct

// Définir le schéma de validation
const loginSchema = z.object({
    email: z.string().email({ message: "L'adresse email est invalide" }),
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

function LoginComponent() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { handleSubmit, control, formState: { errors } } = form;

    const onSubmit = async (data) => {
        console.log('Connexion avec:', data);
        // Remplacez cette ligne par l'appel API approprié
        // Exemple : await loginUser(data.email, data.password);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto mt-2 p-6 bg-white shadow-md rounded-lg space-y-4">
                <h2 className="text-2xl font-bold mb-6">Connexion</h2>

                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.email?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.password?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500 text-white hover:bg-primary-600">
                    Se connecter
                </Button>
            </form>
        </Form>
    );
}

export default LoginComponent;

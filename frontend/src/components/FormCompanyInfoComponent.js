"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "../context/FormContext";

const formSchema = z.object({
    cis: z.string().min(2).max(50),
    businessName: z.string().min(2).max(50),
});

function FormCompanyInfoComponent() {
    const { formData, updateFormData, nextStep } = useFormContext();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cis: formData.cis,
            businessName: formData.businessName,
        },
    });

    function onSubmit(values) {
        updateFormData(values);
        nextStep();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h2>Informations Professionnelles</h2>
                <FormField
                    control={form.control}
                    name="cis"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SIREN/SIRET</FormLabel>
                            <FormControl>
                                <Input placeholder="SIREN/SIRET" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de l'entreprise</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom de l'entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Suivant</Button>
            </form>
        </Form>
    );
}

export default FormCompanyInfoComponent;

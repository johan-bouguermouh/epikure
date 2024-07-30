"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormContext } from "../../context/FormContext";
import FarmerService from "@/services/farmer.services";

const passwordSchema = z
  .string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  .refine((value) => /[a-z]/.test(value), {
    message: "Le mot de passe doit contenir au moins une minuscule",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Le mot de passe doit contenir au moins une majuscule",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Le mot de passe doit contenir au moins un chiffre",
  })
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message: "Le mot de passe doit contenir au moins un caractère spécial",
  });

const formSchema = z.object({
  siretOrSiren: z.string().min(9).max(14),
  socialReasonName: z.string().optional(),
  email: z.string().email({ message: "Email invalide" }),
  password: passwordSchema,
  confirmPassword: z
    .string()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"],
    }),
});

function FormCompanyInfoComponent() {
  const farmerService = new FarmerService();
  const {
    formData,
    updateFormData,
    nextStep,
    fetchCompanyDetails,
    loading,
    error,
  } = useFormContext();
  // const farmerService = new FarmerService();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siretOrSiren: formData.siretOrSiren || "",
      socialReasonName: formData.socialReasonName || "",
      email: formData.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    const { confirmPassword, ...rest } = values;
    updateFormData(rest);
    const { siretOrSiren, socialReasonName: denomination } = rest;
    await fetchCompanyDetails({ siretOrSiren, denomination });
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
          name="socialReasonName"
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-between">
          <div></div>
          <Button type="submit" disabled={loading}>
            {loading ? "Chargement..." : <ArrowRight />}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormCompanyInfoComponent;

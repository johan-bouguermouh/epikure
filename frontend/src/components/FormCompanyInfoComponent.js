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
import { useFormContext } from "../context/FormContext";

const formSchema = z.object({
  siretOrSiren: z.string().min(9).max(14),
  legalStatus: z.string().optional(),
});

function FormCompanyInfoComponent() {
  const {
    formData,
    updateFormData,
    nextStep,
    fetchCompanyDetails,
    loading,
    error,
  } = useFormContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siretOrSiren: formData.siretOrSiren || "",
      legalStatus: formData.legalStatus || "",
    },
  });

  async function onSubmit(values) {
    updateFormData(values);
    await fetchCompanyDetails(values.siretOrSiren);
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

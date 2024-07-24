"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormContext } from "../context/FormContext";

const formSchema = z.object({
  gender: z.string(),
  city: z.string().min(2).max(50),
  postalCode: z.string().min(2).max(10),
  isBio: z.boolean(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});

function FormOtherComponent() {
  const { formData, updateFormData, prevStep, nextStep } = useFormContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: formData.gender || "",
      city: formData.city || "",
      postalCode: formData.postalCode || "",
      isBio: formData.isBio || false,
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
    },
  });

  function onSubmit(values) {
    updateFormData(values);
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2>Vérification des Informations</h2>

        <FormField
          control={form.control}
          name="isBio"
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormLabel className="font-bold font-rubik">Label Bio</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="font-bold font-rubik">Nom de l'Entreprise</FormLabel>
          <FormControl>
            <Input value={formData.businessName || ""} readOnly />
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold font-rubik">Ville</FormLabel>
              <FormControl>
                <Input placeholder="Ville" {...field} />
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
              <FormLabel className="font-bold font-rubik">Code Postal</FormLabel>
              <FormControl>
                <Input placeholder="Code Postal" {...field} />
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
              <FormLabel className="font-bold font-rubik">Genre</FormLabel>
              <div className="space-x-2">
                <label>
                  <input
                    type="radio"
                    value="M."
                    {...field}
                    checked={field.value === "M."}
                    onChange={() => field.onChange("M.")}
                  />
                  M.
                </label>
                <label>
                  <input
                    type="radio"
                    value="Mm."
                    {...field}
                    checked={field.value === "Mm."}
                    onChange={() => field.onChange("Mm.")}
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
              <FormLabel className="font-bold font-rubik">Prénom</FormLabel>
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
              <FormLabel className="font-bold font-rubik">Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" onClick={prevStep}>
            <ArrowLeft />
          </Button>
          <Button type="submit">
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormOtherComponent;

"use client";
import FormComponent from "@/components/FormComponent";
import FormSideBarComponent from "@/components/FormSideBarComponent";
import { FormProvider } from "../../../context/FormContext";

function SignUpPage() {
  return (
    <>
      <FormProvider>
        <div className="flex min-h-screen w-full bg-dark-secondary-50 items-center justify-center ">
          <main className="bg-white h-[95vh] w-full max-w-[980px] flex gap-4 p-4 rounded-2xl shadow-md">
              <FormSideBarComponent />
            
              <FormComponent />
            
          </main>
        </div>
      </FormProvider>
    </>
  );
}

export default SignUpPage;

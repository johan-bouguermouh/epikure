

import FormSideBarComponent from "@/components/FormSideBarComponent";



function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full bg-dark-secondary-50 items-center justify-center ">
      <main className="bg-white h-[95vh] w-full max-w-[980px] flex gap-8 p-4 rounded-2xl shadow-md">
        <FormSideBarComponent />
        <div> Form </div>
      </main>
    </div>
  );
}

export default SignUpPage;

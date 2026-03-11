import React, { use } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        body: "",
        horas: "",
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("tareas.store"), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <head title="tareas"></head>
            <div className="max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        type="text"
                        placeholder="Escribe el nombre de la tarea"
                        autoFocus
                        className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    ></input>
                    <InputError
                        message={errors.title}
                        className="mt-2"
                    ></InputError>
                    <textarea
                        value={data.body}
                        onChange={(e) => setData("body", e.target.value)}
                        type="text"
                        placeholder="añade la descripción a tu tarea"
                        className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    ></textarea>
                    <InputError
                        message={errors.body}
                        className="mt-2"
                    ></InputError>
                    <input
                        value={data.horas}
                        onChange={(e) => setData("horas", e.target.value)}
                        type="text"
                        placeholder="Escribe el tiempo de la tarea"
                        autoFocus
                        className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    ></input>
                    <InputError
                        message={errors.horas}
                        className="mt-2"
                    ></InputError>
                    <PrimaryButton
                        className="mt-4 text-white bg-gradient-to-br from-purlple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus"
                        disabled={processing}
                    >
                        Create
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

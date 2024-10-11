"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
function NewPage({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (params.id) {
      fetch(`/api/task/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          const { title, description } = data;
          setTitle(title);
          setDescription(description);
        });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      const res = await fetch(`/api/task/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
    } else {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
    }
    await router.refresh();
    await router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2">
        <label htmlFor="title" className="font-bold text-sm">
          Ingresa el título
        </label>
        <input
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          type="text"
          name="title"
          id="title"
          placeholder="Título"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Ingresa la descripción
        </label>

        <textarea
          name="description"
          id="description"
          placeholder="Describe tu tarea"
          rows="3"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button
          className="border border-gray-600 rounded bg-blue-500 hover:bg-blue-700 text-white p-2 mb-4 w-full"
          type="submit"
        >
          Crear
        </button>
        {params.id && (
          <button
            className="border border-gray-600 rounded bg-red-500 hover:bg-red-700 text-white p-2 mb-4 w-full"
            type="button"
            onClick={async() => {
              const res = await fetch(`/api/task/${params.id}`, {
                method: "DELETE",
              });
              const data = await res.json();
              if (!res.ok) {
                throw new Error(data.message);
              }
              await router.refresh();
              await router.push("/");
            }}
          >
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default NewPage;

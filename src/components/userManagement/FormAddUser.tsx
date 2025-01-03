"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IFormUser } from "@/lib/interfaces/userInterface";
import { formUserSchema } from "@/lib/schemas/userSchema";
import DialogModal from "../DialogModal";
import { ComboBox } from "@/components/ComboBox";

interface IUserProps {
  initialValues?: IFormUser; // initialValues untuk edit
  onSubmit: (data: IFormUser) => void;
}

export default function FormAddUser({ initialValues, onSubmit }: IUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<IFormUser>({
    resolver: zodResolver(formUserSchema),
    defaultValues: initialValues ?? {},
  });

  console.log("Form values:", getValues());
  console.log("Form errors:", errors);

  const isEditMode = !!initialValues;

  const STATUS = ["AKTIF", "TIDAK_AKTIF"];
  const handleStatusSelect = (value: string) => {
    const selectedStatus = STATUS.find((status) => status === value);
    if (selectedStatus) {
      setValue("status", selectedStatus);
    }
  };

  const accessRole = ["ADMIN", "SUPER_ADMIN"];
  const handleRoleSelect = (value: string) => {
    const selectedStatus = accessRole.find(
      (accessRole) => accessRole === value
    );
    if (selectedStatus) {
      setValue("accessRole", selectedStatus);
    }
  };

  // Menggunakan useEffect untuk mengupdate nilai form jika initialValues berubah
  useEffect(() => {
    if (initialValues) {
      // Menyesuaikan nilai form saat pertama kali dimuat jika initialValues ada
      setValue("username", initialValues.username);
      setValue("name", initialValues.name);
      setValue("accessRole", initialValues.accessRole);
    }
  }, [initialValues, setValue]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Submitting data:", data); // Debugging
        onSubmit(data); // Kirim data ke parent component
      })}
      className="space-y-4"
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <Input id="username" {...register("username")} />
        {errors.username && (
          <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="accessRole"
          className="block text-sm font-medium text-gray-700"
        >
          Access Role
        </label>
        <ComboBox
          items={accessRole.map((e) => ({
            label: e.split("_").join(" "),
            value: e,
          }))}
          onSelect={handleRoleSelect}
          value={watch("accessRole") ?? ""}
          placeholder="Select a Role"
        />
        {errors.accessRole && (
          <p className="mt-2 text-sm text-red-600">
            {errors.accessRole.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          STATUS
        </label>
        <ComboBox
          items={STATUS.map((e) => ({
            label: e.split("_").join(" "),
            value: e,
          }))}
          onSelect={handleStatusSelect}
          value={watch("status") ?? ""}
          placeholder="Select a Status"
        />
        {errors.status && (
          <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      {/* Tombol submit yang berubah sesuai mode */}
      <Button type="submit">
        {isEditMode ? "Update User" : "Add User"}{" "}
        {/* Menyesuaikan teks tombol */}
      </Button>
    </form>
  );
}

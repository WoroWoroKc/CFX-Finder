<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useRouter } from "vue-router";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const router = useRouter();

const formSchema = toTypedSchema(
    z.object({
        cfxkey: z.string().min(6).max(20),
    }),
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
    const cfxKey = values.cfxkey.replace("cfx.re/join/", "");
    router.push({ name: "ServerInfo", params: { cfxKey: cfxKey } });
});
</script>

<template>
    <form @submit="onSubmit" class="flex">
        <FormField v-slot="{ componentField }" name="cfxkey">
            <FormItem>
                <FormLabel>CFX Key</FormLabel>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="CFX Key"
                        class="w-[30vw]"
                        v-bind="componentField"
                    />
                </FormControl>
                <FormDescription
                    >Find CFX Key on
                    <a href="https://servers.fivem.net/servers/"
                        >Fivem server list</a
                    >
                </FormDescription>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" class="mt-8 ml-3"> Find server </Button>
    </form>
</template>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-zinc-100 px-4"
  >
    <Card class="w-full max-w-md shadow-md">
      <CardHeader>
        <CardTitle>Masuk CMS</CardTitle>
        <CardDescription>
          Gunakan akun Supabase Auth yang sudah punya baris di tabel
          <code class="text-xs">profiles</code>.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium" for="email">Email</label>
          <Input
            id="email"
            v-model="email"
            type="email"
            autocomplete="username"
            class="w-full"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="password">Password</label>
          <Input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full"
          />
        </div>
        <p v-if="errorMsg" class="text-sm text-destructive">{{ errorMsg }}</p>
        <Button class="w-full" :disabled="loading" @click="submit">
          {{ loading ? "Memproses…" : "Masuk" }}
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import Card from "~/components/ui/card/Card.vue";
import CardContent from "~/components/ui/card/CardContent.vue";
import CardDescription from "~/components/ui/card/CardDescription.vue";
import CardHeader from "~/components/ui/card/CardHeader.vue";
import CardTitle from "~/components/ui/card/CardTitle.vue";

definePageMeta({ layout: false });

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");
const { setToken } = useAdminToken();

async function submit() {
  errorMsg.value = "";
  loading.value = true;
  try {
    const res = await $fetch<{
      access_token: string;
    }>("/api/admin/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    setToken(res.access_token);
    await navigateTo("/admin/articles");
  } catch (e: unknown) {
    const err = e as { data?: { message?: string }; message?: string };
    errorMsg.value =
      err.data?.message ?? err.message ?? "Login gagal. Periksa email/password.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="px-5 flex flex-col py-32 gap-20 lg:gap-0 items-center">
    <section
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full flex flex-col gap-16"
    >
      <h1 class="text-3xl font-bold">Hubungi Saya</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <form action="">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="name" class="font-medium">Nama</label>
              <Input
                type="text"
                id="name"
                v-model="formValue.name"
                name="name"
                placeholder="Masukkan nama Anda"
                class="focus:ring-green-300 focus:outline-none focus:ring-2 rounded-xl border-neutral-400 h-12"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="email" class="font-medium">Email</label>
              <Input
                type="email"
                id="email"
                v-model="formValue.email"
                name="email"
                placeholder="Masukkan email Anda"
                class="focus:ring-green-300 focus:outline-none focus:ring-2 rounded-xl border-neutral-400 h-12"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="message" class="font-medium">Pesan</label>
              <Textarea
                id="message"
                name="message"
                v-model="formValue.message"
                rows="5"
                class="focus:ring-green-300 focus:outline-none focus:ring-2 rounded-xl border-neutral-400"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>
            <Button
              type="submit"
              class="bg-green-400 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300"
              data-action="submit"
              @click.prevent="submitForm"
            >
              Kirim Pesan
            </Button>
          </div>
        </form>
        <div class="hidden md:block">
          <img :src="contactImg" alt="Contact Us" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import contactImg from "~/assets/images/contact.svg";
import { useReCaptcha } from "vue-recaptcha-v3";

const { setBreadcrumbs, setPageTitle } = useBreadcrumb();
const errorMessage = ref<string | null>(null);
const submissionMessage = ref<string | null>(null);
const formValue = reactive({
  name: "",
  email: "",
  message: "",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recaptcha = ref<any>(null);

onMounted(() => {
  recaptcha.value = useReCaptcha();
});

const execRecaptcha = async () => {
  await recaptcha.value.recaptchaLoaded();
  return await recaptcha.value.executeRecaptcha("contact");
};

const submitForm = async () => {
  const token = await execRecaptcha();

  if (!token) {
    errorMessage.value = "Invalid reCAPTCHA. Please try again.";
    submissionMessage.value = null;
    alert(errorMessage.value);
    return;
  }

  try {
    const formResponse = await useFetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formValue.name,
        email: formValue.email,
        message: formValue.message,
        recaptcha_token: token,
      }),
    });
    if (formResponse.status.value === "success") {
      submissionMessage.value = "Message sent successfully!";
      errorMessage.value = null;
      alert(submissionMessage.value);
      formValue.name = "";
      formValue.email = "";
      formValue.message = "";
    } else {
      throw new Error("Form submission failed");
    }
  } catch {
    errorMessage.value = "Form submission failed. Please try again.";
    submissionMessage.value = null;
    alert(errorMessage.value);
  }
};

const breadcrumbs = [
  { title: "Beranda", route: "/" },
  { title: "Kontak", route: "/contact" },
];

setPageTitle("Kontak");
setBreadcrumbs(breadcrumbs);

definePageMeta({
  layout: "basic",
});
</script>

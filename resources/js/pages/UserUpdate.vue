<script setup>
import { onMounted, ref } from 'vue';
import Swal from "sweetalert2";
import { useUserStore } from '../stores/userStore.js';
import { useRouter } from 'vue-router';
import AreaRightTop from "@/components/arearighttop.vue";
import { storeToRefs } from 'pinia';

const authStore = useUserStore();
const { user_id, user_detail } = storeToRefs(authStore);

const fullName = ref('');
const cafeName = ref('');
const phoneNumber = ref();
const Password = ref('');
const Address = ref('');
const Slug = ref('');

const userDetailGet = async () => {
  await authStore.userDetail(user_id.value);

  const {full_name, cafe_name, phone_number, password, address, slug} = {...user_detail.value};

  fullName.value = full_name;
  cafeName.value = cafe_name;
  phoneNumber.value = phone_number;
  Password.value = password;
  Address.value = address;
  Slug.value = slug;
}

onMounted(async () => {
  userDetailGet();
});

const updateForm = async () => {
  const response = await authStore.update(Password.value, phoneNumber.value, cafeName.value, fullName.value, Address.value);
  console.log(response.status);
  if (response.status === false) {
    Swal.fire({
      icon: "error",
      title: "Uyarı",
      text: response.message,
      confirmButtonText: "Tamam",
      timer: 1500
    });
  } else {
    await Swal.fire({
      title: "Başarılı",
      icon: "success",
      draggable: true,
      showConfirmButton: false,
      text: response.message,
      timer: 5000
    });
    await userDetailGet();
  }
};
</script>

<template>
  <AreaRightTop />
  <div class="container-fluid setting-home">
    <div class="form-group">
      <form @submit.prevent="updateForm">
        <div class="row">  
          <div class="col-md-6">
            <div class="title-box">
              <label class="form-label">Adınız Soyadınız</label>
              <input type="text" v-model="fullName" class="form-control" autocomplete="username">
            </div>
          </div>
          <div class="col-md-6">
            <div class="title-box">
              <label class="form-label">Telefon Numaranız</label>
              <input type="text" v-model="phoneNumber" class="form-control" autocomplete="tel">
            </div>
          </div>
          <div class="col-md-6">
            <div class="title-box">
              <label class="form-label">Kafe İsminiz</label>
              <input type="text" v-model="cafeName" class="form-control" autocomplete="nickname">
            </div>
          </div>
          <div class="col-md-6">
            <div class="title-box">
              <label class="form-label">Adresiniz</label>
              <input type="text" v-model="Address" class="form-control" autocomplete="street-address">
            </div>
          </div>
          <div class="col-md-6">
            <div class="title-box">
              <label class="form-label">Şifreniz</label>
              <input type="password" v-model="Password" class="form-control" autocomplete="new-password">
            </div>
          </div>
          <div class="col-md-6">
            <div class="title-box">
              <label class="form-label">Slug</label>
              <input type="text" v-model="Slug" class="form-control" autocomplete="url" disabled>
            </div>
          </div>
          <div class="col-md-12">
            <button class="btn btn-edit">Güncelle</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import { useUserStore } from '../stores/userData'
    import { useProductStore } from '@/stores/productData';
    import { useOrderStore } from '@/stores/orderData';
    import { useArtistStore } from '@/stores/artistData';
    import { useGenreStore } from '@/stores/genreData';
    import UpdateProduct from '@/components/UpdateProduct.vue';
    import UpdateArtist from '@/components/UpdateArtist.vue';
    import UpdateGenre from '@/components/UpdateGenre.vue';
    import UpdateOrder from '@/components/UpdateOrder.vue';
    import ProductInfo from '@/components/ProductInfo.vue';

    const userStore = useUserStore();
    const productData = useProductStore();
    const orderData = useOrderStore();

    const username = ref("");
    const password = ref("");

    watch(() => userStore.tokenUserId, (() => {
      orderData.loadUserOrders(userStore.tokenUserId);
    }))

    onMounted(() => {
      orderData.loadUserOrders(userStore.tokenUserId);
    })
</script>

<template>
  <main>
    <article v-if="!userStore.isLoggedIn">
      <section class="login">
        <h2>Přihlášení</h2>
        <section>
          <label for="username">Uživatelské jméno</label>
          <input v-model="username" type="text" name="username" id="username" placeholder="Uživatelské jméno">
        </section>
        <section>
          <label for="password">Heslo</label>
          <input v-model="password" name="password" id="password" type="password" placeholder="Heslo">
        </section>
        <button @click="userStore.authenticateUser(username, password)">Přihlásit</button>
        <RouterLink class="link" to="/register">Nemáte účet? Registrujte se zde</RouterLink>
      </section>
    </article>
    <article class="user" v-if="userStore.isLoggedIn && userStore.tokenUserId != 1">
      <h2>Vaše objednávky</h2>
      <article class="order" v-for="(order, i) in orderData.orders" :key="i">
        <section class="info">
          <p>ID objednávky: {{ order.id }}</p>
          <p>{{ order.price }} Kč</p>
          <p>Stav: 
            <span v-if="order.state == 'ordered'">Objednáno</span>
            <span v-else-if="order.state == 'resolved'">Prodáno</span>
          </p>
        </section>
        <section class="product" v-for="(product, i) in order.products" :key="i">
            <section>
                <img :src="'http://localhost:3000/uploads/' + product.image" alt="">
            </section>
            <section class="product-info">
                <p>{{ product.name }} - {{ product.type }}</p>
                <p>{{ product.price }} Kč</p>
            </section>
        </section>
      </article>
      <section>
        <button @click="userStore.logout()">Odhlásit</button>
      </section>
    </article>
    <article class="admin" v-if="userStore.tokenUserId == 1">
      <h2>Administrace</h2>
      <section>
        <h3>Produkty</h3>
        <UpdateProduct></UpdateProduct>
      </section>
      <section>
        <h3>Interpreti</h3>
        <UpdateArtist></UpdateArtist>
      </section>
      <section>
        <h3>Žánry</h3>
        <UpdateGenre></UpdateGenre>
      </section>
      <section>
        <h3>Objednávky</h3>
        <UpdateOrder></UpdateOrder>
      </section>
      <section>
        <button @click="userStore.logout()">Odhlásit</button>
      </section>
    </article>
  </main>
</template>

<style lang="scss" scoped>
  @import '../mixins.scss';
  article{
    width: 100%;
    @include flex-row;
    align-items: start;

    &.user{
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      padding-bottom: 20px;
      padding-top: 20px;

      .order{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        gap: 20px;
        border: 5px solid green;
        padding: 20px;

        .info{
          display: flex;
          width: 100%;
          justify-content: space-between;
          font-size: 1.2em;
          font-weight: 600;
          color: green;
        }

        .product{
            display: flex;
            border: 3px solid green;
            padding: 5px;
            width: 100%;
            align-items: center;

            img{
                width: 100px;
            }

            .product-info{
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 20px;

                p{
                    font-size: 1em;
                    color: green;
                    font-weight: 600;
                }
            }
        }
      }
    }

    &.admin{
      flex-direction: column;
      align-items: center;

      >section{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 3px solid green;
        padding-bottom: 20px;
        padding-top: 20px;
      }
    }

    .login{
      width: 100%;
      @include flex-column;
      justify-content: start;
      gap: 20px;

      section{
        @include flex-column;
        gap: 5px;
      }

      .link{
        font-family: "Lato", sans-serif;
        text-decoration: none;
        color: black;
        transition: 0.3s ease all;

        &:hover{
          color: green;
        }
      }
    }

    button{
          @include button;
        }
  }
</style>

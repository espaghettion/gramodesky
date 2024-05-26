<script setup>
    import { useOrderStore } from "@/stores/orderData";
    import { ref } from "vue";

    const orderStore = useOrderStore();

    orderStore.loadOrders();
    const orders = orderStore.orders;

    const patchOrderId = ref();
    const patchOrderState = ref();

    const deleteOrderId = ref();
</script>

<template>
    <article>
        <section>
            <h4>Upravit stav objednávky</h4>
            <article class="property">
                <label for="patch-order-id">ID objednávky</label>
                <select v-model="patchOrderId" name="patch-order-id" id="patch-order-id">
                    <option v-for="(order, i) in orderStore.orders" :key="i" :value="order.id">{{ order.id }}</option>
                </select>
            </article>
            <article class="property">
                <label for="patch-order-state">Stav objednávky</label>
                <select v-model="patchOrderState" name="patch-order-state" id="patch-order-state">
                    <option value="ordered">Objednáno</option>
                    <option value="resolved">Vyřešeno</option>
                </select>
            </article>
            <button @click="orderStore.patchOrder(patchOrderState, patchOrderId)">Upravit</button>
        </section>
        <section>
            <h4>Smazat objednávku</h4>
            <article class="property">
                <label for="delete-order-id">ID objednávky</label>
                <select v-model="deleteOrderId" name="delete-order-id" id="delete-order-id">
                    <option v-for="(order, i) in orderStore.orders" :key="i" :value="order.id">{{ order.id }}</option>
                </select>
            </article>
            <button @click="orderStore.deleteOrder(deleteOrderId)">Smazat</button>
        </section>
    </article>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';
    
    article{
        @include flex-row;
        align-items: start;
        gap: 10%;

        >section{
            @include flex-column;
            width: 20%;
            padding: 20px;
            gap: 20px;

            .property{
                width: 100%;
                @include flex-column;
                gap: 5px;
            }

            button{
                @include button;
            }

            select, input{
                box-sizing: border-box;
                width: 100%;
            }
        }
    }
</style>
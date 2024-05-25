<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <section>
      <img src="./assets/logo.png" id="logo" alt="">
    </section>
    <nav>
      <section>
        <article>
          <RouterLink to="/">GRAMODESKY.CZ</RouterLink>
        </article>
        <article>
          <RouterLink to="/login"><i class="fa-regular fa-user"></i></RouterLink>
          <a href="#"><i class="fa-regular fa-heart"></i></a>
          <RouterLink to="/cart"><i class="fa-solid fa-cart-shopping"></i></RouterLink>
        </article>
      </section>
      <section>
        <ul id="categories">
          <li><a href="">ALBA</a></li>
          <li><a href="">INTERPRETI</a></li>
          <li><a href="">ŽÁNRY</a></li>
          <li><a href="">VYDAVATELSTVÍ</a></li>
          <li><a href="">MERCH</a></li>
          <li><a href="">AUDIOTECHNIKA</a></li>
          <li><a href="">ZNAČKY</a></li>
        </ul>
      </section>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
  body{
    height: 100%;
    min-height: 100vh;
    width: 100%;
    display: flex;
    
  }

  #app{
    height: 100%;
    width: 100%;
  }

  header{
    width: calc(100% - 20px);
    border-bottom: 3px solid green;
    padding: 10px;
    display: flex;

    >section{
      width: 16%;
    }
  }

  nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    gap: 10px;

    section{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      width: 100%;
      padding: 10px;
      font-size: 2em;

      article{
        &:last-child{
          display: flex;
          gap: 15px;
        }
      }

      a{
        font-family: "Lato", sans-serif;
        text-decoration: none;
        color: black;
        transition: 0.3s ease all;

        &:hover{
          scale: 1.05;
          color: green;
        }
      }

      ul{
        display: flex;
        width: 100%;
        gap: 20px;
        font-size: 0.45em;
        color: gray;
        font-family: "Lato", sans-serif;
        justify-content: space-between;
      }

      button{
        background: none;
        border: none;

        &:hover{
          cursor: pointer;
        }

        i{
          font-size: 2em;
        }
      }

      input{
        border: none;
        border-bottom: 2px solid gray;
        transition: 0.3s ease all;

        &:focus{
          outline: none;
          border-bottom: 2px solid green;
        }
      }
    }
  }

  #categories{
    display: flex;
  }

  #logo{
    width: 100px;
  }
</style>

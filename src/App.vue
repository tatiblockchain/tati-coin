<template>
  <div id="app">
    <ICOs />
  </div>
</template>

<script>
import ICOs from "./components/ICO.vue";

export default {
  name: "app",
  components: {
    ICOs
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 250px;
  color: #2c3e50;
}

body {
  background: #ccc;
}

i {
  margin-right: 5px;
  margin-left: 20px;
}

.space {
  margin-right: 10px;
}

.raisedbox {
  padding: 20px;
  background: #fafafa;
  margin: 5px;
  border-radius: 10px;
}

.linebox {
  padding: 5px;
  margin: 5px;
  background: #9e9e9e;
  border-radius: 10px;
}

.shadow {
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;
}

.effect1 {
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;
}

.dontmove {
  position: fixed;
  z-index: 3;
  top: 0;
  width: 100%;
}

.blog-header {
  line-height: 1;
  border-bottom: 1px solid #e5e5e5;
}

.blog-header-logo {
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  font-size: 2.25rem;
}

.blog-header-logo:hover {
  text-decoration: none;
}

.display-4 {
  font-size: 2.5rem;
}
.blog-post {
  margin-bottom: 4rem;
}
.blog-post-title {
  margin-bottom: 0.25rem;
  font-size: 2.5rem;
}
.blog-post-meta {
  margin-bottom: 1.25rem;
  color: #999;
}
.blog-pagination {
  margin-bottom: 4rem;
}
.blog-pagination > .btn {
  border-radius: 2rem;
}
.blog-title {
  margin-bottom: 0;
  font-size: 2rem;
  font-weight: 400;
}
.blog-description {
  font-size: 1.1rem;
  color: #999;
}
.middle {
  margin-left: 30%;
  margin-right: 30%;
}

.round {
  border-radius: 50%;
}
.summary {
  height: 300px;
  overflow: hidden;
}
.padding {
  padding: 5px;
  border-radius: 10px;
}
.minipadding {
  padding: 2px;
  border-radius: 10px;
}
.click {
  cursor: pointer;
  outline: none;
}
.wrapper {
  display: relative;
}
.wrapper:hover .myicon {
  position: absolute;
  right: 10px;
  visibility: visible;
}
.myicon {
  position: absolute;
  right: 10px;
  visibility: hidden;
}
.commentbox {
  border-radius: 10px;
  background: #bdbdbd;
  padding: 5px;
  margin-top: 10px;
}
</style>

<template>
  <div class="wrapper">
    <ul class="chat-thread">
      <li
        v-for="(chat, index) in data"
        :key="index"
        class="message"
        :class="chat.sender === 'Tatlım' ? 'sender' : 'you'"
      >
        <template v-if="chat.message">
          <div class="name">{{ chat.sender }}</div>
          <div class="message-text">{{ chat.message }}</div>
          <div class="date">{{ chat.date }}</div>
        </template>

        <template v-else>
          <template v-if="chat.attachments.type === 'PHOTO'">
            <div class="name">{{ chat.sender }}</div>
            <div class="date">{{ chat.date }}</div>
            <img
              class="chat-photo"
              :src="`/source/${chat.attachments.src}`"
              alt=""
            />
          </template>
          <template v-else-if="chat.attachments.type === 'STICKER'">
            <div class="name">{{ chat.sender }}</div>
            <div class="date">{{ chat.date }}</div>
            <img
              class="chat-photo"
              :src="`/source/${chat.attachments.src}`"
              alt=""
            />
          </template>
          <template v-else> <i> UNSUPPORTED FORMAT </i> </template>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data } = await useAsyncData('chat', () => $fetch('/api/chat'));
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Noto+Sans';
body {
  padding: 0;
  margin: 0;
  background: -moz-linear-gradient(
    -45deg,
    #183850 0,
    #183850 25%,
    #192c46 50%,
    #22254c 75%,
    #22254c 100%
  );
  background: -webkit-linear-gradient(
    -45deg,
    #183850 0,
    #183850 25%,
    #192c46 50%,
    #22254c 75%,
    #22254c 100%
  );
  background-repeat: no-repeat;
  background-attachment: fixed;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  width: 10px;
  background-color: rgba(76, 254, 254, 0.1);
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(127, 241, 241, 0.757);
}

.chat-thread {
  margin: 0 auto 0 auto;
  padding: 30px 20px 30px 0;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  max-width: 600px;
}

.chat-thread li {
  position: relative;
  clear: both;
  display: inline-block;
  padding: 20px 20px 20px 20px;
  margin: 0 0 20px 0;
  font: 16px/20px 'Noto Sans', sans-serif;
  border-radius: 10px;
  background-color: rgba(25, 147, 147, 0.2);
}

.chat-thread li.you {
  animation: show-chat-odd 0.15s 1 ease-in;
  -moz-animation: show-chat-odd 0.15s 1 ease-in;
  -webkit-animation: show-chat-odd 0.15s 1 ease-in;
  float: right;
  color: #fff;
}

.chat-thread li.sender {
  animation: show-chat-even 0.15s 1 ease-in;
  -moz-animation: show-chat-even 0.15s 1 ease-in;
  -webkit-animation: show-chat-even 0.15s 1 ease-in;
  float: left;
  color: #fff;
}

.chat-window {
  position: fixed;
  bottom: 0;
}

.chat-window-message {
  width: 100%;
  height: 48px;
  font: 32px/48px 'Noto Sans', sans-serif;
  background: none;
  color: #0ad5c1;
  border: 0;
  border-bottom: 1px solid rgba(25, 147, 147, 0.2);
  outline: none;
}

li.message .name {
  position: absolute;
  top: 13px;
  left: 16px;
  background: #ffffff3a;
  padding: 6px 15px;
  border-radius: 6px;
}

li.message {
  position: relative;
  padding-top: 60px;
  min-width: 224px;
}

li.message .date {
  position: absolute;
  right: 22px;
  top: 18px;
  font-size: 15px;
  color: #ffffff5e;
}
.chat-thread li.you .message-text {
  text-align: right;
}

img.chat-photo {
  max-width: 270px;
  border-radius: 6px;
}
</style>

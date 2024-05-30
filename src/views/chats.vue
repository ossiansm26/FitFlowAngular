<template>
  <div>
    <h2>Chat</h2>
    <div v-if="chat">
      <h3>Participantes:</h3>
      <ul>
        <li v-for="participant in chat.participants" :key="participant.id">
          {{ participant.username }}
        </li>
      </ul>
      <h3>Mensajes:</h3>
      <ul>
        <li v-for="message in chat.messages" :key="message.id">
          <b>{{ message.sender.username }}</b>: {{ message.content }}
        </li>
      </ul>
      <input type="text" v-model="messageInput" @keyup.enter="sendMessage" placeholder="Escribe un mensaje...">
    </div>
    <div v-else>
      <p>Cargando chat...</p>
    </div>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

export default {
  data() {
    return {
      chat: null,
      stompClient: null,
      messageInput: ''
    };
  },
  created() {
    const url = '//localhost:3001/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('Conectado al WebSocket');
      // Suscribirse al topic del WebSocket
      this.stompClient.subscribe('/user/queue/messages', message => {
        console.log('Mensaje recibido:', message);
        const newMessage = JSON.parse(message.body);
        // Si el mensaje es del usuario 2, lo agregamos al chat
        if (newMessage.sender.id === 2) {
          this.chat.messages.push(newMessage);
        }
      });
      // Solicitar chats una vez conectado
      this.getChats();
    });
  },
  methods: {
    getChats() {
      // Replace this temporary mock with actual chat retrieval logic from backend
      this.chat = {
        participants: [
          { id: 1, username: 'Usuario1' },
          { id: 2, username: 'Usuario2' }
        ],
        messages: [
          { id: 1, sender: { id: 1, username: 'Usuario1' }, content: 'Hola' },
          { id: 2, sender: { id: 2, username: 'Usuario2' }, content: 'Hola Usuario1' }
        ]
      };
    },
    sendMessage() {
      // Send message to the backend WebSocket server
      if (this.messageInput.trim() !== '') {
        const messagePayload = {
          content: this.messageInput,
          sender: { id: 1 }, // Adjust sender ID as needed
          recipient: { id: 2 } // Adjust recipient ID as needed
        };
        this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(messagePayload));
        this.messageInput = '';
      }
    }
  }
};
</script>


<style scoped>
/* Estilos opcionales */
</style>

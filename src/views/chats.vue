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
          <b>{{ message.sender ? message.sender.username : 'Desconocido' }}</b>: {{ message.content }}
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
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default {
  data() {
    return {
      chat: null,
      stompClient: null,
      messageInput: '',
      userId: 1 
    };
  },
  created() {
    const url = '//localhost:3001/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('Conectado al WebSocket');
      this.stompClient.subscribe('/topic/chat/1', message => {
        console.log('Mensaje recibido:',  JSON.parse(message.body));
      });
      this.getChats();
    });
    axios.get('http://localhost:3001/api/chat/chat.getMessages/1')
    .then(response => {
      console.log('Chats:', response.data);
    });
  },
  methods: {
    getChats() {
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
    if (this.messageInput.trim() !== '') {
    
        const messagePayload = {
            content: this.messageInput,
            timestamp: new Date(),
            senderId:2,  
            recipientId: 1 
        };
        console.log('Enviando mensaje:', messagePayload);
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

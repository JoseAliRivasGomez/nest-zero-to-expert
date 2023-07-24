import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (token: string) => {

    //const url = 'http://localhost:4000/socket.io/socket.io.js';
    const url = 'https://teslo-shop-nest-21.herokuapp.com/socket.io/socket.io.js';
    
    const manager = new Manager(url, {
        extraHeaders: {
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');
    
    addListeners();

}

const addListeners = () => {

    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUL = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUL = document.querySelector('#messages-ul')!;

    socket.on('connect', () => {
        console.log('Online');
        serverStatusLabel.innerHTML = 'Online';
    });

    socket.on('disconnect', () => {
        console.log('Offline');
        serverStatusLabel.innerHTML = 'Offline';
    });

    socket.on('clients-updated', (clients: string[]) => {
        console.log(clients);
        
        let clientsHtml = '';

        clients.forEach(clientId => {
            clientsHtml += `
                <li>${clientId}</li>
            `;
        });
        clientsUL.innerHTML = clientsHtml;
        
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if(messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client', {id: 'Hi', message: messageInput.value});
        messageInput.value = '';
        
    });

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        console.log(payload);
        
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUL.append(li);
    });

}
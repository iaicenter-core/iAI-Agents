import { io } from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

export function initSocket() {
  const socket = io(BACKEND_URL);
  return socket;
}
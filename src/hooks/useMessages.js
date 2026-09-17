import { useLocalStorage } from './useLocalStorage';
import { INITIAL_MESSAGES } from '../data/messages';

export function useMessages() {
  const [messages, setMessages] = useLocalStorage('tenra_messages', INITIAL_MESSAGES);

  // Phase 2: Connect to POST /api/v1/contact
  const addMessage = (formData) => {
    const newMsg = {
      id: `msg-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'General Inquiry',
      message: formData.message,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Unread',
      type: 'Website Submission'
    };

    setMessages(prev => [newMsg, ...prev]);
    return newMsg;
  };

  const markAsRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Read' } : m));
  };

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return {
    messages,
    addMessage,
    markAsRead,
    deleteMessage
  };
}

import React, { useState } from 'react';
import { Mail, CheckCircle, Trash2, Eye, X } from 'lucide-react';
import { useMessages } from '../hooks/useMessages';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';

export function Messages() {
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'Unread') {
      markAsRead(msg.id);
    }
  };

  const handleDelete = (id) => {
    deleteMessage(id);
    if (selectedMessage?.id === id) setSelectedMessage(null);
    setToastMessage("Submission removed from inbox.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage}
        type="info"
        onClose={() => setToastMessage('')}
      />

      <div className="bg-white border border-gray-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase tracking-wide">
            Customer Submissions Inbox
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review contact form submissions, institutional requests, and store inquiries.
          </p>
        </div>
        <span className="text-xs font-mono bg-[#F8F8F6] border border-gray-200 px-3 py-1 font-bold">
          {messages.length} Total Messages
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Messages List Left */}
        <div className="lg:col-span-6 bg-white border border-gray-200 shadow-xs divide-y divide-gray-100">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpenMessage(msg)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-start justify-between ${
                  selectedMessage?.id === msg.id ? 'bg-[#F8F8F6] border-l-4 border-[#0B1F3A]' : ''
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#0B1F3A] truncate">{msg.name}</span>
                    {msg.status === 'Unread' && (
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" title="Unread" />
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800 truncate">{msg.subject}</h4>
                  <p className="text-[11px] text-gray-500 truncate">{msg.message}</p>
                </div>
                
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-400 block font-mono">{msg.date}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{msg.type}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-gray-500">No messages in inbox.</div>
          )}
        </div>

        {/* Selected Message Detail Right */}
        <div className="lg:col-span-6">
          {selectedMessage ? (
            <div className="bg-white border border-gray-200 p-6 shadow-xs space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-base font-bold text-[#0B1F3A]">{selectedMessage.subject}</h3>
                  <span className="text-xs text-gray-600 block mt-1">From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</span>
                  <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">{selectedMessage.date}</span>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-gray-800 leading-relaxed space-y-4 bg-[#F8F8F6] p-4 border border-gray-200">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="pt-2 text-[11px] text-gray-400 flex items-center justify-between border-t border-gray-100">
                <span>Phase 1 Prototype Inbox</span>
                <span>No live email transport configured</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#F8F8F6] border border-gray-200 p-12 text-center text-xs text-gray-400">
              Select a message from the list to view detailed contents.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

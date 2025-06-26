
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, ShoppingCart, MapPin, Package, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m ZipZap AI Assistant. I can help you with:\n\n🛒 Finding products\n📍 Store locations & delivery\n📦 Order tracking\n💳 Payment assistance\n🎁 Offers & coupons\n⭐ Product recommendations\n\nWhat can I help you with today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: "Track my order", icon: Package },
    { text: "Find stores near me", icon: MapPin },
    { text: "Show me offers", icon: Star },
    { text: "Cart help", icon: ShoppingCart }
  ];

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    // Product search
    if (msg.includes('find') || msg.includes('search') || msg.includes('product')) {
      if (msg.includes('grocery') || msg.includes('food')) {
        return "🛒 I can help you find groceries! We have:\n\n• Fresh fruits & vegetables\n• Dairy products (milk, cheese, yogurt)\n• Grains & cereals\n• Snacks & beverages\n• And 100+ more items!\n\nWhich category interests you?";
      }
      if (msg.includes('medicine') || msg.includes('pharmacy')) {
        return "💊 Our pharmacy section includes:\n\n• Basic medicines (Paracetamol, Vitamin C)\n• Health supplies (sanitizers, masks)\n• Personal care items\n• First aid essentials\n\nAll items are genuine and from trusted brands!";
      }
      return "🔍 I can help you find products in these categories:\n\n🥬 Groceries (100+ items)\n💊 Pharmacy (medical supplies)\n📱 Electronics (gadgets & accessories)\n💄 Beauty products\n🏡 Home & Garden\n🐕 Pet Supplies\n\nWhat are you looking for?";
    }
    
    // Order tracking
    if (msg.includes('track') || msg.includes('order') || msg.includes('delivery')) {
      return "📦 Order Tracking Help:\n\n• Your orders are tracked in real-time\n• Average delivery time: 8-12 minutes\n• Live GPS tracking available\n• SMS updates for order status\n\nWould you like me to show you the Live Tracking page?";
    }
    
    // Store locations
    if (msg.includes('store') || msg.includes('location') || msg.includes('near')) {
      return "📍 Store Locator:\n\n• 50+ dark stores across the city\n• GPS-powered location detection\n• Find nearest store automatically\n• Store hours: 6 AM - 12 AM daily\n\nI can help you find the closest store to your location!";
    }
    
    // Offers and coupons
    if (msg.includes('offer') || msg.includes('coupon') || msg.includes('discount')) {
      return "🎁 Current Offers:\n\n• SAVE10: 10% off on orders above ₹500\n• FIRST20: 20% off for new users (min ₹300)\n• WELCOME15: 15% off on orders above ₹400\n• FREE delivery on orders above ₹500\n\nWhich offer would you like to use?";
    }
    
    // Payment help
    if (msg.includes('payment') || msg.includes('pay') || msg.includes('card')) {
      return "💳 Payment Options:\n\n• Cash on Delivery (COD)\n• Credit/Debit Cards\n• UPI (Google Pay, PhonePe, Paytm)\n• Net Banking\n• All transactions are 100% secure\n\nWhich payment method do you prefer?";
    }
    
    // Cart assistance
    if (msg.includes('cart') || msg.includes('checkout')) {
      return "🛒 Cart Assistance:\n\n• Add items easily with + button\n• Apply coupons for extra savings\n• Choose delivery slot\n• Multiple payment options\n• Track your order in real-time\n\nNeed help with anything specific in your cart?";
    }
    
    // Delivery information
    if (msg.includes('delivery') || msg.includes('time') || msg.includes('fast')) {
      return "🚀 Lightning Fast Delivery:\n\n• Average delivery: 8-12 minutes\n• Dark stores strategically located\n• AI-optimized delivery routes\n• Real-time GPS tracking\n• Contactless delivery available\n\nWe're committed to getting your order to you super fast!";
    }
    
    // App features
    if (msg.includes('feature') || msg.includes('app') || msg.includes('how')) {
      return "✨ ZipZap Features:\n\n🛒 Smart Inventory Management\n📍 Live GPS Tracking\n🏪 Store Dashboard\n🤖 AI-Powered Assistant (that's me!)\n💳 Multiple Payment Options\n🎁 Exclusive Offers & Coupons\n\nWhat would you like to explore first?";
    }
    
    // Default responses
    const responses = [
      "I'm here to help with all your ZipZap needs! Try asking about products, orders, or delivery.",
      "Great question! I can assist with shopping, tracking orders, or finding the best deals.",
      "Let me help you with that! I know everything about our products and services.",
      "I'm your personal shopping assistant. What would you like to know about ZipZap?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(messageText),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">ZipZap AI Assistant</h3>
                <p className="text-xs text-white/80">Always here to help • Online</p>
              </div>
            </div>
          </div>

          {/* Quick Replies */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => handleSendMessage(reply.text)}
                  className="text-xs px-3 py-1 h-auto"
                >
                  <reply.icon className="w-3 h-3 mr-1" />
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                    {msg.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about ZipZap..."
                className="flex-1 border-purple-200 focus:border-purple-400"
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI Assistant • Powered by ZipZap Intelligence
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const App = () => {
  // ✅ sessionId hook must be inside a component
  const [sessionId] = useState(() => {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
  });

  // State for chat messages
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs for scrolling
  const chatContainerRef = useRef(null);
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);
  const chatRef = useRef(null);
  const resourcesRef = useRef(null);
  
  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Handle sending messages to the chatbot
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = { sender: 'user', text: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Send message to webhook
      const response = await fetch('https://anuragmn8n.app.n8n.cloud/webhook/consulting-prep-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage, sessionid: sessionId}),
      });
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.warn('Failed to parse JSON:', e);
        data = { message: 'Sorry, I encountered an error. Please try again.' };
      }
      console.log('Raw response:', data);
      
      // Add AI response to chat
      setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: data.output || 'Sorry, I encountered an error. Please try again.' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Animation variants for framer-motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Consulting Prep AI</div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection(aboutRef)} className="text-gray-600 hover:text-teal-600 transition-colors">About</button>
            <button onClick={() => scrollToSection(howItWorksRef)} className="text-gray-600 hover:text-teal-600 transition-colors">How it Works</button>
            <button onClick={() => scrollToSection(chatRef)} className="text-gray-600 hover:text-teal-600 transition-colors">Chat</button>
            <button onClick={() => scrollToSection(resourcesRef)} className="text-gray-600 hover:text-teal-600 transition-colors">Resources</button>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button - could be expanded with a dropdown */}
            <button className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
              variants={fadeIn}
            >
              Your Personal Consulting Prep Partner
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Practice cases, guesstimates, and interview prep with an AI senior who guides you step by step.
            </motion.p>
            <motion.button 
              onClick={() => scrollToSection(chatRef)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              variants={fadeIn}
            >
              Start Chatting
            </motion.button>
          </motion.div>
          
          {/* Background decoration */}
          <motion.div 
            className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-teal-100 to-transparent rounded-full filter blur-3xl opacity-30 -z-10"
            animate={{ 
              x: [0, 10, 0], 
              y: [0, 15, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-1/4 h-1/4 bg-gradient-to-tr from-blue-100 to-transparent rounded-full filter blur-3xl opacity-20 -z-10"
            animate={{ 
              x: [0, -15, 0], 
              y: [0, 10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 25,
              ease: "easeInOut" 
            }}
          />
        </div>
      </section>
      
      {/* About Section */}
      <section ref={aboutRef} className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Mentor Mode</h3>
              </div>
              <p className="text-gray-600">
                Get personalized guidance on consulting firms, lifestyle, and preparation strategies from an AI mentor with industry knowledge.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Case Partner Mode</h3>
              </div>
              <p className="text-gray-600">
                Practice with realistic mock interviews that simulate the consulting interview experience, complete with detailed feedback and improvement suggestions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section ref={howItWorksRef} className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How it Works</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Ask a Question</h3>
              <p className="text-gray-600">
                Start by asking any consulting-related question or request a case interview practice session.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Get Guided Like by a Senior</h3>
              <p className="text-gray-600">
                Receive personalized guidance and structured advice as if you're talking to an experienced consultant.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Practice Cases & Get Feedback</h3>
              <p className="text-gray-600">
                Work through realistic case scenarios and receive detailed feedback to improve your performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Resources Section */}
      <section ref={resourcesRef} className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Resources</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Resource cards - these are placeholders as specified */}
            <motion.div 
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="h-40 bg-gradient-to-r from-teal-500 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Case Frameworks</h3>
                <p className="text-gray-600 mb-4">
                  Essential frameworks for different types of consulting cases.
                </p>
                <button className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                  Coming Soon
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Interview Guides</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guides for each stage of the consulting interview process.
                </p>
                <button className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                  Coming Soon
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Practice Casebooks</h3>
                <p className="text-gray-600 mb-4">
                  Collection of practice cases with detailed solutions and explanations.
                </p>
                <button className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                  Coming Soon
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Chatbot Section */}
      <section ref={chatRef} className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Chat with Consulting Prep AI</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="p-6">
              {/* Chat messages container */}
              <div 
                ref={chatContainerRef}
                className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg"
              >
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p>Start a conversation with your AI consulting prep partner</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-3/4 p-4 rounded-lg ${msg.sender === 'user' 
                            ? 'bg-teal-600 text-white rounded-br-none' 
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({node, ...props}) => <p className="mb-2 text-gray-800" {...props} />,
                              h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-lg font-semibold mt-3 mb-2" {...props} />,
                              li: ({node, ...props}) => <li className="list-disc ml-6 mb-1" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-200 p-4 rounded-lg rounded-bl-none">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Message input */}
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message here..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-r-lg transition-colors disabled:bg-teal-400"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <p>Built by Anurag Moyde | Powered by n8n & AI</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
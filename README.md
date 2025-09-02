# Consulting Prep AI

An AI-powered assistant designed to help students and professionals practice **consulting case interviews**.  
Built with **n8n** for workflows, **React + Vite** for the front-end, and **LLMs** for interactive case generation and analysis.  

---

## Features
- **Case Generation** – Automatically generates realistic consulting case prompts (market entry, profitability, M&A, etc.).  
- **Framework Guidance** – Provides structured approaches like MECE, profitability trees, and issue trees.  
- **Interactive Practice** – Students can simulate case interviews with real-time feedback.  
- **Beautiful Chat UI** – Clean React-based interface with styled markdown (bold text, headings, lists, code blocks, etc.).  
- **n8n Orchestration** – Manages workflows, LLM prompts, and context passing between nodes.  

---

## Tech Stack
- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- **Workflow Orchestration**: [n8n](https://n8n.io/)  
- **AI Models**: LLMs via [OpenRouter](https://openrouter.ai/) (supports multiple providers)  
- **Styling**: TailwindCSS + Markdown rendering  

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/consulting-prep-ai.git
cd consulting-prep-ai
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start Frontend
bash
Copy
Edit
npm run dev
4. Configure n8n
Import the workflow JSON from /n8n-workflows/consulting-prep-ai.json.

Set environment variables for your AI provider keys (OPENROUTER_API_KEY, etc.).

Start n8n and ensure the webhook URL matches your React frontend.

Project Structure
csharp
Copy
Edit
consulting-prep-ai/
│── src/              # React frontend
│── public/           # Static assets
│── n8n-workflows/    # Prebuilt n8n workflows
│── package.json
│── README.md
Use Cases
Students preparing for consulting internships (BCG, Bain, McKinsey, etc.)

Consulting clubs and training workshops

Self-practice for case interviews

Roadmap
 Add support for group case practice (multiple users in one session)

 Improve visual charts for data-heavy cases

 Build a mentor dashboard for feedback

 Add analytics for tracking progress

Contributing
Contributions are welcome! If you’d like to add new features or improve prompts:

Fork the repo

Create a new branch

Submit a PR

License
MIT License © 2025

Inspiration
This project was built to make consulting prep accessible and interactive, reducing the friction of case practice. Whether you’re just starting or refining your skills, this AI assistant helps simulate real interview scenarios.

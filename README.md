
# 📝 AI Notes Generator  

An AI-powered notes generator built using **Next.js**, **TypeScript**, **Tailwind CSS**, **Shadcn**, **Firebase**, **UUID**, and **Clerk** for authentication. This app allows users to generate, store, and manage notes efficiently with a sleek and responsive UI.  

---

## 🚀 Features  
- **AI-Generated Notes**: Quickly generate notes with the power of AI.  
- **Responsive UI**: Built using **Tailwind CSS** and **Shadcn** for a seamless experience across devices.  
- **Authentication**: Secure user authentication with **Clerk**.  
- **Realtime Database**: Powered by **Firebase Firestore**.  
- **Unique Identifiers**: Generate unique note IDs with **UUID**.  
- **Type Safety**: Developed with **TypeScript** to ensure robust code.

---

## 🛠 Tech Stack  
- **Framework**: [Next.js](https://nextjs.org/)  
- **Language**: TypeScript  
- **UI Styling**: Tailwind CSS, Shadcn ,Framer Motion
- **Authentication**: Clerk  
- **Backend**: Firebase Firestore  
- **Unique IDs**: UUID

---

## 📂 Folder Structure  
```
/ai-notes-generator
│
├── /public          # Static files  
├── /src             
│   ├── /components  # Reusable components  
│   ├── /lib         # Firebase and Clerk configurations  
│   ├── /pages       # Next.js pages  
│   ├── /styles      # Global styles  
│   
│
├── firebase.json    # Firebase config  
├── tailwind.config.js  # Tailwind CSS config  
├── tsconfig.json    # TypeScript config  
└── package.json     # Dependencies
```

---

## 🔧 Installation & Setup  

### Prerequisites  
- Node.js and npm installed  
- Firebase Firestore set up  
- Clerk project set up (for authentication)  
- API keys for any AI service (e.g., OpenAI)

### Steps  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/ai-notes-generator.git
   cd ai-notes-generator
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure Firebase & Clerk**  
   - Create a `.env.local` file in the root directory:
     ```bash
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     ```
   - Ensure Firestore is enabled in your Firebase project.
   - Set up Clerk authentication from [Clerk](https://clerk.dev/).

4. **Run the development server**  
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🚀 Deployment  
- **Vercel**:  
  - Connect the repository to Vercel.  
  - Add the environment variables in the Vercel dashboard.  
  - Deploy with a single click!

---

## 💬 Contact  
If you have any questions or suggestions, feel free to reach out at:  
**Gaurav Singh** - [LinkedIn](https://www.linkedin.com/in/gaurav-singh-746916238/)  

---

## ⭐ Acknowledgements  
- [Next.js](https://nextjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Firebase](https://firebase.google.com/)  
- [Clerk](https://clerk.dev/)  
- [Shadcn UI](https://shadcn.dev/)  


import { MoveRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button-link";
import { Navbar } from "@/components/nav/Navbar";
import Logo from "@/components/Logo";


function App() {
  return (
    <main className="bg-background text-foreground min-h-screen font-sans">
            <Navbar />
      {/* Hero Section */}
      <section className="container mx-auto py-24 px-4 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
          Talk Smarter with <span className="text-primary">SmartChat</span>
        </h1>
        <p className="max-w-xl text-muted-foreground text-lg">
          Your AI assistant for fast, thoughtful, and intuitive conversations.
          Built for developers, teams, and curious minds.
        </p>
        <LinkButton to="/chats" size="lg" className="gap-2">
          Get Started <MoveRight size={18} />
        </LinkButton>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20 px-4">
        <div className="container mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Natural Conversations",
              desc: "Powered by advanced AI that feels like chatting with a real person.",
              icon: "💬",
            },
            {
              title: "Lightning Fast",
              desc: "No lags. No delays. Just instant, smart responses.",
              icon: "⚡",
            },
            {
              title: "Dark Mode Ready",
              desc: "Looks amazing in both light and dark themes.",
              icon: "🌗",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-24 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Smart AI?</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Start chatting now and discover a smarter way to communicate.
        </p>
        <LinkButton to="/chats" size="lg" className="gap-2">
          Launch App <MoveRight size={18} />
        </LinkButton>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-sidebar text-sidebar-foreground text-sm text-center">
        © {new Date().getFullYear()} SmartChat. All rights reserved.
      </footer>
    </main>
  );
}

export default App;

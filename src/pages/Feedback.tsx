import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";


const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Else | Feedback";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Share your feedback about Else. Tell us what works, what doesn't, and what you'd love to see next.",
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName) {
      toast({ title: "Please enter your name." });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast({ title: "Please enter a valid email." });
      return;
    }
    if (!trimmedMessage) {
      toast({ title: "Please write your feedback before sending." });
      return;
    }
    if (trimmedMessage.length > 5000) {
      toast({ title: "Feedback must be under 5000 characters." });
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from("feedback").insert({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Something went wrong. Please try again." });
      return;
    }

    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);
    toast({ title: "Thanks! Your feedback has been sent." });
  };

  const handleReset = () => setSubmitted(false);


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="sticky top-0 z-40 bg-background">
        <Header />
      </div>
      <main className="flex flex-1 flex-col px-5 pt-8 sm:px-8 md:flex-row md:gap-16 md:px-16 md:pt-12 lg:gap-24 lg:px-24 2xl:px-32">
        <div className="md:w-1/3 md:sticky md:top-32 md:self-start">
          <Link
            to="/"
            className="mb-12 inline-flex items-center gap-1 text-sm text-foreground transition-opacity hover:opacity-70"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Feedback
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Tell us what works, what doesn't, and what you'd love to see next. We read every message.
          </p>
        </div>

        <div className="pb-16 pt-8 md:w-2/3 md:pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="fb-name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="fb-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="rounded-xl bg-card px-4 py-3 text-[15px] text-foreground shadow-sm outline-none ring-0 transition placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/10"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fb-email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="fb-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  className="rounded-xl bg-card px-4 py-3 text-[15px] text-foreground shadow-sm outline-none ring-0 transition placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/10"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="fb-message" className="text-sm font-medium text-foreground">
                What do you want to see on the platform?
              </label>
              <textarea
                id="fb-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={5000}
                rows={8}
                className="resize-y rounded-xl bg-card px-4 py-3 text-[15px] text-foreground shadow-sm outline-none ring-0 transition placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/10"
                placeholder="Every little detail counts!"
              />
              <span className="text-xs text-muted-foreground">{message.length}/5000</span>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-6 py-3 text-sm text-white transition disabled:opacity-60"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-0 bg-[#ff6b1a] transition-[width] duration-500 ease-out group-hover:w-full"
              />
              <span className="relative z-10">{submitting ? "Sending…" : "Send feedback"}</span>
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
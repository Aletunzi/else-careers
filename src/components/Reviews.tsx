import { useEffect, useRef, useState } from "react";
import avatar1 from "@/assets/reviews/avatar-1.jpg";
import avatar2 from "@/assets/reviews/avatar-2.jpg";
import avatar3 from "@/assets/reviews/avatar-3.jpg";
import avatar4 from "@/assets/reviews/avatar-4.jpg";
import avatar5 from "@/assets/reviews/avatar-5.jpg";
import avatar6 from "@/assets/reviews/avatar-6.jpg";

type Post = {
  name: string;
  handle: string;
  avatar: string;
  text: string;
  date: string;
  likes: string;
  reposts: string;
  replies: string;
};

const posts: Post[] = [
  {
    name: "Sara Neri",
    handle: "@saraburnsdown",
    avatar: avatar1,
    text:
      "spent 3 months writing cover letters nobody read. tried else, clicked apply on 11 PM roles and woke up to two recruiter replies. genuinely didn't expect that.",
    date: "Jul 14",
    likes: "1.2K",
    reposts: "84",
    replies: "39",
  },
  {
    name: "Marco Falco",
    handle: "@mfalco_pm",
    avatar: avatar2,
    text:
      "the fit score is the part I didn't know I needed. it told me I was a 61% match for a role I was about to spend an hour applying to. skipped it. applied to the 89% instead → onsite next week.",
    date: "Jun 2",
    likes: "3.4K",
    reposts: "212",
    replies: "77",
  },
  {
    name: "Priya Raman",
    handle: "@priyabuilds",
    avatar: avatar3,
    text:
      "as someone doing a job search while employed: else basically gave me back my evenings. one click, they handle the forms. that's it.",
    date: "Aug 21",
    likes: "946",
    reposts: "58",
    replies: "24",
  },
  {
    name: "Andre Cole",
    handle: "@andrecole",
    avatar: avatar4,
    text:
      "47 applications in a week without opening a single Workday form. if you know, you know.",
    date: "May 9",
    likes: "5.7K",
    reposts: "631",
    replies: "158",
  },
  {
    name: "Lena Hoffmann",
    handle: "@lenahoff",
    avatar: avatar5,
    text:
      "was skeptical about an agent applying for me. read the screening report before hitting apply and it was more honest about my gaps than any recruiter has ever been.",
    date: "Jul 30",
    likes: "2.1K",
    reposts: "143",
    replies: "62",
  },
  {
    name: "Kenji Nakamura",
    handle: "@kenji_pm",
    avatar: avatar6,
    text:
      "3 free applications to test it, no card. did the 3, immediately bought the weekly pass. that's the whole review.",
    date: "Sep 5",
    likes: "1.8K",
    reposts: "97",
    replies: "31",
  },
];

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PostCard = ({ post }: { post: Post }) => (
  <article className="w-[300px] shrink-0 rounded-2xl bg-white p-5 shadow-[0_4px_24px_-12px_rgba(32,28,27,0.12)] sm:w-[360px]">
    <div className="flex items-start gap-3">
      <img
        src={post.avatar}
        alt={`${post.name} profile photo`}
        loading="lazy"
        width={512}
        height={512}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-foreground">{post.name}</span>
          <svg viewBox="0 0 22 22" aria-hidden className="h-3.5 w-3.5 shrink-0 fill-[#1d9bf0]">
            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.973.851-1.25 1.435c-.606-.223-1.263-.27-1.897-.14-.633.131-1.216.437-1.686.882-.445.47-.75 1.053-.882 1.687-.13.633-.083 1.29.14 1.897-.587.274-1.086.705-1.44 1.246-.354.54-.551 1.17-.569 1.816.018.646.215 1.275.57 1.816.353.54.852.972 1.438 1.246-.223.607-.27 1.264-.14 1.897.131.634.437 1.218.882 1.687.47.445 1.053.75 1.687.882.633.13 1.29.083 1.897-.14.274.587.705 1.086 1.245 1.44.541.354 1.17.551 1.816.569.646-.018 1.275-.215 1.816-.57.54-.353.972-.852 1.246-1.438.606.235 1.269.291 1.907.164.638-.128 1.226-.436 1.692-.888.452-.466.76-1.054.888-1.692.127-.638.071-1.301-.164-1.907.586-.274 1.085-.705 1.439-1.246.355-.54.552-1.17.57-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
          </svg>
        </div>
        <span className="block truncate text-sm text-muted-foreground">{post.handle}</span>
      </div>
      <span className="shrink-0 text-foreground/70">
        <XLogo />
      </span>
    </div>

    <p className="mt-3 text-[15px] leading-relaxed text-foreground">{post.text}</p>

    <div className="mt-4 border-t border-foreground/10 pt-3">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>{post.date}</span>
        <span className="ml-auto flex items-center gap-3.5">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.14 6.01l.72-.01h1.19v2.3l5.12-2.84c1.95-1.08 3.16-3.13 3.16-5.36 0-3.39-2.74-6.13-6.13-6.13z" />
            </svg>
            {post.replies}
          </span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
            </svg>
            {post.reposts}
          </span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z" />
            </svg>
            {post.likes}
          </span>
        </span>
      </div>
    </div>
  </article>
);

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-15% 0px -10% 0px" }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const row = [...posts, ...posts];

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-background py-20 sm:py-24 md:py-28 lg:py-32"
    >
      <style>{`
        @keyframes reviews-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .reviews-track {
          animation: reviews-marquee 55s linear infinite;
        }
        .reviews-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .reviews-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-16 lg:px-24 2xl:px-32">
        <div
          className={`flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-700 ease-out ${inView ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
        >
          <span className="h-px w-8 bg-muted-foreground/50" />
          <span>Reviews</span>
        </div>
        <h2
          className={`mt-6 max-w-4xl text-4xl font-medium leading-[1.05] text-foreground transition-all duration-700 ease-out sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[68px] ${inView ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
          style={{ transitionDelay: inView ? "120ms" : "0ms" }}
        >
          What people say on X.
        </h2>
      </div>

      <div
        className={`relative mt-12 transition-all duration-700 ease-out sm:mt-16 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        style={{ transitionDelay: inView ? "240ms" : "0ms" }}
      >
        <div className="flex w-max reviews-track gap-4 sm:gap-6">
          {row.map((post, i) => (
            <PostCard key={`${post.handle}-${i}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
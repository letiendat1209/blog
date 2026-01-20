import SocialIcon from "@/components/client/SocialIcon";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Code } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Mail } from "lucide-react";
import { Github } from "lucide-react";
import { Instagram, Facebook } from "lucide-react";
import Image from "next/image";

const technologies = {
  language: [
    {
      name: "JavaScript",
      icon: <Code />,
    },
    {
      name: "TypeScript",
      icon: <Code />,
    },
    {
      name: "HTML",
      icon: <Code />,
    },
    {
      name: "CSS",
      icon: <Code />,
    },

  ],
  framework: [
    {
      name: "React",
      icon: <Code />,
    },
    {
      name: "Next.js",
      icon: <Code />,
    },
    {
      name: "Tailwind CSS",
      icon: <Code />,
    },
  ],
  database: [
  {
      name: "PostgreSQL",
      icon: <Code />,
    },
    {
      name: "MongoDB",
      icon: <Code />,
    },
    {
      name: "MySQL",
      icon: <Code />,
    },
  ],
  tools: [
    {
      name: "Git",
      icon: <Code />,
    },
    {
      name: "GitHub",
      icon: <Code />,
    },
    {
      name: "VS Code",
      icon: <Code />,
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-background text-foreground">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* <BackgroundBeams className="w-full h-full" /> */}
      </div>
      {/* Nội dung */}
      <main className="relative z-10 flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="relative w-48 h-48 shrink-0">
              {/* <div className="absolute inset-0 bg-linear-to-br from-primary to-blue-600 rounded-full blur-2xl opacity-20 animate-pulse"></div> */}
              <Image
                width={200}
                height={200}
                alt="Lê Tiến Đạt"
                loading="lazy"
                className="object-cover rounded-full border-4 border-background shadow-xl"
                src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/163050864_3003938323264883_2617536581490542695_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5eD_gf3iDCcQ7kNvwG_lEgs&_nc_oc=AdkUtWED0IHyoibnUVNVXEGSHHiEopvalUgxm3VR7iH2VS70pgVlf_mPmAjd1OwphjoN3sAq5IWmRsz87gbGEOQZ&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=ck3LLVMhbZ5cxRzvNa2k3A&oh=00_AflepmaFXTWoE6k3eHdRBDLsURio2pN1pKkXwuJMFmsouw&oe=69374950"
              />
            </div>
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-5xl text-center font-bold tracking-tight">
                Lê Tiến Đạt
              </h1>
              <p className="text-xl text-center text-muted-foreground tracking-wide">
                Fullstack Developer &amp; Frontend Developer
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="default" className="rounded-3xl">
                  Resume
                </Button>
                <SocialIcon href="/" Icon={Facebook} />
                <SocialIcon href="/" Icon={Instagram} />
                <SocialIcon href="/" Icon={Github} />
                <SocialIcon href="/" Icon={Linkedin} />
                <SocialIcon href="/" Icon={Mail} />
              </div>
            </div>
          </div>
          <div className="space-y-12 text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
            <div className="whitespace-pre-wrap">
              Xin chào, tớ là Lê Tiến Đạt, sinh viên chuyên ngành Kỹ thuật phần
              mềm tại Đại học Nguyễn Tất Thành. Hiện đã ra trường và theo đuổi
              đam mê lập trình của mình.
            </div>

            <div className="whitespace-pre-wrap">
              Là một frontend dev thích biến mấy ý tưởng trên giấy thành giao
              diện chạy mượt ngoài đời. Mình quan tâm tới UI/UX, hiệu năng, và
              mấy chi tiết nhỏ mà người dùng không nói ra nhưng cảm nhận được.
              Ban ngày code, ban đêm vẫn code, lúc rảnh thì học thêm thứ mới vì
              công nghệ mà đứng yên là tụt hậu liền. Mục tiêu của mình khá đơn
              giản: làm ra sản phẩm gọn gàng, dễ dùng, và đủ “đã” để người ta
              muốn quay lại lần nữa.
            </div>
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-xl text-foreground font-serif">
              &#34;Simplicity is the ultimate sophistication and the soul of
              efficiency.&#34;
            </blockquote>
            <div className="pt-8 space-y-2 text-center">
              <p className="italic">Author of this website.</p>
              <p className="font-mono text-xl text-foreground font-bold pt-4">
                Le Tien Dat
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-2 text-foreground">
                <span className="p-2 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap size={16} />
                </span>
                Education
              </h3>
              <div className="relative border-l-2 border-muted pl-8 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] w-4 h-4 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    2021 - 2025
                  </span>
                  <h4 className="text-lg font-bold text-foreground mt-1">
                    NTTU University
                  </h4>
                  <p className="text-primary font-medium">
                    Software Engineering
                  </p>
                  <p className="text-sm mt-2">
                    Studying Software Engineering at NTTU University.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] w-4 h-4 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    2019 - 2021
                  </span>
                  <h4 className="text-lg font-bold text-foreground mt-1">
                    Lộc Thanh - Lộc Thanh High School
                  </h4>
                  <p className="text-primary font-medium">High School</p>
                  <p className="text-sm mt-2">
                    Studying at THPT Lộc Thanh - Lộc Thanh High School.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-2 text-foreground">
                <span className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Briefcase size={16} />
                </span>
                Experience
              </h3>
              <div className="relative border-l-2 border-muted pl-8 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] w-4 h-4 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    2024 - Present
                  </span>
                  <h4 className="text-lg font-bold text-foreground mt-1">
                    Freelance
                  </h4>
                  <p className="text-primary font-medium">Web Developer</p>
                  <p className="text-sm mt-2">Building web applications.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] w-4 h-4 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    2021 - Present
                  </span>
                  <h4 className="text-lg font-bold text-foreground mt-1">
                    Freelance
                  </h4>
                  <p className="text-primary font-medium">Web Developer</p>
                  <p className="text-sm mt-2">Building web applications.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 space-y-8">
            <h3 className="text-3xl font-bold text-center text-foreground">
              Tech Stack & Skill
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(technologies).map(([key, items]) => (
                <div
                  key={key}
                  className="bg-card border rounded-xl p-6 hover:border-primary transition-colors"
                >
                  <h4 className="text-lg font-bold mb-4 text-foreground capitalize">
                    {key}
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {items.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium transition-colors hover:bg-secondary/80"
                      >
                        {tech.icon}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

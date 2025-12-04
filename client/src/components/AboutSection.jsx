import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="max-w-3xl mx-auto space-y-12 text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-xl">
          <Image
            width={200}
            height={200}
            alt="Lê Tiến Đạt"
            loading="lazy"
            className="object-cover"
            src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/163050864_3003938323264883_2617536581490542695_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5eD_gf3iDCcQ7kNvwG_lEgs&_nc_oc=AdkUtWED0IHyoibnUVNVXEGSHHiEopvalUgxm3VR7iH2VS70pgVlf_mPmAjd1OwphjoN3sAq5IWmRsz87gbGEOQZ&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=ck3LLVMhbZ5cxRzvNa2k3A&oh=00_AflepmaFXTWoE6k3eHdRBDLsURio2pN1pKkXwuJMFmsouw&oe=69374950"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground">
            Lê Tiến Đạt
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Software Developer • Frontend Developer
          </p>
        </div>
      </div>
      <div className="whitespace-pre-wrap">
        Xin chào, tớ là Lê Tiến Đạt (bot), sinh viên chuyên ngành Kỹ thuật phần
        mềm tại Đại học Nguyễn Tất Thành...
      </div>
    </section>
  );
}

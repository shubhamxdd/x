import UILayout from "@/components/UILayout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UILayout>{children}</UILayout>;
}

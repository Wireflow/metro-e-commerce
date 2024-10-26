export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="grid h-screen w-full place-items-center p-4">{children}</div>;
}

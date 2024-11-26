export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full place-items-center p-4 py-28">{children}</div>;
}

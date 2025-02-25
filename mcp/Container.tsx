import '../app/globals.css'

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="container w-full h-full">{children}</div>;
}

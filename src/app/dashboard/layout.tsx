import Link from "next/link"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <nav>
            <Link href="/dashboard">Profile</Link>
            <Link href="/dashboard/orders">Orders</Link>
        </nav>
   
        {children}
      </section>
    )
}
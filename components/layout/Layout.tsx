function Layout({ children }: any) {
  return (
    <div className="relative h-screen max-w-2xl bg-[#F8F8F8] mx-auto">
      {children}
    </div>
  );
}

export default Layout;
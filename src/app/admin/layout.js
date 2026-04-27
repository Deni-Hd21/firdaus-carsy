import AutoLogout from "./components/AutoLogout";

export default function AdminLayout({ children }) {
  return (
    <>
      <AutoLogout timeout={15} />
      {children}
    </>
  );
}
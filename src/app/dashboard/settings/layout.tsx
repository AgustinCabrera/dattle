export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="border-r bg-gray-50/40 w-64"></div>
      <div className="flex-1 overflow-y-auto">
        <div className="h-full px-8 py-6">{children}</div>
      </div>
    </div>
  );
}

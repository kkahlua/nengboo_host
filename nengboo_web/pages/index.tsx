import { Button } from "@/components/ui/button";
import { logout, getGoogleUser } from "@/utils/actions";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between ">
      <Button onClick={() => router.push("/login")}>로그인</Button>
      <Button onClick={logout}>로그아웃</Button>
      <Button onClick={getGoogleUser}>콘솔</Button>
    </div>
  );
}

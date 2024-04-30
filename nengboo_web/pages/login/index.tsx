import { Button } from "@/components/ui/button";
import { googleLogin } from "@/utils/actions";
//fee500
export default function LoginPage() {
  return (
    <div>
      <Button onClick={googleLogin}>구글 로그인</Button>
    </div>
  );
}

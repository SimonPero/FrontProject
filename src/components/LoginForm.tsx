import { Button } from "./ui/button"
import { doSocialLogin } from "@/app/actions"

const LoginForm = () => {
    return (
        <form action={doSocialLogin}>
            <Button type="submit" name="action" value="google">
                Sign In With Google
            </Button>
            <Button type="submit" name="action" value="github">
                Sign In With GitHub
            </Button>
        </form>
    )
}
export default LoginForm
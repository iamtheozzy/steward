import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return <SignIn afterSignInUrl='/new-user' redirectUrl='new-user' />
}

export default SignInPage
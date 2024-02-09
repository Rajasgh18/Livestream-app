import {Logo} from "./_components/logo"

const authLayout = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <section className='h-full flex flex-col gap-8 items-center justify-center'>
      <Logo />
      {children}
    </section>
  )
}

export default authLayout
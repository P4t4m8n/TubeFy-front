import { SignIn } from "./User/SignIn";

export function NoUserCmp({ setOpen, open }) {
    return (
        <section className='no-user'>
            <button onClick={(() => setOpen(true))}>Start listening</button>
            <SignIn open={open} setOpen={setOpen}></SignIn>
        </section>
    )
}
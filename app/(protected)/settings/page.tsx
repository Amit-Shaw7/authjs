import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React from 'react'

const Settings = async () => {
    const session = await auth();
    const handleSignout = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('/api/auth/signout');
    }
    return (
        <div>
            <form action={async () => {
                "use server"
                await signOut();
            }}>
                <Button
                    type='submit'
                    variant='destructive'
                >
                    Signout
                </Button>
            </form>
            <div>{JSON.stringify(session)}</div>
        </div>
    )
}

export default Settings
import { useState, useEffect } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

interface Message {
  id: number;
  user_id: number;
  channel_id: number;
  message: string;
  author?: User;
}

interface Channel {
  id: number;
  slug: string;
  created_by: number;
}

interface User {
  id: number;
  name: string;
}

export const supabase = createPagesBrowserClient()

export const useStore = (props: { channelId: number }) => {
  const [users, setUsers] = useState<Map<number, User>>(new Map())
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<User | null>(null)


  


  // New or updated user received from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) {
      users.set(newOrUpdatedUser.id, newOrUpdatedUser)
      setUsers(new Map(users))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrUpdatedUser])

  
  return {

    users,
  }
  
}

export const fetchUser = async (userId: any, setState: any) => {
    try {
        let { data } = await supabase.from('users').select(`*`).eq('id', userId)
        let user = data![0]
        if (setState) setState(user)
        return user
      } catch (error) {
        console.log('error', error)
      }
}

export const fetchUserRoles = async (setState: (arg0: any[] | null) => void) => {
    try {
      let { data } = await supabase.from('user_roles').select(`*`)
      if (setState) setState(data)
      return data
    } catch (error) {
      console.log('error', error)
    }
  }
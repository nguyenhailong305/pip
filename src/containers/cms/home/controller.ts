
import { Database } from '@/types/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

type Employees = Database['public']['Tables']['employees']['Row']

export function useEmployees({session}) {
  const supabase = useSupabaseClient<Database>()
  const [employees, setEmployees] = useState<Employees[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [full_name, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [department , setDepartment] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = session?.user

  const showModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    const fetchEmploy= async () => {
      const { data: employees, error } = await supabase
        .from('employees')
        .select('*')
        .order('id', { ascending: true })

      if (error) console.log('error', error)
      else setEmployees(employees)
    }

    fetchEmploy()
  }, [supabase])

  const addEmploy = async (taskText: string) => {
    let task = taskText.trim()
    if (task.length) {
      const { data: employ, error } = await supabase
        .from('employees')
        .insert({ username , full_name , avatar_url , department , created_by: user.id })
        .select()
        .single()

      if (error) {
        return error.message
      } else {
        setEmployees([...employees, employ])
      }
    }
  }

//   const deleteTodo = async (id: number) => {
//     try {
//       await supabase.from('todos').delete().eq('id', id).throwOnError()
//       setTodos(todos.filter((x) => x.id != id))
//     } catch (error) {
//       console.log('error', error)
//     }
//   }

  return { showModal , addEmploy }
}
import { createClient } from "@supabase/supabase-js";

const url:string =  import.meta.env.VITE_SUPABASE_URL
const publicKey: string = import.meta.env.VITE_SUPABASE_PUBLIC_KEY


const supabase = createClient(url, publicKey)

export default supabase
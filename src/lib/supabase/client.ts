import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6IkhvelFjRmE1ZTZVZjNCd3pJNjFxTHJjS2I2cjEiLCJwcm9qZWN0X2lkIjoiMmI0MWY4ZjUtZTIyNC00OGVhLWExM2MtOGJjMDQxN2I3ZmI5IiwianRpIjoiYjExZmY4MjEtMTMwMy00NWNkLTg0ZjUtYTlkN2U1YTY1ZDcxIiwiaWF0IjoxNzYyOTU3MTY4LCJleHAiOjE3NjI5NTk4Njh9.Ibm8Cmi_u0oQEDCj9ordeZRUrMjo83XqC1ybas69sAg`
      }
    }
  }
);

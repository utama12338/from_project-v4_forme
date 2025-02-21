// app/api/auth/[...nextauth]/route.ts

import { handlers } from "../../../auth"; // ปรับ path ตามตำแหน่งไฟล์


export const  {  GET,  POST } = handlers;
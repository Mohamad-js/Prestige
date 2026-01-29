'use client'
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

function Menu(){
   const [openMenu, setOpenMenu] = useState(false)



   return(
      <div className="absolute top-0 right-0 w-fit h-fit">
         <label onChange={() => setOpenMenu(!openMenu)}>
            <div
               className="absolute right-2 top-3 py-2 w-9 h-10 cursor-pointer flex flex-col items-center justify-center z-1"
            >
               <input className="hidden peer" type="checkbox" />
               <div
                  className="w-[50%] h-0.5 bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:-rotate-45 peer-checked:bg-black"
               ></div>
               <div
                  className="w-[50%] h-0.5 bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden peer-checked:bg-black"
               ></div>
               <div
                  className="w-[50%] h-0.5 bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-45 peer-checked:bg-black"
               ></div>
            </div>
         </label>
   
         {
            openMenu &&
            <div className="absoulte w-full min-w-screen min-h-screen bg-white pt-30">
               <div className="w-full flex flex-col items-start px-6 gap-4">

                  <Collapsible className='z-1 w-full'>
                     <CollapsibleTrigger className="flex w-full items-center justify-between font-semibold text-muted-foreground text-xs uppercase tracking-wider hover:text-foreground">
                        <span className="text-lg">مدل ها</span>
                        <ChevronDown className="h-3 w-3" />
                     </CollapsibleTrigger>
                     <CollapsibleContent className="flex flex-col">
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/models/vip">
                              دختران VIP
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/models/public">
                              دختران عمومی
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/models/jornal">
                              دختران ژورنال
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/models/business">
                              دختران بیزنس
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/models/catalogue">
                              دختران کاتالوگ
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/models/glamour">
                              دختران گلامر
                           </Link>
                        </div>
                     </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className='z-1 w-full'>
                     <CollapsibleTrigger className="flex w-full items-center justify-between font-semibold text-muted-foreground text-xs uppercase tracking-wider hover:text-foreground">
                        <span className="text-lg">خدمات</span>
                        <ChevronDown className="h-3 w-3" />
                     </CollapsibleTrigger>
                     <CollapsibleContent className="flex flex-col">
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/services/rent">
                              اجاره مدل
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/services/image">
                              سفارش عکس
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/services/catalogue">
                              سفارش کاتالوگ
                           </Link>
                        </div>
                     </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className='z-1 w-full'>
                     <CollapsibleTrigger className="flex w-full items-center justify-between font-semibold text-muted-foreground text-xs uppercase tracking-wider hover:text-foreground">
                        <span className="text-lg">استخدام</span>
                        <ChevronDown className="h-3 w-3" />
                     </CollapsibleTrigger>
                     <CollapsibleContent className="flex flex-col">
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/hire/model">
                              مدل
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/hire/photographer">
                              عکاس
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/hire/body-caller">
                              بادی کر
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/hire/designer">
                              طراح لباس
                           </Link>
                        </div>
                        <div className="rounded-md text-sm hover:bg-muted active:bg-gray-100 px-3 py-2">
                           <Link href="/hire/positioner">
                              طراح صحنه
                           </Link>
                        </div>
                     </CollapsibleContent>
                  </Collapsible>

                  <div className="text-lg font-semibold text-gray-500">
                     <Link href="/about">
                        درباره ی ما
                     </Link> 
                  </div>

                  <div className="text-lg font-semibold text-gray-500">
                     <Link href="/connect">
                        ارتباط با ما
                     </Link> 
                  </div>

                  <div className="text-lg font-semibold text-gray-500">
                     <Link href="/accounts">
                        حساب کاربری
                     </Link> 
                  </div>
               </div>
            </div>
         }

      </div>
   )
}

export default Menu;